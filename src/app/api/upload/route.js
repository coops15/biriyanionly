import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../../firebaseConfig'
import mongoose from 'mongoose';
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { User } from "../../../models/User";

export async function POST(req) {

    const data = await req.formData()
    const file = data.get('file');
    if (file) {

        try {

            const fileRef = ref(storage, `images/${file.name}`)
            await uploadBytes(fileRef, file)

            const url = await getDownloadURL(fileRef);

            if (url) {
                try {
                    await mongoose.connect(process.env.MONGO_URL);
                    const session = await getServerSession(authOptions);
                    const email = session.user.email;
                    const response = await User.updateOne({ email }, { image: url })
                } catch (error) {
                    console.log(error);
                }
            }

        } catch (error) {
            console.log(error)
        }
    }
    return Response.json(true)
}