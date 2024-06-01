import Link from "next/link"
import MenuTap from "../compoents/layout/MenuTap";

export default function Users(){
    return(
        <>
        <div className="p-3 flex flex-row gap-2 items-center justify-center">
                <Link href='/profile'><MenuTap tittle={'Profile'} active={'false'} /></Link>
                <Link href='/menuitems'><MenuTap tittle={'Menu Items'} active={'false'}/></Link>
                <Link href='/users'><MenuTap tittle={'Users'} active={'true'}/></Link>
            </div>
        </>
    )
}