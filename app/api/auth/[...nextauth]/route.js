import NextAuth from "next-auth";
import authConfig from "@/app/libs/auth";

//handle all nextauth routes
export default NextAuth({

    providers: [

    ],
    secret: process.env.NEXTAUTH_SECRET,
})
const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };