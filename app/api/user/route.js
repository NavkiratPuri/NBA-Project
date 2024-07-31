import { getServerSession } from "next-auth";
import client from "@/app/libs/prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const GET = async (req) => {
  try {
    const session = await getServerSession({ req, options: authOptions });

    if (!session) {
      return new Response(JSON.stringify({ message: "Not authenticated" }), { status: 401 });
    }

    const user = await client.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
};

export const PATCH = async (req) => {
  try {
    const session = await getServerSession({ req, options: authOptions });

    if (!session) {
      return new Response(JSON.stringify({ message: "Not authenticated" }), { status: 401 });
    }

    const user = await client.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    const body = await req.json();
    const { favPlayerId, newHighScore, gameType, favTeamId } = body;

    console.log('Request body:', body);

    if (favPlayerId === undefined && favTeamId === undefined && newHighScore === undefined) {
      return new Response(JSON.stringify({ message: "At least one of favPlayerId, favTeamId, or newHighScore is required" }), { status: 400 });
    }

    const updateData = {};
    if (favPlayerId !== undefined) updateData.favPlayerId = favPlayerId;
    if (favTeamId !== undefined) updateData.favTeamId = favTeamId;

    if (gameType) {
      if (gameType === 'higherLower') {
        updateData.highScoreHL = newHighScore;
      } else if (gameType === 'trivia') {
        updateData.highScoreTrivia = newHighScore;
      } else if (gameType === 'teambuilder') {
        updateData.highScoreT = newHighScore;
      } else {
        return new Response(JSON.stringify({ message: "Invalid game type" }), { status: 400 });
      }
    }

    const updatedUser = await client.user.update({
      where: { email: session.user.email },
      data: updateData,
    });

    console.log('Updated user:', updatedUser);

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error("Error in PATCH handler:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
};

export const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return await GET(req);
    case 'PATCH':
      return await PATCH(req);
    default:
      res.setHeader('Allow', ['GET', 'PATCH']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
