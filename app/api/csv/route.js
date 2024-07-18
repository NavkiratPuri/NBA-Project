import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { NextResponse } from 'next/server';

export const GET = async () => {
    const csvFilePath = path.join(process.cwd(), 'public', 'NBAStats.csv');
    const players = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (row) => {
                players.push(row);
            })
            .on('end', () => {
                resolve(NextResponse.json(players));
            })
            .on('error', (error) => {
                console.error('Error reading CSV file:', error);
                reject(NextResponse.json({ message: 'Error reading CSV file', error: error.message }, { status: 500 }));
            });
    });
};