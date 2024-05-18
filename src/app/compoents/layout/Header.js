import Link from "next/link"

export default function Header(){
return(
    <>
    <header className="flex flex-row items-center justify-between">
    <Link href={""} className="text-primary font-bold text-2xl">BIRIYANI ONLY</Link>
    <nav className="flex items-center gap-4 font-semibold text-gray-500">
      <Link href={""}>Home</Link>
      <Link href={""}>About</Link>
      <Link href={""}>Contact</Link>
      <Link href={""} className="bg-primary text-white rounded-full px-4 py-2 border hover:border hover:bg-white hover:text-primary">Login</Link>
    </nav>
    </header>
    </>
)
}