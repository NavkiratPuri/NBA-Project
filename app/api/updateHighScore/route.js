import { getServerSession } from "next-auth";
import client from "../../libs/prismadb"; // Adjust the import path as needed
import { authOptions } from "../auth/[...nextauth]/route"; // Adjust the import path as needed

export async function PATCH(req) {
  try {
    // Authenticate the user
    const session = await getServerSession({ req, options: authOptions });

    if (!session) {
      return new Response(JSON.stringify({ message: "Not authenticated" }), { status: 401 });
    }

    const userEmail = session.user.email;
    const body = await req.json();
    const { newHighScore, gameType } = body;

    // Find the user in the database
    const user = await client.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    let updatedUser;
    if (gameType === 'higherLower') {
      if (user.highScoreHL && newHighScore <= user.highScoreHL) {
        return new Response(JSON.stringify({ message: "New score is not higher" }), { status: 400 });
      }

      updatedUser = await client.user.update({
        where: { email: userEmail },
        data: { highScoreHL: newHighScore },
      });
    } else if (gameType === 'trivia') {
      if (user.highScoreT && newHighScore <= user.highScoreT) {
        return new Response(JSON.stringify({ message: "New score is not higher" }), { status: 400 });
      }

      updatedUser = await client.user.update({
        where: { email: userEmail },
        data: { highScoreT: newHighScore },
      });
    } else {
      return new Response(JSON.stringify({ message: "Invalid game type" }), { status: 400 });
    }

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error("Error updating high score:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
