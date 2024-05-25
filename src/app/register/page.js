"use client";
import Heading from "../compoents/layout/Heading"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link";

export default function Registration() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [usercreating, setUserCreating] = useState(false)
    const [usercreated, setUserCreated] = useState(false)
    const [userdisplay, setUserDisplay] = useState(false)
    const [error, setError] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault();
        setUserCreating(true)
        setError(false)
        setUserCreated(false)
        setUserDisplay(true)
        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        })
        if (response.ok) {
            setUserCreated(true)
            setError(false)
            setUserCreating(false)
        } else {
            setError(true)
            setUserCreated(false)
            setUserCreating(false)
            setUserDisplay(false)
        }
        setUserCreating(false)

    }

    return (
        <>
            <Heading
                heading={'Register'} />

            <form className="flex flex-col gap-4 relative items-center">
                {usercreated &&
                    <div className="flex flex-col m-0 text-black text-center text-sm">
                        user created Sucsessfully.
                        < Link className="underline cursor-pointer">login{'>>'}</Link>
                    </div>
                }
                {error &&
                    <div className="flex text-black text-center text-sm">
                        error detected. <br />
                        try again later.
                    </div>
                }
                {usercreating &&
                    <div className="flex text-black text-center text-sm">
                        creating....
                    </div>
                }
                <input type="email" placeholder="email" disabled={userdisplay} value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="password" disabled={userdisplay} value={password} onChange={e => setPassword(e.target.value)} />
                <button onClick={handleSubmit} type="submit" className="outline-0 bg-primary text-white font-semibold uppercase py-2 px-4 rounded-lg w-80">Register</button>
                <div className="text-gray-700 font-semibold text-sm">
                    or login with provider
                </div>
                <button onClick={console.log('fkk')} className="outline-0  text-black text-sm border-2 font-semibold py-2 px-4 rounded-lg w-80 flex flex-row justify-center items-center gap-4">
                    <Image src={'/google.png'} alt={''} width={24} height={24} />  Login with Google
                </button>
                <div className="text-black text-center text-sm">
                    Existing account?{'  '}
                    < Link href="/login" className="underline cursor-pointer">login here</Link>
                </div>
            </form>
        </>
    )
}