import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";


// url: http://localhost:3000/api/education/

// get function handles GET requests to return posts (used for search) 
export const GET = async (request, { params }) => {
    try {
        const { id } = params;
        const team = await client.team.findUnique({
            where: {
                id
            }
        });
        if (!team) {
            return NextResponse.json({ status: 404 }, { message: "teams not found" })
        }
        return NextResponse.json(team);
    } catch (error) {
        return NextResponse.json({ status: 500 }, { message: "Error getting team", error })

    }
}

// Patch function handles PATCH requests to perform updates (used for editing data)
export const PATCH = async (request, { params }) => {
    try {
        const body = await request.json();
        const { id } = params;
        const { Rk,
            team,
            wins,
            losses,
            eastWins,
            eastLosses,
            westWins,
            westLosses,
            conference } = body;
        // updates the player in the database
        const updateTeam = await client.team.update({
            where: {
                id
            },
            data: {
                Rk,
                team,
                wins,
                losses,
                eastWins,
                eastLosses,
                westWins,
                westLosses,
                conference
            }
        });
        // if the player is not found, return a 404 status
        if (!updateTeam) {
            return NextResponse.json({ status: 404 }, { message: "Team not found" })
        }
        return NextResponse.json(updateTeam);

    } catch (error) {
        return NextResponse.json({ status: 500 }, { message: "Error updating team", error })
    }
}




export const FETCH = async () => {
    return await GET();
}

