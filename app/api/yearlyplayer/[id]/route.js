
import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

//app/api/player/[id]/route.js

// url: http://localhost:3000/api/player/[id]


export const GET = async (request, { params }) => {
    try {
        const { id } = params;
        if (!id) {
            return NextResponse.json({ message: "Player ID is required" }, { status: 400 });
        }
        const player = await client.player.findUnique({
            where: {
                id: id
            }
        });
        if (!player) {
            return NextResponse.json({ message: "Player not found" }, { status: 404 });
        }
        return NextResponse.json(player);
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return NextResponse.json({ message: "Error getting player", error }, { status: 500 });
    }
}


// Patch function handles PATCH requests to perform updates (used for editing data)
export const PATCH = async (request, { params }) => {
    try {
        const body = await request.json();
        const { id } = params;
        const { Rk,
            Player,
            Pos,
            Age,
            Tm,
            G,
            GS,
            MP,
            FG,
            FGA,
            FGPercent,
            threeP,
            threePA,
            threePPercent,
            twoP,
            twoPA,
            twoPPercent,
            eFGPercent,
            FT,
            FTA,
            FTPercent,
            ORB,
            DRB,
            TRB,
            AST,
            STL,
            BLK,
            TOV,
            PF,
            PTS,
            Year } = body;
        // updates the player in the database
        const updatePlayer = await client.player.update({
            where: { id },
            data: {
                Rk,
                Player,
                Pos,
                Age,
                Tm,
                G,
                GS,
                MP,
                FG,
                FGA,
                FGPercent,
                threeP,
                threePA,
                threePPercent,
                twoP,
                twoPA,
                twoPPercent,
                eFGPercent,
                FT,
                FTA,
                FTPercent,
                ORB,
                DRB,
                TRB,
                AST,
                STL,
                BLK,
                TOV,
                PF,
                PTS,
                Year
            }
        });
        // if the player is not found, return a 404 status
        if (!updatePlayer) {
            return NextResponse.json({ status: 404 }, { message: "Player not found" })
        }
        return NextResponse.json(updatePlayer);

    } catch (error) {
        return NextResponse.json({ status: 500 }, { message: "Error updating player", error })
    }
}


// Function to remove a player from the database using the player id
export const DELETE = async (request, { params }) => {
    try {
        const { id } = params;
        await client.player.delete({
            where: {
                id
            }
        });
        return NextResponse.json({ status: 200 }, { message: "Player deleted" });

    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return NextResponse.json({ status: 500 }, { message: "Error deleting player", error });
    }
};


export const FETCH = async () => {
    return await GET();
}

