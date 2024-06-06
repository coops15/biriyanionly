

import mongoose from 'mongoose';
import { Menuitem } from '../../../models/Menuitem';

export async function POST(req) {
    const body = await req.json();
    await mongoose.connect(process.env.MONGO_URL);
    const createdMenuitem = await Menuitem.create(body);

    return Response.json(createdMenuitem);
}

export async function PUT(req) {
    await mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    const _id=data.editid
    if ('biriyaniname' in data) {
        // console.log(email);
        const response = await Menuitem.updateOne({ _id }, { biriyaniname: data.biriyaniname })

        // const user=await User.findOne({email});
        // console.log(user.name);
        // user.name=data.name;
        // await user.save();
        // console.log(user.name);
        // console.log(session)
    }
    if ('discription' in data) {
        const response = await Menuitem.updateOne({ _id }, { discription: data.discription })
    }
    if ('price' in data) {
        const response = await Menuitem.updateOne({ _id }, { price: data.price })
    }
    if ('image' in data) {
        const response = await Menuitem.updateOne({ _id }, { image: data.image })
    }
    if ('phone' in data) {
        const response = await Menuitem.updateOne({ email }, { phone: data.phone })
    }
    return Response.json(true)
}


export async function GET(req) {
    await mongoose.connect(process.env.MONGO_URL);
    const menuitems = await Menuitem.find({})
    return Response.json(menuitems)
}

export async function DELETE(req) {
    const item = await req.json();
    console.log(item);
    await mongoose.connect(process.env.MONGO_URL);
    const response = await Menuitem.deleteOne(item)
    return Response.json(response)
}