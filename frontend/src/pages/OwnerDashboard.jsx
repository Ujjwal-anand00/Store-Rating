import { useEffect,useState } from "react"
import api from "../api/axios"
import Layout from "../components/Layout"

export default function OwnerDashboard(){
  const [data,setData]=useState(null)

  useEffect(()=>{
    api.get("/owner/dashboard")
    .then(res=>setData(res.data))
  },[])

  if(!data) return <p>Loading...</p>

  return(
    <Layout>
      <h2 className="text-3xl font-bold mb-4">
        {data.storeName}
      </h2>

      <p className="mb-6">
        Average Rating: {data.averageRating}
      </p>

      <div className="bg-white shadow rounded p-4">
        <h3 className="font-semibold mb-3">
          Users Who Rated
        </h3>
        {data.usersRated?.map((u,i)=>(
          <div key={i}
            className="border-b py-2">
            {u.name} - {u.rating}
          </div>
        ))}
      </div>
    </Layout>
  )
}