'use client';
import { useSession } from "next-auth/react";
import Heading from "../compoents/layout/Heading";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const { data: session, status } = useSession();
    console.log({ data: session, status });
    const [username, setUserName] = useState('')
    const [user, setUser] = useState('')

    useEffect(()=>{
        if (status==='authenticated') {
            setUserName(session.user.name)
        }
    },[session,status]);

    if (status === 'loading') {
        return 'loading...';
    }
    if (status === 'unauthenticated') {
        return redirect('/login');
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const response = await fetch('api/profile', {
            method: 'PUT',
            headers: { 'Contant-Type': 'application/json' },
            body: JSON.stringify({ name: user })
        })
    }

    return (
        <>
            <Heading heading={'Profile'} />
            <form className="max-w-md mx-auto border" onSubmit={handleSubmit}>
                <div className="flex gap-2 p-4">
                    <div className="items-center flex flex-col">
                        <div className="bg-gray-100 w-20 h-20 justify-center items-center flex p-1 rounded-lg">
                            <Image src={session.user.image} width={80} height={80} alt={'avathar'} className="rounded-lg" />
                        </div>
                        <button type="submit" className="mt-3 outline-0 p-4 font-semibold text-sm py-1 rounded-lg border">Edit</button>
                    </div>
                    <div className="flex flex-col">
                        <input type="text" defaultValue={username} onChange={(e)=>setUser(e.target.value)} placeholder="User Name" />
                        <input type="email" defaultValue={session?.user?.email || ''} placeholder="Email" />
                        <input type="text" defaultValue={session?.user?.address || ''} placeholder="Address" />
                        <div className="flex flex-row relative justify-between">
                            <input type="country" defaultValue={session?.user?.country || ''} placeholder="Country" />
                            <input type="postelcode" defaultValue={session?.user?.postelcode || ''} placeholder="Postel Code" />
                        </div>
                        <input type="text" defaultValue={session?.user?.phone || ''} placeholder="Phone" />
                        <button type="submit" className="outline-0 bg-primary text-white font-semibold uppercase py-2 px-4 rounded-lg w-80">save</button>
                    </div>
                </div>
            </form>
        </>
    )
}