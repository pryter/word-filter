import initialiseDB from "../../../lib/firebase-admin";

export const getLearningSamples = async () => {
  const dict = await initialiseDB.collection("submitted").get()
  const forLearn = dict.docs.filter((data) => (Object.values(data.data()).length >= 3))
  const learn = forLearn.map((item) => (Object.values(item.data()).map((item) => (item.full))))
  const merged = [].concat.apply([], learn);
  const remove = merged.filter((c, index) => {
    return merged.indexOf(c) === index;
  });

  return {status: true, report: "success", data: {merged: remove}}
}

export const saveData = async (data) => {
  await initialiseDB.collection("learn").add(data)
  return {status: true, report: "success"}
}
