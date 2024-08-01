import client from "../../libs/prismadb";
import { NextResponse } from "next/server";

// Handle POST requests to submit admin privilege requests
export const POST = async (req) => {
  try {
    const body = await req.json();
    const { message, email, name } = body;

    const existingRequest = await client.adminReq.findUnique({
        where: { email },
    });

    if (existingRequest) {
        return NextResponse.json(
          { message: "An admin request with this email already exists." },
          { status: 400 }
        );
    }

    // Create a new admin request in the database
    const newAdminReq = await client.AdminReq.create({
      data: {
        message,
        email,
        name,
      },
    });

    return NextResponse.json(newAdminReq);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating admin request", error: error.message },
      { status: 500 }
    );
  }
};
