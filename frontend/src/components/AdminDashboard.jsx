import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard(){

const [users,setUsers] = useState([])
const [adminInfo,setAdminInfo] = useState(null)
const navigate = useNavigate()

const getUsers = async ()=>{

 const res = await fetch("http://localhost:5000/api/users",{
  headers:{
   Authorization:localStorage.getItem("token")
  }
 })

 const data = await res.json()
 setUsers(data)

}

const getAdminInfo = async ()=>{

 const res = await fetch("http://localhost:5000/api/profile",{
  headers:{
   Authorization:localStorage.getItem("token")
  }
 })

 const data = await res.json()
 if(res.status === 200){
  setAdminInfo(data)
 }

}

const deleteUser = async (id)=>{

 await fetch("http://localhost:5000/api/users/"+id,{
  method:"DELETE",
  headers:{
   Authorization:localStorage.getItem("token")
  }
 })

 getUsers()

}

useEffect(()=>{
 getUsers()
 getAdminInfo()
},[])
const handleLogout = ()=>{
 localStorage.removeItem("token")
 localStorage.removeItem("user")
 navigate("/")
}

return(

<div className="p-10">
<button
className="bg-purple-400 text-white px-3 py-1 rounded mb-4"
onClick={handleLogout}
>
Logout
</button>

{adminInfo && (
<div className="bg-blue-50 border-2 border-blue-400 p-4 mb-6 rounded-lg">
<h2 className="text-xl font-bold mb-2">Admin Profile</h2>
<p className="mb-1"><span className="font-semibold">Username:</span> {adminInfo.username}</p>
<p><span className="font-semibold">Email:</span> {adminInfo.email}</p>
<p><span className="font-semibold">Role:</span> {adminInfo.role}</p>
</div>
)}

<h1 className="text-2xl mb-5 text-center border rounded-xl p-2">
Admin Dashboard
</h1>

{users.map(u=>(

<div
key={u._id}
className="border p-3 mb-2 flex justify-between items-center"
>

<span>{u.username} - {u.email}</span>

<div className="space-x-3">



<button
onClick={()=>deleteUser(u._id)}
className="text-red-500"
>
Delete
</button>

</div>

</div>

))}

</div>

)

}