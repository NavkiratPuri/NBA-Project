// utils/GlossaryWS.js
import React from "react";

export const GlossaryWS = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-md w-3/6 flex flex-col">
                <h2 className="text-center mt-2 font-bold text-2xl">Glossary</h2>
                <div className="flex flex-col p-4 justify-center">
                    <p>
                        <strong>WS/48:</strong> Win Shares per 48 minutes. It is an advanced statistic that attempts to divvy up credit for team success to the individuals on the team. WS/48 is calculated by dividing a player's total win shares by the number of minutes they played, then multiplying by 48. The league average is typically set at 0.100.
                    </p>
                    <p>
                        <strong>BPM:</strong> Box Plus/Minus. It is a box score-based metric for evaluating basketball players' quality and contribution to the team while on the court. BPM takes into account both offensive and defensive contributions and is calculated using box score statistics to estimate a player's overall impact per 100 possessions.
                    </p>
                </div>

                <div className="flex justify-center mb-2">
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
