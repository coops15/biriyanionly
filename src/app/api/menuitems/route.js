

import mongoose from 'mongoose';
import { Menuitem } from '../../../models/Menuitem';

export async function POST(req){
    const body = await req.json();
    await mongoose.connect(process.env.MONGO_URL);
    const createdMenuitem = await Menuitem.create(body);

return Response.json(createdMenuitem);
}

export async function GET(req){
    await mongoose.connect(process.env.MONGO_URL);
    const menuitems=await Menuitem.find({})
    return Response.json(menuitems)
}

export async function DELETE(req){
    const item = await req.json();
    console.log(item);
    await mongoose.connect(process.env.MONGO_URL);
    const response=await Menuitem.deleteOne(item)
    return Response.json(response)
}