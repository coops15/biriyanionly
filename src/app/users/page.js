'use client';
import Link from "next/link"
import MenuTap from "../compoents/layout/MenuTap";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import mongoose from "mongoose";
import { User } from "../../models/User";

export default function Users() {
    const { data: session, status } = useSession();
    console.log({ data: session, status });

    const [admin, setAdmin] = useState(false)
    const [users,setUsers]=useState([])

    useEffect(() => {
        if (status === 'authenticated') {
            setAdmin(session.user.admin)
        }
    }, [session, status]);

    useEffect(() => {
        async function connect() {
            const response = await fetch('/api/users', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            if(response.ok){
                const data=await response.json()
                setUsers(data);
            }
            else{
                console.log('error');
            }
          
        }
         connect();
    },[])
    return (
        <>
            {admin &&
                <>
                    <div className="p-3 flex flex-row gap-2 items-center justify-center">
                        <Link href='/profile'><MenuTap tittle={'Profile'} active={'false'} /></Link>
                        <Link href='/menuitems'><MenuTap tittle={'Menu Items'} active={'false'} /></Link>
                        <Link href='/users'><MenuTap tittle={'Users'} active={'true'} /></Link>
                    </div>
                    <div className="w-full flex items-center justify-center">
                        <div className="w-96">
                            <span className="font-semibold text-sm text-gray-700">users list</span>
                            <ol className="flex flex-col border relative">
                                {users.map(user=>(
                                <li className="flex flex-row gap-5 p-1">
                                    <div className="bg-gray-100 p-1 justify-center items-center flex rounded-lg">
                                        <Image src={user.image} width={60} height={60} alt={''} className="rounded-lg" />
                                    </div>
                                    <div className="flex gap-8 text-sm items-center">
                                        <span className="font-semibold">{user.name}</span>
                                        <span><i>{user.email}</i></span>
                                    </div>
                                </li>
                                ))}
                            </ol>
                        </div>
                    </div>

                </>
            }
            {!admin &&
                <>
                    404 error
                </>
            }
        </>
    )
}