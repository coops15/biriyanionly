import Image from "next/image"

export default function Homemenu(){
    return(
        <section>
            <div className="absolute left-0 right-0 w-full h-auto">
                <div  className="absolute w-48 h-64 text-left -left-12 -top-12">
                <Image src={'/lemon.png'} layout={'fill'} objectFit={'contain'} alt={'lemon'}/>
                </div>
                <div className="absolute w-48 h-64 rotate-180 -right-12 -top-12">
                <Image src={'/lemon.png'} layout={'fill'} objectFit={'contain'} alt={'lemon'}/>
                </div>
            </div>
        <div className="text-center mt-10">
        <h5 className="text-2xl text-gray-400 font-semibold">CHECK OUT</h5>
        <h3 className="text-3xl text-primary font-semibold">Menu</h3>
        </div>
        <p>
        </p>
        </section>
    )
}