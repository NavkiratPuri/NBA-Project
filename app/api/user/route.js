

import { getServerSession } from "next-auth";
import client from "../../libs/prismadb";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async (req) => {
  const session = await getServerSession({ req , options: authOptions});

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
}

export const FETCH = async () => {
    return await GET();
}
