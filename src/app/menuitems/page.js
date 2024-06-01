'use client';
import Link from "next/link"
import MenuTap from "../compoents/layout/MenuTap";
import Icons from "../compoents/layout/Icons";
import Rightarrow from "../compoents/layout/Rightarrow";
import { useState } from "react";
import mongoose from "mongoose";
import { Menuitem } from "../../models/Menuitem";
import Image from "next/image";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebaseConfig'

export default function MenuItems() {
    const [display, setDisplay] = useState(false)
    const [biriyaniname, setBiriyaniName] = useState('')
    const [price, setPrice] = useState('')
    const [discription, setDiscription] = useState('')
    const [imageurl, setImageUrl] = useState('')
    const [success, setSuccsess] = useState(false)
    const [saving, setSaving] = useState('')
const [imagename,setImagename]=useState('avathar')

    async function handleFileChange(e) {
        e.preventDefault();
        const file = e.target.files[0]
setImagename(file.name)
        if (file) {
            try {

                const fileRef = ref(storage, `products/${file.name}`)
                await uploadBytes(fileRef, file)

                const url = await getDownloadURL(fileRef);
                setImageUrl(url)
                console.log(url);

            } catch (error) {
                console.log(error);
                return null
            }
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving('Processing....')
        setSuccsess(true)
        if (imageurl === '') {
            return null
        }
        if (biriyaniname === '' || discription === '' || price === '') {
            console.log('fill all columes');
            return null
        } try {
            const response = await fetch('/api/menuitems', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    biriyaniname,
                    discription,
                    price,
                    image: imageurl,
                }),
            });

            if (response.ok) {
                console.log('Item created successfully');
                setSaving('Saved successful!')
                setTimeout(() => setSuccsess(false), 3000)
            } else {
                console.log('Faild');
                setSaving('Faild to save!')
                setTimeout(() => setSuccsess(false), 3000)
            }
        } catch (error) {
            console.log(error);
        }


    }

    function handleView(e) {
        e.preventDefault();
        setDisplay(pre => !pre)
    }
    return (
        <>
            <div className="p-3 flex flex-row gap-2 items-center justify-center">
                <Link href='/profile'><MenuTap tittle={'Profile'} active={'false'} /></Link>
                <Link href='/menuitems'><MenuTap tittle={'Menu Items'} active={'true'} /></Link>
                <Link href='/users'><MenuTap tittle={'Users'} active={'false'} /></Link>
            </div>
            <div className="flex flex-col  items-center justify-center mb-5">
                <div className="relative h-20 flex items-center justify-center">
                    {!display &&
                        <div onClick={handleView} className="cursor-pointer w-80 flex flex-row absolute items-center justify-center text-sm font-semibold gap-2 py-2 px-4 rounded-full border text-gray-800">
                            <Icons />
                            click to add a new item
                        </div>
                    }
                    {display &&
                        <div onClick={handleView} className="w-80 cursor-pointer flex flex-row absolute items-center justify-center text-sm font-semibold gap-2 py-2 px-4 rounded-full border text-gray-800">
                            <Rightarrow />
                            back to menu list items
                        </div>
                    }</div>
                {display && <form className="relative max-w-md mx-auto border" onSubmit={handleSubmit}>

                    {success && (
                        <div className="flex flex-col items-center justify-center w-100">
                            <div className="mt-4 text-center  bg-lime-400 p-3 rounded-lg text-white font-semibold">
                                {saving}
                            </div>
                        </div>)}
                    <div className="flex gap-2 p-4">
                        <div className="items-center flex flex-col mt-4">
                            <div className="bg-gray-100 p-1 justify-center items-center flex rounded-lg">
                                <Image src={imageurl} width={80} height={80} alt={imagename} className="rounded-lg" />
                            </div>
                            <div className="relative flex flex-col h-7 items-center w-20 mt-3">
                                <span className="absolute outline-0 p-4 font-semibold text-sm py-1 cursor-pointer rounded-lg border">Upload Image</span>
                                <input onChange={handleFileChange} className="absolute w-14 opacity-0 cursor-pointer" type="file" accept="image/*" id="imageUpload" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="m-2">
                                <span className="text-sm text-gray-400 ml-1">biriyani name</span>
                                <input className="m-0" type="text" onChange={(e) => setBiriyaniName(e.target.value)} placeholder="biriyani Name" />
                            </label>
                            <label className="m-2">
                                <span className="text-sm text-gray-400 ml-1">discription</span>
                                <input type="text" onChange={(e) => setDiscription(e.target.value)} placeholder="discription" />
                            </label>
                            <label className="m-2">
                                <span className="text-sm text-gray-400 ml-1">price</span>
                                <input type="text" onChange={(e) => setPrice(e.target.value)} placeholder="price" />
                            </label>
                            <button type="submit" className="outline-0 bg-primary text-white font-semibold uppercase py-2 px-4 rounded-lg w-80">Add</button>
                        </div>
                    </div>

                </form>
                }

            </div>
        </>
    )
}