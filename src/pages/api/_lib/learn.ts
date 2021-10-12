import initialiseDB from "../../../lib/firebase-admin";

export const getLearningSamples = async () => {
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

  return {status: true, report: "success", data: {merged: remove}}
}

export const saveData = async (data) => {
  await initialiseDB.collection("learn").add(data)
  return {status: true, report: "success"}
}
