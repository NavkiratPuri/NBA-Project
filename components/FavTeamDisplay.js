import React from "react";



const FavTeamDisplay = ({ team }) => {



    return (
        <div className="mt-4 p-4 bg-gray-600 rounded-lg shadow-md">
            {team &&
                (
                    <div className="space-y-2 rounded-lg p-2">
                        <h2 className="text-2xl font-semibold text-orange-400">Favorite Team:</h2>
                        <div>
                            <h1 className="text-white">{team.team}</h1>
                            <p className="text-white">Wins: {team.wins}</p>
                            <p className="text-white">Losses: {team.losses}</p>
                            <p className="text-white mb-2">Conference: {team.conference}</p>
                        </div>
                    </div>
                )}
        </div>
    );
}

export default FavTeamDisplay;