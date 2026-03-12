import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Profile() {

    const [user, setUser] = useState(null)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")

    const navigate = useNavigate()

    useEffect(() => {

        fetch("https://authentication-module-lt21.vercel.app/api/profile", {

            headers: {
                Authorization: localStorage.getItem("token")
            }

        })
            .then(res => res.json())
            .then(data => {
                setUser(data)
                setUsername(data.username)
                setEmail(data.email)
            })

    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/")
    }

    const updateProfile = async () => {

        const res = await fetch("https://authentication-module-lt21.vercel.app/api/updateProfile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token")
            },
            body: JSON.stringify({ username, email })
        })

        const data = await res.json()
        setUser(data)

        alert("Profile updated")

    }

    return (

        <div className="p-10">

            <button
                className="bg-purple-400 text-white px-3 py-1 rounded mb-4"
                onClick={handleLogout}
            >
                Logout
            </button>

            <h1 className="text-2xl mb-4 text-center">Your Profile</h1>
            

            {user && (

                <div className="bg-white shadow p-4 w-80 space-y-3 rounded-xl justify-center items-center mx-auto">
                            <p className="text-center font-light">Update your profile info</p>
                    <h1><b>Name:</b></h1>
                    <input
                        className="border p-2 w-full rounded-xl"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <h1><b>Email:</b></h1>
                    <input
                        className="border p-2 w-full rounded-xl"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button
                        className="bg-blue-500 text-white p-2 w-full rounded-xl hover:bg-blue-600"
                        onClick={updateProfile}
                    >
                        Update Profile
                    </button>

                </div>

            )}

        </div>

    )

}