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
    const [address, setAddress] = useState('')
    const [country, setCountry] = useState('')
    const [postelcode, setPostelCode] = useState('')
    const [phone, setPhone] = useState('')
    const [image,setImage]=useState('')
    const [success, setSuccsess] = useState(false)
    const [saving,setSaving]=useState('')

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.user.name)
            setAddress(session.user.address)
            setCountry(session.user.country)
            setPostelCode(session.user.postelcode)
            setPhone(session.user.phone)
            setImage(session.user.image)
        }
    }, [session, status]);

    if (status === 'loading') {
        return 'loading...';
    }
    if (status === 'unauthenticated') {
        return redirect('/login');
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setSaving('Processing....')
        setSuccsess(true)
        const response = await fetch('api/profile', {
            method: 'PUT',
            headers: { 'Contant-Type': 'application/json' },
            body: JSON.stringify({ name: username, address: address, country: country, postelcode: postelcode, phone: phone })
        })
        if (response.ok) {
            setSaving('Saved successful!')
            setTimeout(() => setSuccsess(false), 3000)
        }else{
            setSaving('Faild to save!')
            setTimeout(() => setSuccsess(false), 3000)
        }
    }

    async function handleFileChange(e) {
        e.preventDefault()
        setSaving('Processing....')
        setSuccsess(true)
        const files = e.target.files;
        if (files?.length === 1) {
            const data = new FormData;
            data.set('file', files[0]);
            const res = await fetch('api/upload', {
                method: 'POST',
                body: data,
                // headers: { 'Content-Type': 'multipart/form-data' }
            })
            if (res.ok) {
                setSaving('Saved successful!')
                setTimeout(() => setSuccsess(false), 3000)
            }else{
                setSaving('Faild to save!')
                setTimeout(() => setSuccsess(false), 3000)
            }
        }
    }

    return (
        <>
            <Heading heading={'Profile'} />
            <form className="relative max-w-md mx-auto border" onSubmit={handleSubmit}>
                {success && (
                    <div className="flex flex-col items-center justify-center w-100">
                    <div className="mt-4 text-center w-80 bg-lime-400 p-3 rounded-lg text-white">
                        {saving}
                    </div>
                    </div>)}
                <div className="flex gap-2 p-4">
                    <div className="items-center flex flex-col mt-4">
                        <div className="bg-gray-100 p-1 justify-center items-center flex rounded-lg">
                            <Image src={session.user.image} width={80} height={80} alt={'avathar'} className="rounded-lg" />
                        </div>
                        <div className="relative flex flex-col h-7 items-center w-20 mt-3">
                            <span className="absolute outline-0 p-4 font-semibold text-sm py-1 rounded-lg border">Edit</span>
                            <input onChange={handleFileChange} className="absolute w-14 opacity-0" type="file" accept="image/*" id="imageUpload" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="m-2">
                            <span className="text-sm text-gray-400 ml-1">user name</span>
                            <input className="m-0" type="text" defaultValue={username} onChange={(e) => setUserName(e.target.value)} placeholder="User Name" />
                        </label>
                        <label className="m-2">
                            <span className="text-sm text-gray-400 ml-1">email</span>
                            <input type="email" defaultValue={session?.user?.email || ''} disabled={true} placeholder="Email" />
                        </label>
                        <label className="m-2">
                            <span className="text-sm text-gray-400 ml-1">address</span>
                            <input type="text" defaultValue={session?.user?.address || ''} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
                        </label>
                        <div className="flex flex-row relative justify-between">
                            <label className="m-2">
                                <span className="text-sm text-gray-400 ml-1">country</span>
                                <input type="country" defaultValue={session?.user?.country || ''} onChange={(e) => setCountry(e.target.value)} placeholder="Country" />
                            </label>
                            <label className="m-2">
                                <span className="text-sm text-gray-400 ml-1">postelcode</span>
                                <input type="postelcode" defaultValue={session?.user?.postelcode || ''} onChange={(e) => setPostelCode(e.target.value)} placeholder="Postel Code" />
                            </label>
                        </div>
                        <label className="m-2">
                            <span className="text-sm text-gray-400 ml-1">phone</span>
                            <input type="text" defaultValue={session?.user?.phone || ''} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
                        </label>
                        <button type="submit" className="outline-0 bg-primary text-white font-semibold uppercase py-2 px-4 rounded-lg w-80">save</button>
                    </div>
                </div>
                
            </form>
        </>
    )
}