import client from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export const GET = async (request, { params }) => {
  try {
    const { id } = params;
    const team = await client.team.findUnique({
      where: { id: parseInt(id) },
    });
    if (!team) {
      return NextResponse.json({ status: 404 }, { message: 'Team not found' });
    }
    const players = await client.player.findMany({
      where: { teamId: parseInt(id) },
    });
    return NextResponse.json({ team, players });
  } catch (error) {
    return NextResponse.json({ status: 500 }, { message: 'Error getting team details', error });
  }
};
