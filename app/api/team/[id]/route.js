import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";


// url: http://localhost:3000/api/education/

// get function handles GET requests to return posts (used for search) 
export const GET = async (request, { params }) => {
    try {
        const { id } = params;
        const team = await client.team.findUnique({
            where: {
                id: parseInt(id)
            },
        });
        if (!team) {
            return NextResponse.json({ status: 404 }, { message: "teams not found" })
        }
        const players = await client.player.findMany({
            where: { teamId: parseInt(id) },
        });
        return NextResponse.json({ team, players });
    
       
    } catch (error) {
        return NextResponse.json({ status: 500 }, { message: "Error getting team details", error })

    }
}

// Patch function handles PATCH requests to perform updates (used for editing data)/ to update a specific team
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
                id: parseInt(id)
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

