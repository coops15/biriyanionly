import Image from "next/image"
import Menuitem from "./Menuitem"
import Heading from "./Heading"


export default function Homemenu() {
    return (
        <section>
            <div className="absolute left-0 right-0 h-auto w-full">
                <div className="absolute w-48 h-64 text-left -left-12 -top-12">
                    <Image src={'/lemon.png'} layout={'fill'} objectFit={'contain'} alt={'lemon'} />
                </div>
                <div className="absolute w-48 h-64 rotate-180 -right-12 -top-12">
                    <Image src={'/lemon.png'} layout={'fill'} objectFit={'contain'} alt={'lemon'} />
                </div>
            </div>
            <Heading 
            subheading={'Check out'}
            heading={'Menu'}
            />
            <div className="relative grid grid-cols-4 gap-5">
                <Menuitem/>
                <Menuitem/>
                <Menuitem/>
                <Menuitem/>
                <Menuitem/>
                <Menuitem/>
                <Menuitem/>
                <Menuitem/>
                <Menuitem/>
                <Menuitem/>
            </div>

            <Heading 
            subheading={'biriyani only'}
            heading={'About Us'}
            />
            <p className="text-gray-700 text-center">Exercitation elit nisi enim culpa nisi aliqua 
                reprehenderit nisi consectetur qui amet adipisicing cupidatat. 
                Velit enim eu labore do sunt nulla duis ipsum aliquip aliqua anim. 
                Fugiat nostrud nostrud duis laborum commodo. Amet deserunt aute aliqua 
                cupidatat deserunt proident culpa consequat sit elit velit veniam est. 
                Cupidatat aliqua exercitation id Lorem cupidatat minim.
                Consequat in nisi ipsum excepteur nulla in sunt ea minim sint ea est.<br/> 
                Ad nisi amet non pariatur officia aliqua consectetur. Aliquip sunt Lorem 
                dolor deserunt. Irure sint commodo est quis in anim reprehenderit incididunt 
                cupidatat est reprehenderit. Ad aliquip exercitation deserunt eiusmod. Dolor 
                velit ullamco ad occaecat veniam enim. Eiusmod eiusmod occaecat officia 
                pariatur non exercitation voluptate veniam qui consequat ex eiusmod deserunt 
                Lorem.</p>

                <div className="p-5 relative text-center bg-orange-100 flex flex-col mt-10">
                    <h2 className="text-2xl text-primary font-semibold m-5">+76 563425167</h2>
                    <span className="font-semibold text-gray-700 m-5">Biriyanionly@gmail.com</span>
                 </div>
                
        </section>
    )
}