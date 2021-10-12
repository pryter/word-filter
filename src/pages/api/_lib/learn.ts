import initialiseDB from "../../../lib/firebase-admin";
import {firestore} from "firebase-admin/lib/firestore";


const updateSamples = async () => {
  const dict = await initialiseDB.collection("submitted").get()
  const forLearn = dict.docs.filter((data) => (Object.values(data.data()).length >= 3))
  const learn = forLearn.map((item) => (Object.values(item.data()).map((item) => (item.full))))
  const merged = [].concat.apply([], learn);
  let remove = merged.filter((c, index) => {
    return merged.filter((item) => (item === c)).length >= 3;
  })

  const ext = forLearn.filter((item) => (Object.keys(item.data()).length >= 5)).
  map((item) => (item.id)).filter((item) => (item.length > 1))

  remove = [...remove, ...ext]

  remove = remove.filter((c, index) => {
    return remove.indexOf(c) === index
  });

  await initialiseDB.collection("samples").doc("main").set({
    data: remove,
    timestamp: new Date().getTime()
  })

  return {remove, dict}
}

const updateCore = async (dict) => {
  const learn = await initialiseDB.collection("learn").get()

  learn.forEach((item) => {
    if (Object.keys(item.data() || {}).length === 0){
      item.ref.delete()
    }
  })

  let pass = {}
  let failed = {}
  let locations = {}

  learn.docs.forEach((item) => {
    Object.keys(item.data()).forEach((e) => {
      locations[e] = [...(locations[e] || []), item.id]
      if (item.get(e) === "failed") {
        failed[e] = (failed[e] || 0) + 1
      }else{
        pass[e] = (pass[e] || 0) + 1
      }
    })
  })

  let proved = []
  let forRemove = []

  let merged = {...pass}

  Object.keys(failed).forEach((item) => {
    merged[item] = (merged[item] || 0) + failed[item]
  })

  Object.keys(merged).forEach((item) => {
    const all = merged[item]

    if (all < 5) return

    const fPercent = ((failed[item] || 0)/all) * 100

    if (fPercent >= 80) {
      proved.push(item)
    }

    if (fPercent <= 30) {
      forRemove.push(item)
    }
  })

  if (forRemove.length > 0) {
    const batch = initialiseDB.batch()

    dict.docs.forEach((item) => {
      const data = item.data()
      if (forRemove.includes(item.id)) {
        batch.delete(initialiseDB.collection("submitted").doc(item.id))
      }else{
        Object.keys(data).forEach((e) => {
          if (forRemove.includes(data[e].full)) {
            batch.update(initialiseDB.collection("submitted").doc(item.id), e, firestore.FieldValue.delete())
          }
        })
      }
    })

    forRemove.forEach((item) => {
      locations[item].forEach((o) => {
        batch.update(initialiseDB.collection("learn").doc(o), item, firestore.FieldValue.delete())
      })
    })

    await batch.commit()
  }

  if (proved.length > 0) {
    const core = await initialiseDB.collection("list").doc("main").get()

    await initialiseDB.collection("list").doc("main").set({data: `${core.get("data")} ${proved.join(" ")}`})

    const batch = initialiseDB.batch()

    dict.docs.forEach((item) => {
      const data = item.data()
      if (proved.includes(item.id)) {
        batch.delete(initialiseDB.collection("submitted").doc(item.id))
      }else{
        Object.keys(data).forEach((e) => {
          if (proved.includes(data[e].full)) {
            batch.update(initialiseDB.collection("submitted").doc(item.id), e, firestore.FieldValue.delete())
          }
        })
      }
    })

    proved.forEach((item) => {
      locations[item].forEach((o) => {
        batch.update(initialiseDB.collection("learn").doc(o), item, firestore.FieldValue.delete())
      })
    })

    await batch.commit()
  }

  return [...proved,...forRemove]

}

const clear = async () => {
  const text = `เอี้ย ป้อเมิงจิ ดอกทอง ช้างเย็ด ไอ่ หน้าหนังหีสังกะสีบาดแตด สัด สรัด เย้ด สาด ค-ว-ย แม่ม กรู เมิง กุ มืง มรึง ชิบหาย เย็ดเป็ด เสือก แอ๊บใสๆ ถ่อย เย็ด หมอย แตด กะหรี่ เหี้ย ควาย หมา ตุ๊กแก ไอ้เข้ กู มึง อี เออ โว่ย โว้ย สัส ตีน สถุล จู๋ จิ๋ม หำ เจี๊ยว ตด ขี้ เยียว ขี้แตก ตดแตก เยี่ยวแตก ไอ้ สัตว์ ส้นตีน ควย หี แดก กระดอ จรวย แรด ฟาย บ้าเอ๋ย ไอบ้า เควี่ย ตอแหล สาระเลว อีต่ำทราม เชี่ย เงี่ยน ชาติชั่ว ระยำ สันดาน ไอ้สัตว์นรก พ่อมึงตาย แม่มึงตาย ชิงหมาเกิด จัญไร จังไร บัดสบ ใจหมา เหี้ยขี้ อัปปรี ชาติหมา หน้าส้นตีน ไอเหี้ย ไอสัด ไอสัส ไอ้หมา ไอ้ควาย ไอเชี่ย นรกแดกกบาล เศษนรก กวนส้นตีน ห่ากิน ล่อกัน เอากัน แทงกัน ยิงกัน ปี้กัน ตีกัน หน้าตัวเมืย หน้าหี หน้าควย ควยเอ้ย แมงดา อีหน้าหี กระสัน ไอเหี้ยหน้าหี อีเหี้ย อีสัด อีสัส อีหมา อีควาย อีหน้าหมา อีฟันหมาบ้า อีหน้าควาย กินขี้ปี้เยี่ยว ไอ้ส้นตีน อีหน้าด้าน เป็นเหี้ยอะไรสัส ขวย แม่มึง เยดแม่ แม่ง ชาติเปรต เหยดแม๋ม ห่า สถุน ฬ่าน อยากโดนเหยด เสนียด เยด`
  const list = text.split(" ")

  const e = await initialiseDB.collection("learn").get()

  e.forEach((er) => {
    Object.keys(er.data()).forEach((item) => {
      if (list.includes(item)) {
        er.ref.update(item, firestore.FieldValue.delete())
      }
    })
  })

}

export const getLearningSamples = async () => {

  const sample = await initialiseDB.collection("samples").doc("main").get()
  let sampleData = []

  if ((new Date().getTime() - sample.get("timestamp")) >= 60 * 60 * 1000) {
    const {remove, dict} = await updateSamples()

    sampleData = remove

    if ((new Date().getTime() - sample.get("timestamp")) >= 2 * 60 * 60 * 1000) {
      const proved = await updateCore(dict)

      const fixed = remove.filter((item) => (!proved.includes(item)))

      await initialiseDB.collection("samples").doc("main").set({
        data: fixed,
        timestamp: new Date().getTime()
      })

      sampleData = fixed
    }

  }else{
    sampleData = sample.get("data")
  }

  return {status: true, report: "success", data: {merged: sampleData}}
}

export const saveData = async (data) => {
  await initialiseDB.collection("learn").add(data)
  return {status: true, report: "success"}
}
