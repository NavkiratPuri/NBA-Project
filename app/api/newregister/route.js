import bcrypt from 'bcrypt';
import prisma from '../../libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const body = await request.json();
    const {name, email, password} = body;

    if (!name || !email || !password) {
     
        return new NextResponse('Missing fields', {status: 400});
    
    }

    const exist = await prisma.User.findUnique({
        where: {
            email
        }
    });

    if (exist) {
        return new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const User = await prisma.User.create({
        data: {
            name,
            email,
            hashedPassword
        }
    });

    return NextResponse.json(User);
    

}