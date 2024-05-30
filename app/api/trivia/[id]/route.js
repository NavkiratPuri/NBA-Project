import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Function to handle GET requests to return a specific trivia question
export const GET = async (request, { params }) => {
    try {
        const { id } = params;
        const trivia = await client.trivia.findUnique({
            where: {
                id
            }
        });
        if (!trivia) {
            return NextResponse.json({ status: 404 }, { message: "Post not found" })
        }
        return NextResponse.json(trivia);
    } catch (error) {
        return NextResponse.json({ status: 500 }, { message: "Error getting post", error })

    }
}

// Function to handle PATCH requests to update a trivia question
export const PATCH = async (request, { params }) => {
    try {
        const body = await request.json();
        const { id } = params;
        const { question,
            optionA,
            optionB,
            optionC,
            optionD,
            correctAnswer, } = body;
        // updates the player in the database
        const updateQuestion = await client.trivia.update({
            where: {
                id
            },
            data: {
                question,
                optionA,
                optionB,
                optionC,
                optionD,
                correctAnswer,
            }
        });
        // if the player is not found, return a 404 status
        if (!updateQuestion) {
            return NextResponse.json({ status: 404 }, { message: "Team not found" })
        }
        return NextResponse.json(updateQuestion);

    } catch (error) {
        return NextResponse.json({ status: 500 }, { message: "Error updating team", error })
    }
}
// Fetches questions using the GET function
export const FETCH = async () => {
    return await GET();
}

// Function to handle GET requests to return multiple random trivia questions
export const GET_RANDOM = async (request) => {
    try {
        const randomTrivia = await client.trivia.findMany({
            take: 5,
            orderBy: {
                id: 'asc'  // Assuming MongoDB supports this; otherwise, modify based on available Prisma functions
            }
        });
        if (randomTrivia.length === 0) {
            return new NextResponse(JSON.stringify({ message: "No trivia questions found" }), { status: 404 });
        }
        return new NextResponse(JSON.stringify(randomTrivia));
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Error getting trivia questions", error }), { status: 500 });
    }
}