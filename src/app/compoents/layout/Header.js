'use client';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Shoppingcard from "./Shopingcard"
import { useEffect, useState } from "react";

export default function Header() {
  const { data: session, status } = useSession();

  console.log({ data: session, status });
  const [cardItemsLength,setCardItemsLength] = useState(0)

  useEffect(()=>{
    setCardItemsLength(session?.user?.carditems?.length || 0)
  },[session,status])

  return (
    <>
      <header className="flex flex-row items-center justify-between">
        <Link href="/" className="text-primary font-bold text-2xl">BIRIYANI ONLY</Link>
        <nav className="flex items-center gap-4 font-semibold text-gray-500">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          {status === 'authenticated' && (
            <>
              <span className="ml-10 text-gray-700">Hello, <Link href="/profile">{session?.user?.name || 'user'}</Link></span>
              <button onClick={() => signOut('/')} className="outline-0 bg-primary text-white rounded-lg px-4 py-2 border">Logout</button>
              {session.user.admin===false && (
                <div className="cursor-pointer p-2 relative">
                  <Link href={'/card'}>
                  <div className="">
                  <Shoppingcard/>
                  </div>
                <span style={{fontSize:"8px"}} className="absolute top-0 right-0 bg-primary text-white h-5 w-5 flex items-center justify-center rounded-full">{cardItemsLength}</span>
                </Link>
                </div>
                )}
            </>
          )}
          {status === 'unauthenticated' && (
            <>
              <Link href="/register" className="ml-10 text-gray-700">Register</Link>
              <Link href="/login" className="outline-0 bg-primary text-white rounded-lg px-4 py-2 border">Login</Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
}
