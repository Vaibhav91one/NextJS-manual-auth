"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

const SignUpPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
        setLoading(true);
        const response = await axios.post("/api/users/signup", user);
        console.log("Signup success", response.data);
        router.push("/login")
    } catch (error: any) {
      console.log("Sign up failed")
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    }
    else {
      setButtonDisabled(true);
    }
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />

      <label htmlFor="username">Username</label>
      <input type="text" id="username" className="text-black" value={user.username}
        onChange={(e) => {
          setUser({ ...user, username: e.target.value })
        }}
        placeholder="username"
      />

      <label htmlFor="email">Email</label>
      <input type="text" id="email" className="text-black" value={user.email}
        onChange={(e) => {
          setUser({ ...user, email: e.target.value })
        }}
        placeholder="email"
      />

      <label htmlFor="password">password</label>
      <input type="password" id="password" className="text-black" value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value })
        }}
        placeholder="password"
      />

      <button onClick={onSignUp}>
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>

      <Link href="/login">
        Login Here!
      </Link>

    </div>
  )
}

export default SignUpPage
