import Image from "next/image"


export default function AddItem({saving,biriyaniname,price,discription,success,handleSubmit,setDiscription,setBiriyaniName,setPrice,imageurl,imagename,handleFileChange,action}){
    return(
        <form className="relative max-w-md mx-auto border" onSubmit={handleSubmit}>

                    {success && (
                        <div className="flex flex-col items-center justify-center w-100">
                            <div className="mt-4 text-center  bg-lime-400 p-3 rounded-lg text-white font-semibold">
                                {saving}
                            </div>
                        </div>)}
                    <div className="flex gap-2 p-4">
                        <div className="items-center flex flex-col mt-4">
                            <div className="bg-gray-100 p-1 justify-center items-center flex rounded-lg">
                                <Image src={imageurl} width={80} height={80} alt={imagename} className="rounded-lg" />
                            </div>
                            <div className="relative flex flex-col h-7 items-center w-20 mt-3">
                                <span className="absolute outline-0 p-4 font-semibold text-sm py-1 cursor-pointer rounded-lg border">Upload Image</span>
                                <input onChange={handleFileChange} className="absolute w-14 opacity-0 cursor-pointer" type="file" accept="image/*" id="imageUpload" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="m-2">
                                <span className="text-sm text-gray-400 ml-1">biriyani name</span>
                                <input className="m-0" defaultValue={biriyaniname || ''} type="text" onChange={(e) => setBiriyaniName(e.target.value)} placeholder="biriyani Name" />
                            </label>
                            <label className="m-2">
                                <span className="text-sm text-gray-400 ml-1">discription</span>
                                <input type="text" defaultValue={discription || ''} onChange={(e) => setDiscription(e.target.value)} placeholder="discription" />
                            </label>
                            <label className="m-2">
                                <span className="text-sm text-gray-400 ml-1">price</span>
                                <input type="text" defaultValue={price || ''} onChange={(e) => setPrice(e.target.value)} placeholder="price" />
                            </label>
                            <button type="submit" className="outline-0 bg-primary text-white font-semibold uppercase py-2 px-4 rounded-lg w-80">{action}</button>
                        </div>
                    </div>

                </form>
    )
}