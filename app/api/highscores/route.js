import { getServerSession } from "next-auth";
import client from "@/app/libs/prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
  try {
    const session = await getServerSession({ req, options: authOptions });

    if (!session) {
      return new Response(JSON.stringify({ message: "Not authenticated" }), { status: 401 });
    }

    const highScoresHL = await client.user.findMany({
      where: { highScoreHL: { not: null } },
      orderBy: { highScoreHL: 'desc' },
    });

    const highScoresT = await client.user.findMany({
      where: { highScoreT: { not: null } },
      orderBy: { highScoreT: 'desc' },
    });

    const highScoresTrivia = await client.user.findMany({
      where: { highScoreTrivia: { not: null } },
      orderBy: { highScoreTrivia: 'desc' },
    });

    return new Response(JSON.stringify({ highScoresHL, highScoresT, highScoresTrivia }), { status: 200 });
  } catch (error) {
    console.error("Error fetching high scores:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
