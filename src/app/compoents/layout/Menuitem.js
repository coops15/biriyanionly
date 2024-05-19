export default function Menuitem() {
    return (
        <div className="bg-gray-200 text-center rounded-lg p-4 w-60 hover:bg-white hover:shadow-md hover:shadow-black/35 transition-all cursor-pointer">
            <div className="relative w-full">
                <img src={'/normal-biriyani.png'} alt="biriyani" width='200px' height='200px' className="mx-auto rounded-lg" />
            </div>
            <h5 className="font-bold mt-2 mb-2">Normal Biriyani</h5>
            <p className="text-gray-700 text-sm mb-2 mt-2">Nostrud consequat quis sunt elit voluptate .</p>
            <button className="outline-0 bg-primary font-semibold rounded-lg px-4 py-2 text-white">Order Now 500LKR</button>
        </div>
    )
}