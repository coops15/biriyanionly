import Link from "next/link"

export default function Header(){
return(
    <>
    <header className="flex flex-row items-center justify-between">
    <Link href={""} className="text-primary font-bold text-2xl">BIRIYANI ONLY</Link>
    <nav className="flex items-center gap-4 font-semibold text-gray-500">
      <Link href={"/"}>Home</Link>
      <Link href={""}>About</Link>
      <Link href={""}>Contact</Link>
      <Link href={'/register'} className="ml-10 text-gray-700">Register</Link>
      <Link href={""} className="bg-primary text-white rounded-lg px-4 py-2 border">Login</Link>
    </nav>
    </header>
    </>
)
}