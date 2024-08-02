import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const { team } = params;
    if (!team) {
      return NextResponse.json(
        { message: "Player ID is required" },
        { status: 400 }
      );
    }
    const players = await client.player.findMany({
      where: {
        Tm: team,
      },
    });
    if (!team) {
      return NextResponse.json(
        { message: "Player not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(players);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return NextResponse.json(
      { message: "Error getting player", error },
      { status: 500 }
    );
  }
};
