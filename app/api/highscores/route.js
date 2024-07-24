import { getServerSession } from "next-auth";
import client from "@/app/libs/prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const GET = async (req) => {
  try {
    // Fetch all users and their high scores
    const users = await client.user.findMany({
      select: {
        name: true,
        highScore: true,
      },
      orderBy: {
        highScore: 'desc',
      }
    });

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
};

export const FETCH = async () => {
  return await GET();
};
