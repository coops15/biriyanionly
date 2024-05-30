import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../compoents/libs/MongoConnect";
import { User } from "../../../../models/User";
import bcrypt from 'bcryptjs';

const handler = NextAuth({
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
          await mongoose.connect('mongodb+srv://worldhidden0:YTXiSj10tujc2Hth@biriyani.dkpyyzg.mongodb.net/biriyani_users?retryWrites=true&w=majority&appName=Biriyani');
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
          return { id: user._id, email: user.email }; // Return a minimal user object

        } catch (error) {
          console.error('Error in authorize function:', error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login' // Redirect to the login page on error
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    }
  },
  debug: true // Enable debug mode
});

export { handler as GET, handler as POST };
