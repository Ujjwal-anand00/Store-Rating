import { useState } from "react"
import api from "../api/axios"
import Layout from "../components/Layout"
import toast from "react-hot-toast"

export default function UpdatePassword() {
  const [oldPassword,setOld]=useState("")
  const [newPassword,setNew]=useState("")

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      await api.post("/auth/update-password",{
        oldPassword,
        newPassword
      })
      toast.success("Password updated")
    }catch{
      toast.error("Update failed")
    }
  }

  return(
    <Layout>
      <div className="bg-white p-6 rounded-xl shadow w-96">
        <h2 className="text-xl font-bold mb-4">
          Update Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="password"
            placeholder="Old Password"
            className="border p-2 w-full rounded"
            onChange={e=>setOld(e.target.value)}/>
          <input type="password"
            placeholder="New Password"
            className="border p-2 w-full rounded"
            onChange={e=>setNew(e.target.value)}/>
          <button className="bg-blue-600 text-white p-2 w-full rounded">
            Update
          </button>
        </form>
      </div>
    </Layout>
  )
}