import {filter} from "./_lib/check";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const result = await filter(req.body.word || "", req, res)
    res.status(200).json(result)
  }
}
