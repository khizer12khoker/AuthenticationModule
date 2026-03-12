import {useState} from "react"

export default function Signup(){

const [username,setUsername] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const signup = async ()=>{

 if(!username || !email || !password){
  alert("Please fill all fields")
  return
 }

 const res = await fetch("http://localhost:5000/api/signup",{

  method:"POST",
  headers:{'Content-Type':'application/json'},

  body:JSON.stringify({username,email,password})

 })

 const data = await res.json()

 if(res.status !== 200){
  alert(data.message)
 }else{
  alert(data.message)
 }

}

return(

<div className="flex justify-center bg-purple-100 h-screen " >

<div className="bg-white p-6 shadow w-80 my-20 rounded-xl">

<h1 className="text-xl mb-4 text-center font-bold">Signup</h1>

<input className="border p-2 w-full mb-2 rounded-xl focus:outline-none focus:ring-2  focus:ring-purple-500 focus:border-transparent" placeholder="username"
onChange={e=>setUsername(e.target.value)} />

<input className="border p-2 w-full mb-2 rounded-xl focus:outline-none focus:ring-2  focus:ring-purple-500 focus:border-transparent" placeholder="email"
onChange={e=>setEmail(e.target.value)} />

<input
type="password"
className="border p-2 w-full mb-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
placeholder="password"
onChange={e=>setPassword(e.target.value)}
/>
<button className="bg-purple-500 text-white p-2 w-full rounded-xl hover:bg-purple-600"
onClick={signup}>
Signup
</button>
<button className="">
            Already have an account <a href="/" className="text-purple-500">Login</a>
          </button>

</div>

</div>

)

}