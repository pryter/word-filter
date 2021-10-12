import {filter} from "./_lib/check";
import {getLearningSamples, saveData} from "./_lib/learn";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let result = {}
    if (req.body.action === "get") {
      result = await getLearningSamples()
    }
    if (req.body.action === "learn") {
      result = await saveData(req.body.data)
    }
    res.status(200).json(result)
  }
}
