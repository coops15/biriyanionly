"use client";
import Heading from "../compoents/layout/Heading"
import Footer from "../compoents/layout/Footer"
import Header from "../compoents/layout/Header"
import Image from "next/image"
import { useState } from "react"

export default function Registration() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(e){
        e.preventDefault();
        fetch('/api/register' , {method:'POST',
        body:JSON.stringify({email,password}),
        headers:{'contant-Type':'application/json'}
    }
            
        )
    }

    return (
        <>
            <Header />
            <Heading
                heading={'Register'} />

            <form className="flex flex-col gap-4 relative items-center" onSubmit={handleSubmit}>
                <input type="email" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                <button type="submit" className="outline-0 bg-primary text-white font-semibold uppercase py-2 px-4 rounded-lg w-80">Register</button>
                <div className="text-gray-700 font-semibold text-sm">
                    or login with provider
                </div>
                <button className="outline-0 text-black text-sm border-2 font-semibold py-2 px-4 rounded-lg w-80 flex flex-row justify-center items-center gap-4">
                    <Image src={'/google.png'} alt={''} width={24} height={24} />  Login with Google
                </button>
            </form>
            <Footer />
        </>
    )
}