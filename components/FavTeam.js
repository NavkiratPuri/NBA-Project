'use client'
import React, { useState, useEffect } from 'react';
import TeamSelector from '@/components/TeamSelector';
import teamsData from '@/utils/teamsData';
import axios from 'axios';



const FavTeam = () => {
    
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState([null]);
    const [favTeam, setFavTeam] = useState(null);
    const [favTeamId, setTeamId] = useState(null);
    
    
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const data = await teamsData();
                setTeams(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchTeams();
    }, []);





    return (
        <div className="bg-white rounded-lg shadow-md p-6">

            {/* <p>debug email: {email}</p>
            <p>debug favplayerId: {playerId}</p>
            <p>debug favteamId: {teamId}</p>
            <p>debug favPlayerid realtime: {favPlayerId}</p> */}

            
            {/* <p>debug favPlayer: {favPlayer?.name}</p> */}

            <TeamSelector teams={teams} onSelectTeam={(team)=>setSelectedTeam(team)}  label="Change Favorite Player"/>


        </div>
    );
};

export default FavTeam;
