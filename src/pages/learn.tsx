import {useEffect, useState} from "react";
import {request} from "../lib/request";
import {BanIcon, CheckIcon} from "@heroicons/react/solid";
import classnames from "classnames"
import {Loader} from "../vectors/Loader";
import {fail} from "assert";
import Router from "next/router";

const Page = () => {

  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])
  const [progess, setProg] = useState(0)
  const [res, setRes] = useState({})

  const submit = async () => {
    setLoading(true)
    const response = await request("learn","get", {})
    if (response.status) {
      setList(response.data.merged)
    }
    setLoading(false)
  }

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
      alert("Saved")
      Router.reload()
    }
  }

  return (
    <div className="font-display">
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-purple-300 via-blue-200 to-pink-300">
        <div style={{minWidth: "300px"}} className="flex flex-col bg-white rounded-lg shadow-lg px-4 py-4 space-y-4 relative">
          <div>
            <h1 className="text-lg text-gray-800">ช่วยกันเรียนรู้ตัวอย่างคำ</h1>
            <span className="text-gray-400 font-light">(ช่วยแสดงความคิดเห็นต่อตัวอย่างคำ)</span>
          </div>
          {
            list.length === 0 ? <div className="flex sm:flex-row flex-col sm:space-x-4 sm:space-y-0 space-y-2">
              <button className="rounded-md border border-gray-500 text-gray-700 py-2 px-4 w-full" onClick={submit}>เริ่มต้นเลย</button>
            </div> : <>
              <h1 className="text-lg text-center bg-gray-50 text-gray-800 py-2 rounded-md">{list[progess]}</h1>
              <p className="text-gray-800 text-xs absolute top-1 font-medium right-4 w-12">{progess + 1} / {list.length}</p>
              <div className="flex sm:flex-row flex-col sm:space-x-4 sm:space-y-0 space-y-2 justify-center">
                <button className="rounded-md border border-red-500 text-red-700 py-2 px-4 hover:bg-red-500 hover:text-white" onClick={() => {setStatus(false)}}>เป็นคำหยาบ</button>
                <button className="rounded-md border border-green-500 text-green-700 py-2 px-4 hover:bg-green-500 hover:text-white" onClick={() => {setStatus(true)}}>ไม่เป็นคำหยาบ</button>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Page
