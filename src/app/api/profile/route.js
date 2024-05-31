import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import {authOptions} from "../auth/[...nextauth]/route";
import { User } from "../../../models/User";

export async function PUT(req) {
    await mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    if ('name' in data) {
        // console.log(email);
         const response=await User.updateOne({ email }, { name: data.name })

        // const user=await User.findOne({email});
        // console.log(user.name);
        // user.name=data.name;
        // await user.save();
        // console.log(user.name);
        // console.log(session)
    }
    if ('address' in data) {
        const response=await User.updateOne({ email }, { address: data.address })
   }
   if ('country' in data) {
    const response=await User.updateOne({ email }, { country: data.country })
}
if ('postelcode' in data) {
    const response=await User.updateOne({ email }, { postelcode: data.postelcode })
}
if ('phone' in data) {
    const response=await User.updateOne({ email }, { phone: data.phone })
}
    return Response.json(true)
}