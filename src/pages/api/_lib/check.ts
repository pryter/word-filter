import wordcut from "wordcut"
import Cookies from "cookies"
import initialiseDB from "../../../lib/firebase-admin"
import aes256 from "aes256"

export const filter = async (text: string, req, res) => {
  const cookies = new Cookies(req, res, {keys: [process.env.COOKIE_KEY]})

  let rawTrainedList = cookies.get("trainedData", {signed: true})
  let trainedList = ""
  if (!rawTrainedList) {
    const data = await initialiseDB.collection("list").doc("main").get()
    trainedList = data.get("data")
    const expires = new Date().getTime() + (2 * 60 * 60 * 1000)
    let encryptedTrainedData = aes256.encrypt(process.env.DATA_KEY, trainedList);
    cookies.set('trainedData', encryptedTrainedData, {
      httpOnly: true,
      sameSite: 'Strict',
      signed: true,
      expires: new Date(expires)
    })
  }else{
    trainedList = aes256.decrypt(process.env.DATA_KEY, rawTrainedList)
  }

  const eslist = trainedList.split(" ")

  wordcut.init("./dict.txt", true, eslist);
  const words = wordcut.cut(text.replace(/ /g, "")).split("|")
  let susList = []
  let cursed = false
  words.forEach((word: string) => {
    if (eslist.some(val => (val === word))) {
      cursed = true
    }else{
      susList.push(word)
    }
  })

  if (!cursed && susList.length > 0) {
    let batch = initialiseDB.batch()
    const fp = req.body.fp
    susList.forEach((item) => {
      batch.set(initialiseDB.collection("submitted").doc(item), {[fp]: {full: text.replace(/ /g, "")}}, {merge: true})
    })
    batch.commit()
  }

  return {status: true, report: "success", data: {cursed: cursed}}
}
