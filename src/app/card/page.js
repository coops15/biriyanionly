'use client';
import { useEffect, useState } from "react";
import Heading from "../compoents/layout/Heading";
import { useSession } from "next-auth/react";
import Delete from "../compoents/layout/Delete";
import Image from "next/image";

export default function Card() {
    const { data: session, status } = useSession();
    console.log({ data: session, status });

    const [items, setItems] = useState([]);
    const [total,setTotal]=useState(0)

    useEffect(() => {
        async function fetchItems() {
            const response = await fetch('/api/menuitems', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const menuitems = await response.json();
            setItems(menuitems);
        }
        if (session) {
            fetchItems();
        }
        
    }, [session,status]);

    useEffect(() => {
        if (session && items.length > 0) {
            const totalAmount = items
                .filter(item => session.user.carditems.includes(item._id))
                .reduce((sum, item) => sum + item.price, 0);
            setTotal(totalAmount);
        }
    }, [items, session]);

    async function handleDelete(id) {
        try {
            const response = await fetch('/api/profile', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    carditem: id
                })
            });
            if (response.ok) {
                console.log('Item deleted');
                // Remove the item from local state after deletion
                setItems(prevItems => prevItems.filter(item => item._id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (!session || !session.user) {
        return <div>Please log in to view your card items.</div>;
    }


    return (
        <>
            <Heading heading={'Card'} />
            

            <div className="flex flex-row gap-4 justify-center">
                <div className="w-96">
                    <span className="font-semibold text-sm text-gray-700">Your Items</span>
                    <ol className="flex flex-col border relative">
                        {items.filter(item => session.user.carditems.includes(item._id)).map(item => (
                            <li className="flex flex-row gap-5 p-1" key={item._id}>
                                <div className="bg-gray-100 p-1 justify-center items-center flex rounded-lg">
                                    <Image src={item.image} width={60} height={60} alt={item.biriyaniname} className="h-14 rounded-lg" />
                                </div>
                                <div className="flex gap-4 font-semibold text-sm items-center">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="w-28">
                                                    <span>{item.biriyaniname}</span>
                                                </td>
                                                <td className="w-20">
                                                    <span>{item.price} LKR</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button className="outline-0" onClick={() => handleDelete(item._id)}>
                                        <Delete />
                                    </button>
                                </div>
                            </li>
                        ))}

                        <li className="flex flex-row items-center justify-center text-gray-500 gap-5 p-1">
                            <div className="flex gap-4 font-semibold text-sm items-center justify-center">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="w-28">
                                                <span>Total</span>
                                            </td>
                                            <td className="w-20">
                                                <span>{total} LKR</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </li>
                    </ol>
                </div>

                <div className="w-96">
                    <span className="font-semibold text-sm text-gray-700">Check Out</span>
                    <form className="relative max-w-md mx-auto border rounded-lg">


                        <div className="flex gap-2 p-4">
                            <div className="flex flex-col gap-0">
                                <label >
                                    <span className="text-sm text-gray-400 ml-1">user name</span>
                                    <input className="m-0" type="text" disabled={true} defaultValue={session?.user?.name || ''} placeholder="User Name" />
                                </label>
                                <label >
                                    <span className="text-sm text-gray-400 ml-1">address</span>
                                    <input type="text" disabled={true} defaultValue={session?.user?.address || ''} placeholder="Address" />
                                </label>
                                <div className="flex flex-row relative justify-between">
                                    <label >
                                        <span className="text-sm text-gray-400 ml-1">country</span>
                                        <input type="country" disabled={true} defaultValue={session?.user?.country || ''} placeholder="Country" />
                                    </label>
                                    <label >
                                        <span className="text-sm text-gray-400 ml-1">postelcode</span>
                                        <input type="postelcode" disabled={true} defaultValue={session?.user?.postelcode || ''} placeholder="Postel Code" />
                                    </label>
                                </div>
                                <label >
                                    <span className="text-sm text-gray-400 ml-1">phone</span>
                                    <input type="text" disabled={true} defaultValue={session?.user?.phone || ''} placeholder="Phone" />
                                </label>
                                <label >
                                    <button type="submit" className="mt-2 outline-0 bg-primary text-white font-semibold uppercase py-2 px-4 rounded-lg w-80">Pay {total} LKR</button>
                                </label>
                            </div>
                        </div>

                    </form>
                </div>
            </div>

        </>
    );
}
