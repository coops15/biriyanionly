

import mongoose from 'mongoose';
import { Menuitem } from '../../../models/Menuitem';

export async function POST(req){
    const body = await req.json();
    await mongoose.connect(process.env.MONGO_URL);
    const createdMenuitem = await Menuitem.create(body);

return Response.json(createdMenuitem);
}
