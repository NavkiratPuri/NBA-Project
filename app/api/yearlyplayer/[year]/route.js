import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

//app/api/yearlyplayer/route.js

// URL: http://localhost:3000/api/yearlyplayer

export const GET = async (request) => {
    try {
        const { searchParams } = new URL(request.url);
        const year = parseInt(searchParams.get("year"), 10);

        if (isNaN(year)) {
            return NextResponse.json({ message: "Year parameter is required and must be a number" }, { status: 400 });
        }

        const players = await client.player.findMany({
            where: {
                Year: year
            }
        });

        if (players.length === 0) {
            return NextResponse.json({ message: "No players found for the given year" }, { status: 404 });
        }

        return NextResponse.json(players);
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return NextResponse.json({ message: "Error fetching players", error }, { status: 500 });
    }
};
