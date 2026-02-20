import { useEffect, useState } from "react"
import api from "../api/axios"
import Layout from "../components/Layout"
import toast from "react-hot-toast"

export default function AdminDashboard() {

  const [stats, setStats] = useState({})
  const [users, setUsers] = useState([])
  const [stores, setStores] = useState([])
  const [owners, setOwners] = useState([])
  const [filter, setFilter] = useState("")

  const [selectedUser, setSelectedUser] = useState(null)
  const [userDetail, setUserDetail] = useState(null)

  const [sortField, setSortField] = useState(null)
  const [sortOrder, setSortOrder] = useState("asc")

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER"
  })

  const [newStore, setNewStore] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: ""
  })

  const fetchData = async () => {
    try {
      const dash = await api.get("/admin/dashboard")
      const userList = await api.get("/admin/users")
      const storeList = await api.get("/admin/stores")

      setStats(dash.data)
      setUsers(userList.data)
      setStores(storeList.data)
      setOwners(userList.data.filter(u => u.role === "OWNER"))
    } catch {
      toast.error("Failed to load dashboard")
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  const sortedUsers = [...users]
    .filter(u =>
      u.name.toLowerCase().includes(filter.toLowerCase()) ||
      u.email.toLowerCase().includes(filter.toLowerCase()) ||
      u.address.toLowerCase().includes(filter.toLowerCase()) ||
      u.role.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0
      const valA = a[sortField]?.toLowerCase?.() || a[sortField]
      const valB = b[sortField]?.toLowerCase?.() || b[sortField]
      if (valA < valB) return sortOrder === "asc" ? -1 : 1
      if (valA > valB) return sortOrder === "asc" ? 1 : -1
      return 0
    })

  const openUserDetail = async (id) => {
    const res = await api.get(`/admin/users/${id}`)
    setUserDetail(res.data)
    setSelectedUser(id)
  }

  return (
    <Layout>

      <div className="max-w-7xl mx-auto">

        <h1 className="text-2xl md:text-3xl font-semibold mb-8">
          Admin Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <Card title="Users" value={stats.users} />
          <Card title="Stores" value={stats.stores} />
          <Card title="Ratings" value={stats.ratings} />
        </div>

        {/* Add User */}
        <Section title="Add User">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Name" />
            <Input placeholder="Email" />
            <Input placeholder="Password" type="password" />
            <Input placeholder="Address" />
            <select className="border rounded-lg p-3 text-sm">
              <option>USER</option>
              <option>ADMIN</option>
              <option>OWNER</option>
            </select>
            <button className="bg-black text-white py-3 rounded-lg md:col-span-2">
              Add User
            </button>
          </form>
        </Section>

        {/* Search */}
        <input
          placeholder="Search users..."
          className="border rounded-lg p-3 w-full mb-6"
          onChange={(e) => setFilter(e.target.value)}
        />

        {/* Users Table */}
        <Section title="Users">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="border-b text-gray-500">
                  {["name", "email", "address", "role"].map(field => (
                    <th key={field}
                      onClick={() => handleSort(field)}
                      className="py-3 cursor-pointer text-left">
                      {field.toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map(u => (
                  <tr key={u.id}
                    onClick={() => openUserDetail(u.id)}
                    className="border-b hover:bg-gray-50 cursor-pointer">
                    <td className="py-3">{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.address}</td>
                    <td>{u.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Stores Table */}
        <Section title="Stores">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="border-b text-gray-500">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {stores.map(s => (
                  <tr key={s.id} className="border-b hover:bg-gray-50">
                    <td className="py-3">{s.name}</td>
                    <td>{s.email}</td>
                    <td>{s.address}</td>
                    <td>{s.averageRating?.toFixed(1) || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

      </div>

    </Layout>
  )
}

/* Components */

function Card({ title, value }) {
  return (
    <div className="bg-white border rounded-xl p-6">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl md:text-3xl font-semibold mt-2">{value || 0}</h2>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="bg-white border rounded-xl p-6 mb-8">
      <h3 className="font-semibold mb-6">{title}</h3>
      {children}
    </div>
  )
}

function Input({ type = "text", placeholder }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="border rounded-lg p-3 text-sm"
    />
  )
}