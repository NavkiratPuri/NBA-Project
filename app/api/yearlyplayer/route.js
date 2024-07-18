import client from "../../libs/prismadb";
import { NextResponse } from "next/server";

// url: http://localhost:3000/api/post

// function to handle POST requests to create a new player data, returns new player if successful, or an error message if not
export const POST = async (req) => {
    try {
        const body = await req.json();
        const { Rk, Player, Pos, Age, Tm, G, GS, MP, FG, FGA, FGPercent,
            threeP, threePA, threePPercent, twoP, twoPA, twoPPercent,
            eFGPercent, FT, FTA, FTPercent, ORB, DRB, TRB, AST, STL, BLK, TOV, PF, PTS, Year } = body;
        const newPlayer = await client.player.create({
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
        return NextResponse.json(newPlayer);
    } catch (error) {
        console.error(error); //error details in the server logs
        return NextResponse.json(
            { message: "Error creating player", error: error.message },
        );
    }
};

// function to handle GET requests to return all players, used to display all players
export const GET = async () => {
    try {
        const players = await client.player.findMany();
        return NextResponse.json(players);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Error getting players", error: error.message },
            { status: 500 }
        );
    }
}

// fetches players by using the GET function
export const FETCH = async () => {
    return await GET();
}




