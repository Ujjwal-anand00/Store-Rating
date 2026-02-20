import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../api/axios"
import toast from "react-hot-toast"

export default function Register() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post("/auth/register", form)
      toast.success("Account created successfully")
      navigate("/")
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8">

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create your account
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Start using Store Rating today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <Input
            label="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <Input
            label="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />

          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            type="submit"
            className="w-full bg-black text-white rounded-lg py-3 text-sm font-medium hover:opacity-90 transition"
          >
            Create Account
          </button>

        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-black font-medium hover:underline">
            Sign in
          </Link>
        </p>

      </div>

    </div>
  )
}

function Input({ label, type = "text", value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>
      <input
        type={type}
        required
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  )
}