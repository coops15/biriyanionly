import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import {authOptions} from "../auth/[...nextauth]/route";
import { User } from "../../../models/User";

export async function GET(req){
    await mongoose.connect(process.env.MONGO_URL);
    const allUsers = await User.find({admin:false});
    return Response.json(allUsers);
}