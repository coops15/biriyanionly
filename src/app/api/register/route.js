import mongoose from "mongoose";
import {User} from './../../../models/User'

export async function POST(req){
    
    const body=await req.json();
    const uri='mongodb+srv://worldhidden0:YTXiSj10tujc2Hth@biriyani.dkpyyzg.mongodb.net/biriyani_users';
    await mongoose.connect(uri);
    const createdUser=await User.create(body);

return Response.json(createdUser);

}