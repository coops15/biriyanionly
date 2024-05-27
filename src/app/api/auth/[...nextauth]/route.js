import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from '../../../../models/User';
import bcrypt from 'bcryptjs';
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../compoents/libs/MongoConnect"



const handler = NextAuth({
  secret:'nkdnsfnkfnfkdsnfksdfnk',
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        username: { label: "Email", type: "email", placeholder: "test@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        mongoose.connect('mongodb+srv://worldhidden0:YTXiSj10tujc2Hth@biriyani.dkpyyzg.mongodb.net/biriyani_users')
        const user = await User.findOne({ email })
        const passwordOk = user && bcrypt.compare(password, user.password)
        console.log({ password })
        if (passwordOk) {
          return user;
        }

        // Return null if user data could not be retrieved
        return null
      }
    })
  ]
})

export { handler as GET, handler as POST }