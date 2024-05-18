import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// URL: http://localhost:3000/api/dbuser

// handles POST requests of email and password to create a new dbuser, returns new dbuser if
// successful, or an error message if not

export const POST = async (req) => {
    try {
        const body = await req.json();
        const { email, password } = body;
        const newDbUser = await client.dbuser.create({
            data: {
                email,
                password
            },
        });
        return NextResponse.json(newDbUser);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Error creating dbuser", error: error.message },
            { status: 500 }
        );
    }
};

// handles GET requests to return all dbusers 
export const GET = async () => {
    try {
        const dbUsers = await client.dbuser.findMany();
        return NextResponse.json(dbUsers);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Error getting dbusers", error: error.message },
            { status: 500 }
        );
    }
}

// fethces dbusers by using the GET function
export const FETCH = async () => {
    return await GET();
}
