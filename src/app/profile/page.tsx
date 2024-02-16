"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const ProfilePage = () => {

  const router = useRouter();
  const [data, setData] = useState('nothing');

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me')
    console.log(res.data);
    setData(res.data.data._id);
  }

  const logout = async () => {
    try {
      axios.get('/api/users/logout')
      console.log("Successfully logged out!")
      router.push('/login')
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen justify-center py-2">
      <h1>Profile</h1>
      <h2>
        {data === "nothing" ? "Nothing" : 
        <Link href={`/profile/${data}`}>
        {data}
        </Link>}
      </h2>
      
      <button onClick={getUserDetails}>Get User Data</button>

      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default ProfilePage
