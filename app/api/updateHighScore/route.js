// app/api/updateHighscore/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import client from '@/app/libs/prismadb'; // Adjust the import path as needed
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Adjust the import path as needed
import { cookies } from 'next/headers';

export async function PATCH(req) {
  const session = await getServerSession({ req, cookies });

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { newHighScore, gameType } = await req.json();

    const updatedUser = await client.user.update({
      where: { email: session.user.email },
      data: { highScoreHL: newHighScore },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating high score:', error);
    return NextResponse.json({ error: 'Failed to update high score' }, { status: 500 });
  }
}
