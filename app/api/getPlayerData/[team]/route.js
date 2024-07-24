import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// get function handles GET requests to return posts (used for search)
export const GET = async (request, { params }) => {
  try {
    const { team } = params;
    if (!team) {
      return NextResponse.json(
        { message: "Player Team is required" },
        { status: 400 }
      );
    }
    const player = await client.player.findMany({
      where: {
        Tm: team,
      },
    });
    if (!player) {
      return NextResponse.json(
        { message: "Player not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(player);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return NextResponse.json(
      { message: "Error getting player", error },
      { status: 500 }
    );
  }
};
