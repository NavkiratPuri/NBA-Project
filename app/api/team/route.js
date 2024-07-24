//api/teams/route.js
import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const teams = await client.team.findMany();
        return NextResponse.json(teams);
    } catch (error) {
        return NextResponse.json({ status: 500 }, { message: "Error getting teams", error });
    }
};
