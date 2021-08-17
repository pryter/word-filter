import {useEffect, useState} from "react";
import {request} from "../lib/request";
import {BanIcon, CheckIcon} from "@heroicons/react/solid";
import classnames from "classnames"
import {Loader} from "../vectors/Loader";

const thaiChars = ['ก', 'ข', 'ฃ', 'ค', 'ฅ', 'ฆ', 'ง', 'จ', 'ฉ', 'ช', 'ซ', 'ฌ', 'ญ', 'ฎ', 'ฏ', 'ฐ', 'ฑ', 'ฒ', 'ณ', 'ด', 'ต', 'ถ', 'ท', 'ธ', 'น', 'บ', 'ป', 'ผ', 'ฝ', 'พ', 'ฟ', 'ภ', 'ม', 'ย', 'ร', 'ฤ', 'ล', 'ฦ', 'ว', 'ศ', 'ษ', 'ส', 'ห', 'ฬ', 'อ', 'ฮ', 'ฯ', 'ะ', 'ั', 'า', 'ำ', 'ิ', 'ี', 'ึ', 'ื', 'ุ', 'ู', 'ฺ', '฿', 'เ', 'แ', 'โ', 'ใ', 'ไ', 'ๅ', 'ๆ', '็', '่', '้', '๊', '๋', '์', 'ํ', '๎', '๏', '๐', '๑', '๒', '๓', '๔', '๕', '๖', '๗', '๘', '๙', '๚', '๛']

const Page = () => {

  const [word, setWord] = useState("")
  const [cursed, setCursed] = useState(false)
  const [def, setDef] = useState(true)
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if(word === "") return;
    setDef(true)
    setLoading(true)
    const response = await request("check","", {word})
    if (response.status) {
      setDef(false)
      setCursed(response.data.cursed)
    }
    setLoading(false)
  }

  const checkText = (text) => {
    if(text === "") {
      setDef(true)
    }
    const chars = text.split("")
    return !chars.some(val => (!thaiChars.includes(val)))
  }

  return (
    <div className="font-display">
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-purple-300 via-blue-200 to-pink-300">
        <div className="flex flex-col bg-white rounded-lg shadow-lg px-4 py-4 space-y-4">
          <div>
            <h1 className="text-lg text-gray-800">คำนี้หยาบหรือไม่</h1>
            <span className="text-gray-400 font-light">(ช่วยกันบริจาคคำหยาบหน่อยงับ)</span>
          </div>
          <div className="flex sm:flex-row flex-col sm:space-x-4 sm:space-y-0 space-y-2">
            <div className="relative">
              <input type="text" placeholder="เฉพาะคำภาษาไทยเท่านั้น" className={classnames("rounded-md placeholder-gray-300", def ? "" : cursed ? "border-red-600" : "border-green-500")} value={word} onChange={(e) => {checkText(e.target.value) ? setWord(e.target.value) : e.preventDefault()}}/>
              {!def && <div className="absolute top-0 right-2 h-full flex items-center">
                {cursed ? <BanIcon className="w-5 h-5 text-red-600"/> : <CheckIcon className="w-5 h-5 text-green-500"/>}
              </div>}
            </div>
            <button className="rounded-md border border-gray-500 text-gray-700 py-2 px-4" onClick={submit}>{loading ? <Loader/> : "ตรวจสอบ"}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
