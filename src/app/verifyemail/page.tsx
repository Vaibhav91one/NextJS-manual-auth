"use client";

import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";


const VerifyEmailPage = () => {
  
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false)

    const verifyUserEmail = async() =>{

        try {
            
            await axios.post('/api/users/verify', {token})
            setVerified(true);

        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        }
        
    }

    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");

    },[])

    useEffect(()=>{

        if(token.length > 0){
            verifyUserEmail();
        }

    }, [token])

    return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      
      <h1>Verify Email</h1>
      <h2>{token ? `${token}` : "No Token"}</h2>
    
        {verified && (
            <div>
                <h2>
                    Email Verified
                </h2>
                <Link href="/login">
                    Login
                </Link>
            </div>
        )}

        {error && (
             <div>
             <h2>
                 Error
             </h2>
         </div>
        )}

    </div>
  )
}

export default VerifyEmailPage
