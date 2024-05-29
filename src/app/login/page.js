'use client';
import Heading from "../compoents/layout/Heading"
import { useState } from "react"
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";


export default function Loginpage() {

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

        await signIn('credentials', { email, password });


        setUserCreating(false)

    }

    return (
        <>
            <Heading heading={'Login'} />
            <form className="flex flex-col gap-2 relative items-center" onSubmit={handleSubmit}>
                {usercreated &&
                    <div className="flex flex-col m-0 text-black text-center text-sm">
                        user created Sucsessfully.
                        < Link href={''} className="underline cursor-pointer">login{'>>'}</Link>
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
                <input type="email" name="email" placeholder="email" disabled={userdisplay} value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" name="password" placeholder="password" disabled={userdisplay} value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit" className="outline-0 bg-primary text-white font-semibold uppercase py-2 px-4 rounded-lg w-80">Login</button>
                <div className="text-gray-700 font-semibold text-sm">
                    or login with provider
                </div>
                <button onClick={() => signIn('google', { callbackUrl: '/' })} type="button" className="outline-0  text-black text-sm border-2 font-semibold py-2 px-4 rounded-lg w-80 flex flex-row justify-center items-center gap-4">
                    <Image src={'/google.png'} alt={''} width={24} height={24} />  Login with Google
                </button>
                <div className="text-black text-center text-sm">
                    I don't have an account.{'  '}
                    < Link href="/register" className="underline cursor-pointer">Register here</Link>
                </div>
            </form>
        </>
    )
}