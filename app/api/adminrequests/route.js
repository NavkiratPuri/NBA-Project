import client from "../../libs/prismadb";
import { NextResponse } from "next/server";

// Handle POST requests to submit admin privilege requests
export const POST = async (req) => {
  try {
    const body = await req.json();
    const { message, email, name } = body;

    // Create a new admin request in the database
    const newAdminRequest = await client.adminRequest.create({
      data: {
        message,
        email,
        name,
      },
    });

    return NextResponse.json(newAdminRequest);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating admin request", error: error.message },
      { status: 500 }
    );
  }
};
