import { getServerSession } from "next-auth";
import client from "@/app/libs/prismadb"; // Adjust the import path as needed
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust the import path as needed

export async function PATCH(request) {
    try {
      const session = await getServerSession({ req: request, options: authOptions });
  
      if (!session) {
        return new Response(JSON.stringify({ message: "Not authenticated" }), { status: 401 });
      }
  
      const { newHighScore, gameType } = await request.json();
  
      if (!newHighScore || !gameType) {
        return new Response(JSON.stringify({ message: "Invalid request data" }), { status: 400 });
      }
  
      const user = await client.user.findUnique({
        where: { email: session.user.email },
      });
  
      if (!user) {
        return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
      }
  
      const updatedUser = await client.user.update({
        where: { email: session.user.email },
        data: {
          highScoreHL: Math.max(newHighScore, user.highScoreHL || 0),
        },
      });
  
      return new Response(JSON.stringify(updatedUser), { status: 200 });
    } catch (error) {
      console.error("Error updating high score:", error);
      return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
  }