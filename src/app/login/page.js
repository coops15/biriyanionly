'use client';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import Heading from "../compoents/layout/Heading";

export default function Loginpage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userCreating, setUserCreating] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [userDisplay, setUserDisplay] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setUserCreating(true);
    setError(false);
    setUserCreated(false);
    setUserDisplay(true);

    const result = await signIn('credentials', { email, password,callbackUrl:'/' });
    if (result.error) {
      setError(true);
    } else {
      setUserCreated(true);
    }

    setUserCreating(false);
  }

  return (
    <>
      <Heading heading="Login" />
      <form className="flex flex-col gap-2 relative items-center" onSubmit={handleSubmit}>
        {userCreated && (
          <div className="flex flex-col m-0 text-black text-center text-sm">
            User created successfully.
            <Link href="/login" className="underline cursor-pointer">Login{'>>'}</Link>
          </div>
        )}
        {error && (
          <div className="flex text-black text-center text-sm">
            Error detected. <br />
            Try again later.
          </div>
        )}
        {userCreating && (
          <div className="flex text-black text-center text-sm">
            Creating...
          </div>
        )}
        <input type="email" name="email" placeholder="Email" disabled={userDisplay} value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" name="password" placeholder="Password" disabled={userDisplay} value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="outline-0 bg-primary text-white font-semibold uppercase py-2 px-4 rounded-lg w-80">Login</button>
        <div className="text-gray-700 font-semibold text-sm">
          Or login with provider
        </div>
        <button onClick={() => signIn('google', { callbackUrl: '/' })} type="button" className="outline-0 text-black text-sm border-2 font-semibold py-2 px-4 rounded-lg w-80 flex flex-row justify-center items-center gap-4">
          <Image src="/google.png" alt="Google Logo" width={24} height={24} /> Login with Google
        </button>
        <div className="text-black text-center text-sm">
          I don't have an account.{' '}
          <Link href="/register" className="underline cursor-pointer">Register here</Link>
        </div>
      </form>
    </>
  );
}
