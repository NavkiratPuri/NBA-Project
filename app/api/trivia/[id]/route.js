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
