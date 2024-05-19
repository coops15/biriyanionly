import Image from "next/image"

export default function Hero() {
    return (
        <section className="grid grid-cols-2">
            <div>
                <h1 className="text-4xl font-bold mt-12">Spice Haven <h1 className="text-primary">Biryani </h1> House</h1>
                <p className="mt-5 mb-5 text-gray">Are you a biryani lover? Because
                    I've got a recipe for happiness, and it
                    starts with you.
                </p>
                <button className="outline-0 bg-primary text-white font-semibold rounded-full px-4 py-2 border hover:border hover:bg-white hover:text-primary">ORDER NOW!</button>
                <button className="outline-0 ml-5 bg-white text-gray-600 font-semibold rounded-full px-4 py-2 border hover:border hover:bg-primary hover:text-white">Learn More</button>
            </div>
            <div className="relative">
                <Image src={'/hero-img1.png'} layout={'fill'}
                    objectFit={'contain'} alt={'biriyani'} />
            </div>
        </section>
    )
}