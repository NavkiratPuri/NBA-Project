import { getServerSession } from "next-auth";
import client from "../../libs/prismadb";
import { authOptions } from "../auth/[...nextauth]/route";

export const PATCH = async (req) => {
  try {
    const session = await getServerSession({ req, options: authOptions });

    if (!session) {
      return new Response(JSON.stringify({ message: "Not authenticated" }), { status: 401 });
    }

    const { score } = await req.json();

    const user = await client.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    if (score > user.highScore) {
      const updatedUser = await client.user.update({
        where: { email: session.user.email },
        data: { highScore: score },
      });

      return new Response(JSON.stringify(updatedUser), { status: 200 });
    } else {
      return new Response(JSON.stringify(user), { status: 200 });
    }
  } catch (error) {
    console.error("Error in PATCH handler:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
};

export const FETCH = async () => {
  return await PATCH();
};
