//team/route.js
import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const teams = await client.team.findMany();
    return NextResponse.json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};
