import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../compoents/libs/MongoConnect";
import { User } from "../../../../models/User";
import bcrypt from 'bcryptjs';

export const authOptions = {
  secret: 'nkdnsfnkfnfkdsnfksdfnk',
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: '349021949821-d0ls706l8sjdm1kpq3drjqaqb2uk32ep.apps.googleusercontent.com',
      clientSecret: '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'
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        console.log('Authorize function called');
        const { email, password } = credentials;

        try {
          await mongoose.connect(process.env.MONGO_URL);
          console.log('Database connected successfully');

          const user = await User.findOne({ email });
          if (!user) {
            console.log('No user found with email:', email);
            return null;
          }

          const passwordOk = await user && bcrypt.compare(password, user.password);
          if (!passwordOk) {
            console.log('Invalid password for user:', email);
            return null;
          }

          console.log('User authenticated:', email);
          // Add more user details here if needed
          return {
            id: user._id,
            email: user.email,
            name: user.name,
            address: user.address,
            country: user.country,
            postelcode: user.postelcode,
            phone: user.phone,
            image: user.image,
            admin: user.admin,
            carditems:user.carditems,
            role: user.role
          };

        } catch (error) {
          console.error('Error in authorize function:', error);
          return null;
        }
      }
    })
  ],
  // pages: {
  //   signIn: '/login',
  //   error: '/login' // Redirect to the login page on error
  // },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.address = user.address;
        token.country = user.country;
        token.postelcode = user.postelcode;
        token.phone = user.phone;
        token.image = user.image;
        token.admin = user.admin;
        token.carditems=user.carditems;
        token.role = user.role; // Add more fields here
      }
      return token;
    },
    async session({ session, token }) {
      await mongoose.connect(process.env.MONGO_URL); // Ensure the database connection is established
      const user = await User.findById(token.id); // Fetch the latest user details from the database

      if (user) {
        session.user.id = user._id;
        session.user.email = user.email;
        session.user.name = user.name;
        session.user.address = user.address;
        session.user.country = user.country;
        session.user.postelcode = user.postelcode;
        session.user.phone = user.phone;
        session.user.image = user.image;
        session.user.admin = user.admin;
        session.user.carditems=user.carditems;
        session.user.role = user.role; // Add more fields here
      }

      return session;
    }
  },
  debug: true // Enable debug mode
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
