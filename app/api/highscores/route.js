import { getServerSession } from "next-auth";
import client from "../../libs/prismadb";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async (req) => {
  try {
    // Authenticate the user
    const session = await getServerSession({ req, options: authOptions });

    if (!session) {
      return new Response(JSON.stringify({ message: "Not authenticated" }), { status: 401 });
    }

    // Fetch high scores for Higher-Lower game
    const highScoresHL = await client.user.findMany({
      where: { highScoreHL: { not: null } },
      orderBy: { highScoreHL: 'desc' },
      // Consider limiting the results if needed
      take: 10 // Fetch the top 10 scores
    });

    // Fetch high scores for Trivia game
    const highScoresT = await client.user.findMany({
      where: { highScoreT: { not: null } },
      orderBy: { highScoreT: 'desc' },
      // Consider limiting the results if needed
      take: 10 // Fetch the top 10 scores
    });

    // Return the high scores in the response
    return new Response(JSON.stringify({ highScoresHL, highScoresT }), { status: 200 });
  } catch (error) {
    console.error("Error fetching high scores:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
};
