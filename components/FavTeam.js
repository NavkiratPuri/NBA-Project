'use client'
import React, { useState, useEffect } from 'react';
import TeamSelector from '@/components/TeamSelector';
import teamsData from '@/utils/teamsData';
import axios from 'axios';
import FavTeamDisplay from './FavTeamDisplay';
import fetchTeam from '@/utils/fetchTeam';


const FavTeam = ({teamId}) => {
    
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState([null]);
    const [favTeam, setFavTeam] = useState(null);
    const [favTeamId, setTeamId] = useState(teamId);
    
    useEffect(() => {


        const getFavTeamData = async () => {
            try{
                const data = await fetchTeam(teamId);
                console.log('data:', data);
                setFavTeam(data);
            } catch (err){
                setError(err.message);
            }
        };

        if (teamId) {
            getFavTeamData();
            console.log('teamId:', teamId);
        }
    }, [teamId]);


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

    useEffect(() => {
        console.log('Updated favTeamId:', favTeamId);
      }, [favTeamId]);

    const handleSelectTeam = (team) => {
        setFavTeam(team);
        setTeamId(team.id);
        updateFavTeam(team.id);
        
    };

    const updateFavTeam = async (teamId) => {
        try {
            const response = await axios.put(`/api/user`, {favTeamId: teamId});
            console.log('response:', response);
        } catch (error) {
            console.error('Error updating favTeam:', error);
        }
    }






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
