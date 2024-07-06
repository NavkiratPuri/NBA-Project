import React, { useState, useEffect } from 'react';



const FavDisplay = ({ player }) => {

    

    return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-md">
                        {player &&
                            (
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-semibold">Favorite Player:</h2>
                                    <div>
                                        <p>Player: {player.Player}</p>
                                        <p>Team: {player.Tm}</p>
                                        <p>Points Per Game: {player.PTS}</p>
                                        <p>Assists Per Game: {player.AST}</p>
                                        <p>Blocks Per Game: {player.BLK}</p>
                                        <p>Steals Per Game: {player.STL}</p>
                                        <p>Rebounds Per Game: {(player.TRB)}</p>
                                        {/* <p>PLAYERID: {(player.id)}</p> */}
                                        
                                    </div>
                                </div>
                            )}
            </div>
    );
};

export default FavDisplay;