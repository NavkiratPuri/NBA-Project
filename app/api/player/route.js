//player/route.js
import client from "../../libs/prismadb";
import { NextResponse } from "next/server";

// url: http://localhost:3000/api/post

// function to handle POST requests to create a new player data, returns new player if successful, or an error message if not
export const POST = async (req) => {
    try {
        const body = await req.json();
        const { Rk, Player, Pos, Age, Tm, G, GS, MP, FG, FGA, FGPercent,
            threeP, threePA, threePPercent, twoP, twoPA, twoPPercent,
            eFGPercent, FT, FTA, FTPercent, ORB, DRB, TRB, AST, STL, BLK, TOV, PF, PTS } = body;
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
                PTS
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

const evaluateTrade = (player1, player2, categories) => {
    let matches = 0;
    categories.forEach(category => {
        if (player1[category] && player2[category] && player1[category] === player2[category]) {
            matches++;
        }
    });
    return matches >= 3;  // Trade goes through if there are at least 3 matches
};

// Endpoint to handle trade proposals
export const TRADE = async (req) => {
    try {
        const { player1Id, player2Id } = await req.json();
        const categories = ['MPG', 'PPG', 'RPG', 'APG', 'SPG', 'BPG']; // The stats categories to compare

        // Fetch players from the database
        const player1 = await client.player.findUnique({ where: { id: player1Id } });
        const player2 = await client.player.findUnique({ where: { id: player2Id } });

        // Evaluate the trade
        if (evaluateTrade(player1, player2, categories)) {
            return NextResponse.json({
                message: "Trade approved",
                players: [player1, player2]
            });
        } else {
            return NextResponse.json({
                message: "Trade rejected",
                reason: "Players do not match in at least three statistical categories"
            }, { status: 400 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Error processing trade",
            error: error.message
        }, { status: 500 });
    }
};


