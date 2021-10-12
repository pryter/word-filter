import {useEffect, useState} from "react";
import {request} from "../lib/request";
import {ArrowLeftIcon, BanIcon, CheckIcon} from "@heroicons/react/solid";
import classnames from "classnames"
import {Loader} from "../vectors/Loader";
import {fail} from "assert";
import Router from "next/router";

const Page = () => {

  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])
  const [progess, setProg] = useState(0)
  const [res, setRes] = useState({})
  const [closed, setClosed] = useState(false)
  const [buttons, setButtons] = useState(<div></div>)

  const submit = async () => {
    setLoading(true)
    const response = await request("learn","get", {})
    if (response.status) {
      const done = window.localStorage.getItem("done") || "[]"
      const doneItems = JSON.parse(done)
      const data = response.data.merged
      const diff = data.filter(x => !doneItems.includes(x));

      if (doneItems.length > 0 && diff.length === 0){
        setClosed(true)
      }

      setList(diff)
    }
    setLoading(false)

  }

  useEffect(() => {
    setButtons(<>
      <h1 className="text-lg text-center bg-gray-50 text-gray-800 py-2 rounded-md">{list[progess]}</h1>
      <p className="text-gray-800 text-xs absolute top-1 font-medium right-4 w-12">{progess + 1} / {list.length}</p>
      <div key={`item-${progess}`} className="flex sm:flex-row flex-col sm:space-x-2 sm:space-y-0 space-y-2 justify-center">
        <button className="sm:block hidden rounded-md border border-gray-500 text-gray-700 py-2 px-4 hover:bg-gray-500 hover:text-white" onClick={() => {setProg(prev => (prev - 1 > 0 ? prev - 1 : 0))}}>
          <ArrowLeftIcon className="w-5 h-5"/>
        </button>
        <button className="flex justify-center sm:hidden rounded-md border border-gray-500 text-gray-700 py-2 px-4 hover:bg-gray-500 hover:text-white" onClick={() => {setProg(prev => (prev - 1 > 0 ? prev - 1 : 0))}}>
          <div className="flex flex-col relative">
            <ArrowLeftIcon className="w-4 h-4 absolute top-1 -left-5"/>
            <span className="w-16">ย้อนกลับ</span>
          </div>
        </button>
        <button className="rounded-md border border-red-500 text-red-700 py-2 px-4 hover:bg-red-500 hover:text-white" onClick={() => {setStatus(false)}}>เป็นคำหยาบ</button>
        <button className="rounded-md border border-green-500 text-green-700 py-2 px-4 hover:bg-green-500 hover:text-white" onClick={() => {setStatus(true)}}>ไม่เป็นคำหยาบ</button>
      </div>
    </>)
  }, [list, progess])

  const setStatus = async (pass: boolean) => {
    setRes(prevState => (
      {...prevState, [list[progess]]: pass ? "pass" : "failed"}
    ))
    if (progess + 1 === list.length) {
      save()
    }
    progess + 1 < list.length && setProg((pre) => (pre + 1))
  }

  const save = async () => {
    const response = await request("learn","learn", {data: res})
    if (response.status) {
      const done = window.localStorage.getItem("done") || "[]"
      const doneItems = JSON.parse(done)
      window.localStorage.setItem("done", JSON.stringify([...list, ...doneItems]))
      setClosed(true)
    }
  }

  return (
    <div className="font-display">
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-purple-300 via-blue-200 to-pink-300">
        <div style={{minWidth: "300px"}} className="flex flex-col bg-white rounded-lg shadow-lg px-4 py-4 space-y-4 relative">
          <div>
            <h1 className="text-lg text-gray-800">ช่วยกันเรียนรู้ตัวอย่างคำ</h1>
            <span className="text-gray-400 font-light">{closed ? "(โปรดลองใหม่ภายหลังจากมีข้อมูลเพิ่ม)" : "(ช่วยแสดงความคิดเห็นต่อตัวอย่างคำ)"}</span>
          </div>
          {
            closed ? <div className="flex sm:flex-row flex-col sm:space-x-4 sm:space-y-0 space-y-2">
              <p className="rounded-md text-center bg-gray-50 text-gray-400 py-2 px-4 w-full" onClick={submit}>คุณเคยส่งขอมูลไปแล้ว</p>
            </div> : list.length === 0 ? <div className="flex sm:flex-row flex-col sm:space-x-4 sm:space-y-0 space-y-2">
              <button className="rounded-md border border-gray-500 text-gray-700 py-2 px-4 w-full" onClick={submit}>{loading ? <Loader/> : "เริ่มต้นเลย"}</button>
            </div> : buttons
          }
        </div>
      </div>
    </div>
  )
}

export default Page
