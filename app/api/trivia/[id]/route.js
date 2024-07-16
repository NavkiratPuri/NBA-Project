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
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }
        return NextResponse.json(trivia);
    } catch (error) {
        return NextResponse.json({ message: "Error getting post", error }, { status: 500 });
    }
}

// Function to handle PATCH requests to update a trivia question
export const PATCH = async (request, { params }) => {
    try {
        const body = await request.json();
        const { id } = params;
        const { question, optionA, optionB, optionC, optionD, correctAnswer } = body;

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
        if (!updateQuestion) {
            return NextResponse.json({ message: "Question not found" }, { status: 404 });
        }
        return NextResponse.json(updateQuestion);
    } catch (error) {
        return NextResponse.json({ message: "Error updating question", error }, { status: 500 });
    }
}

// Function to handle DELETE requests to remove a trivia question
export const DELETE = async (request, { params }) => {
    try {
        const { id } = params;

        const deleteQuestion = await client.trivia.delete({
            where: {
                id
            }
        });
        if (!deleteQuestion) {
            return NextResponse.json({ message: "Question not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Question deleted successfully" });
    } catch (error) {
        return NextResponse.json({ message: "Error deleting question", error }, { status: 500 });
    }
}

// Fetches questions using the GET function
export const FETCH = async () => {
    return await GET();
}
