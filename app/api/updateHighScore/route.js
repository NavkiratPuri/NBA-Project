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

    // Determine the field to update based on gameType
    let updateData;
    if (gameType === 'higherlower') {
      updateData = { highScoreHL: newHighScore };
    } else if (gameType === 'teambuilder') {
      updateData = { highScoreT: newHighScore };
    } else {
      return NextResponse.json({ error: 'Invalid game type' }, { status: 400 });
    }

    const updatedUser = await client.user.update({
      where: { email: session.user.email },
      data: updateData,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating high score:', error);
    return NextResponse.json({ error: 'Failed to update high score' }, { status: 500 });
  }
}
