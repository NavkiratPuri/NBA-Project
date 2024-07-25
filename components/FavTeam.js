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
    const [favTeamId, setFavTeamId] = useState(teamId);
    
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
        setFavTeamId(team.id);
        updateFavTeam(team.id);
        
    };

    const updateFavTeam = async (teamId) => {
        try {
            const response = await axios.patch('/api/user', {
                favTeamId: teamId
            });
            console.log('response:', response);
        }
        catch (error) {
            console.error('Error updating favPlayer:', error);
        }
    }






    return (
        <div className="bg-white rounded-lg shadow-md p-6">

            <FavTeamDisplay team={favTeam} />

            <h2 className="text-xl font-semibold">Select your favorite team:</h2>
            <TeamSelector teams={teams} onSelectTeam={handleSelectTeam} label="Change Favorite Team:" />

            


        </div>
    );
};

export default FavTeam;
