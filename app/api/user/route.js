import { getServerSession } from "next-auth";
import client from "../../libs/prismadb";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async (req) => {
  console.log("Request Headers:", req.headers);
  console.log("Request Cookies:", req.cookies);
  console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET);
  console.log('SECRET:', process.env.SECRET);

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

    console.log("User Data:", user);  // Add this line for debugging

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
};


export const FETCH = async () => {
  return await GET();
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
    const { newHighScore, gameType } = body;

    const updateData = {};
    if (gameType === 'higherLower') {
      updateData.highScoreHL = newHighScore;
    } else if (gameType === 'trivia') {
      updateData.highScoreT = newHighScore;
    } else {
      return new Response(JSON.stringify({ message: "Invalid game type" }), { status: 400 });
    }

    // Perform the update
    const updatedUser = await client.user.update({
      where: { email: session.user.email },
      data: updateData,
    });

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error("Error in PATCH handler:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
};

