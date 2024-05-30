import mongoose from "mongoose";
import { User } from './../../../models/User'

export async function POST(req) {

    const body = await req.json();
    const uri = process.env.MONGO_URL;
    await mongoose.connect(uri);
    const pass = body.password;
    if (!pass.length || pass.length < 5) {
        new Error('Password must be at least 5 characters long')
    }

    const notHashedPassword = pass;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(notHashedPassword, salt);
    body.password = hashedPassword;
    const createdUser = await User.create(body);

    return Response.json(createdUser);

}