import { useSession } from "next-auth/react";
import { useEffect } from "react";


export default function Menuitem({ item }) {
    const { data: session, status } = useSession();
    console.log({ data: session, status });

    async function handleAdd(id) { 
        try{
            const response = await fetch('api/profile',{
                method:'PUT',
                headers:{
                    'content-Type':'application/json'
                },
                body:JSON.stringify({
                    carditem:[id]
                })
            })
            if (response.ok) {
                console.log('data inserted');
            }
        }catch{
            console.log(error);
        }
       
    }

    return (
        <div className="bg-gray-200 text-center rounded-lg p-4 w-60 hover:bg-white hover:shadow-md hover:shadow-black/35 transition-all cursor-pointer">
            <div className="relative w-full">
                <img src={item.image || '/normal-biriyani.png'} alt="biriyani" width='200px' height='200px' className="h-40 w-96 rounded-lg" />
            </div>
            <h5 className="font-bold mt-2 mb-2">{item.biriyaniname}</h5>
            <p className="text-gray-700 text-sm mb-2 mt-2">{item.discription}</p>
            <button onClick={() => handleAdd(item._id)} className="outline-0 bg-primary font-semibold rounded-lg px-4 py-2 text-white">Add to Card {item.price} LKR</button>
        </div>
    )
}