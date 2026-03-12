import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const login = async () => {

    if (!email || !password) {
      alert("Please enter email and password")
      return
    }

    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (res.status !== 200) {
      alert(data.message)
      return
    }

    localStorage.setItem("token", data.token)
    localStorage.setItem("role", data.role)

    if (data.role === "admin") {
      navigate("/admin")
    } else {
      navigate("/profile")
    }
  }
  return (

    <div className="flex justify-center bg-purple-100 h-screen" >

      <div className="bg-white shadow p-6 w-80 my-20 rounded-xl">

        <h1 className="text-xl mb-4 text-center font-bold">Login</h1>
        <p className="text-center font-extralight mb-2">
          Welcome back
        </p>

        <input className="border p-2 w-full mb-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border p-2 w-full mb-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          className="bg-purple-500 text-white p-2 w-full rounded-xl hover:bg-purple-600"
          onClick={login}
        >
          Login
        </button>
        <button className="">
          Dont have an account? <a href="/signup" className="text-purple-500">Signup</a>
        </button>

      </div>

    </div>

  )

}