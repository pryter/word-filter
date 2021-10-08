import * as fs from "fs";

const dict = () => {
  const data = fs.readFileSync("./_dict/5000.txt").toString()
  return data.split("\n")
}

export const dict5000 = dict()
