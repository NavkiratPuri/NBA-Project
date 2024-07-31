// app/api/playerImages/[Player]/route.js
import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Helper function to decode URI components
const decodePlayerName = (name) => {
  try {
    return decodeURIComponent(name);
  } catch (error) {
    return name;
  }
};

export async function GET(req, { params }) {
  const { Player } = params;

  try {
    // Decode the player name to handle URL encoding
    const decodedPlayerName = decodePlayerName(Player);

    console.log('decoded Player:', decodedPlayerName);

    // Fetch the player data from the database using Prisma
    const player = await client.playerImages.findFirst({
      where: {
        Player: decodedPlayerName
      }
    });

    if (player) {
      return NextResponse.json(player);
    } else {
      return NextResponse.json({ message: `Player ${decodedPlayerName} not found` }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching player data:', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

export const FETCH = async () => {
    return await GET();
}

