'use client';
import { useSession } from "next-auth/react";
import Heading from "../compoents/layout/Heading";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function ProfilePage() {
    const session = useSession();
    const status = session.status;
    console.log(session);

    if (status === 'loading') {
        return 'loading...';
    }
    if (status === 'unauthenticated') {
        // return redirect('/login');
    }
    return (
        <>
            <Heading heading={'Profile'} />
            <form className="flex flex-col items-center">
                <div className="flex gap-2 border  p-4">
                    <div className="">
                        <Image src={''} width={80} height={80} alt={'avathar'} />
                        <button type="submit" className="outline-0 p-4 font-semibold text-sm py-1 rounded-lg border">Edit</button>
                    </div>
                    <div className="flex flex-col">
                        <input type="text" placeholder="First Name" />
                        <input type="text" placeholder="Last Name" />
                        <input type="email" placeholder="Email" />
                        <input type="text" placeholder="Address" />
                        <input type="text" placeholder="Phone" />
                        <button type="submit" className="outline-0 bg-primary text-white font-semibold uppercase py-2 px-4 rounded-lg w-80">save</button>
                    </div>
                </div>
            </form>
        </>
    )
}