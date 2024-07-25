// team/[id]/route.js
import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    const team = await client.team.findUnique({
      where: {
        id: parseInt(id, 10), // Ensure the id is an integer
      },
    });

    if (!team) {
      return NextResponse.json({ message: "Team not found" }, { status: 404 });
    }

    const players = await client.player.findMany({
      where: { Tm: team.name }, // Assuming `Tm` in the player collection corresponds to the team name
    });

    return NextResponse.json({ team, players });
  } catch (error) {
    console.error('Error fetching team details:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};
