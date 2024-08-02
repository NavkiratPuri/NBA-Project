// pages/api/adminrequests/[id].js

import client from "../../../libs/prismadb";
import { NextResponse } from "next/server";

// Handle PATCH requests to approve admin privilege requests
export const PATCH = async (req, { params }) => {
  const { id } = params;
  try {
    const body = await req.json();
    const { action } = body;

    if (action !== "approve") {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }

    const adminRequest = await client.adminReq.findUnique({
      where: { id },
    });

    if (!adminRequest) {
      return NextResponse.json({ message: "Admin request not found" }, { status: 404 });
    }

    const updatedUser = await client.user.update({
      where: { email: adminRequest.email },
      data: { isAdmin: true },
    });

    await client.adminReq.delete({
      where: { id },
    });

    return NextResponse.json({ message: "User updated to admin", user: updatedUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error updating admin request", error: error.message }, { status: 500 });
  }
};

// Handle DELETE requests to deny admin privilege requests
export const DELETE = async (req, { params }) => {
  const { id } = params;
  try {
    await client.adminReq.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Admin request deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error deleting admin request", error: error.message }, { status: 500 });
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case 'PATCH':
      return await PATCH(req, res);
    case 'DELETE':
      return await DELETE(req, res);
    default:
      res.setHeader('Allow', ['PATCH', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
