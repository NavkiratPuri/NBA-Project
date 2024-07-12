import React from "react";



const FavTeamDisplay = ({ team }) => {



    return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-md">
            {team &&
                (
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold">Favorite Team:</h2>
                        <div>
                            <h1>{team.team}</h1>
                            <p>Wins: {team.wins}</p>
                            <p>Losses: {team.losses}</p>
                            <p>Conference: {team.conference}</p>
                        </div>
                    </div>
                )}
        </div>
    );
}

export default FavTeamDisplay;