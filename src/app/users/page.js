import Link from "next/link"
import MenuTap from "../compoents/layout/MenuTap";
import Image from "next/image";

export default function Users(){
    return(
        <>
        <div className="p-3 flex flex-row gap-2 items-center justify-center">
                <Link href='/profile'><MenuTap tittle={'Profile'} active={'false'} /></Link>
                <Link href='/menuitems'><MenuTap tittle={'Menu Items'} active={'false'}/></Link>
                <Link href='/users'><MenuTap tittle={'Users'} active={'true'}/></Link>
            </div>
            <div className="w-full flex items-center justify-center">
            <div className="w-96">
                        <span className="font-semibold text-sm text-gray-700">users list</span>
                        <ol className="flex flex-col border relative">
                           <li className="flex flex-row gap-5 p-1">
                                <div className="bg-gray-100 p-1 justify-center items-center flex rounded-lg">
                                    <Image src={''} width={60} height={60} alt={''} className="rounded-lg" />
                                </div>
                                <div className="flex gap-8 text-sm items-center">
                                    <span className="font-semibold">User name</span>
                                    <span><i>Email address</i></span>
                                </div>

                            </li>
                            <li className="flex flex-row gap-5 p-1">
                                <div className="bg-gray-100 p-1 justify-center items-center flex rounded-lg">
                                    <Image src={''} width={60} height={60} alt={''} className="rounded-lg" />
                                </div>
                                <div className="flex gap-8 text-sm items-center">
                                    <span className="font-semibold">User name</span>
                                    <span><i>Email address</i></span>
                                </div>

                            </li>
                        </ol>
                    </div>
                    </div>
        
        </>
    )
}