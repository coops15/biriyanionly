'use client';
import Link from "next/link"
import MenuTap from "../compoents/layout/MenuTap";
import Icons from "../compoents/layout/Icons";
import Rightarrow from "../compoents/layout/Rightarrow";
import { useState } from "react";

export default function MenuItems(){
    const [display,setDisplay]=useState(false)

    function handleView(e){
e.preventDefault();
setDisplay(pre=>!pre)
    }
    return(
        <>
        <div className="p-3 flex flex-row gap-2 items-center justify-center">
                <Link href='/profile'><MenuTap tittle={'Profile'} active={'false'} /></Link>
                <Link href='/menuitems'><MenuTap tittle={'Menu Items'} active={'true'}/></Link>
                <Link href='/users'><MenuTap tittle={'Users'} active={'false'}/></Link>
            </div>
            <div className="flex items-center relative justify-center mt-5 mb-5">
             {!display && <div onClick={handleView} className="cursor-pointer w-80 flex flex-row absolute items-center justify-center text-sm font-semibold gap-2 py-2 px-4 rounded-full border text-gray-800">
                <Icons/>
                click to add a new item 
            </div>}
            {display &&  <div onClick={handleView} className="w-80 cursor-pointer flex flex-row absolute items-center justify-center text-sm font-semibold gap-2 py-2 px-4 rounded-full border text-gray-800">
                <Rightarrow/>
                back to menu list items 
            </div>}
            </div>
        </>
    )
}