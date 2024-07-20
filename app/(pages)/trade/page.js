"use client";
import React, { useState, useEffect } from "react";
import PlayerSelector from "@/components/PlayerSelector";
import PlayerCard from "@/components/PlayerCard";
import Header from "@/components/header";
import Footer from "@/components/footer";
import playerData from "@/utils/playerData";
import { calculatePlayerValue } from "@/utils/calculateValue";
import TeamTrade from "@/components/teamTrade";

const Trade = () => {
  const [players, setPlayers] = useState([]);
  const [teamAPlayers, setTeamAPlayers] = useState([]);
  const [teamBPlayers, setTeamBPlayers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTeamTrade, setIsTeamTrade] = useState(false);
  const [weights, setWeights] = useState({
    ppg: 1,
    apg: 1.5,
    bpg: 2,
    spg: 2,
    to: -1,
    ft: 10,
    efg: 20,
    gp: 0.1,
    gs: 0.2,
    or: 1.5,
    dr: 1,
    pf: -0.3,
    mp: 0.5,
    age: 0,
  });
  const [tempWeights, setTempWeights] = useState(weights);
  const [teamATotalValue, setTeamATotalValue] = useState(0);
  const [teamBTotalValue, setTeamBTotalValue] = useState(0);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await playerData();
        setPlayers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPlayers();
  }, []);

  const handleSelectPlayer = (player, team) => {
    if (team === "A") {
      setTeamAPlayers([...teamAPlayers, player]);
    } else if (team === "B") {
      setTeamBPlayers([...teamBPlayers, player]);
    }
  };

  const handleRemovePlayer = (index, team) => {
    if (team === "A") {
      setTeamAPlayers(teamAPlayers.filter((_, i) => i !== index));
    } else if (team === "B") {
      setTeamBPlayers(teamBPlayers.filter((_, i) => i !== index));
    }
  };

  const getTotalValue = (players, weights) => {
    return players.reduce((total, player) => {
      if (player) {
        return total + calculatePlayerValue(player, weights).totalValue;
      }
      return total;
    }, 0);
  };

  const handleWeightChange = (e) => {
    const { name, value } = e.target;
    setTempWeights({ ...tempWeights, [name]: parseFloat(value) });
  };

  const saveWeights = () => {
    setWeights(tempWeights);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const teamATotal = getTotalValue(teamAPlayers, weights);
    const teamBTotal = getTotalValue(teamBPlayers, weights);
    setTeamATotalValue(teamATotal);
    setTeamBTotalValue(teamBTotal);
  }, [weights, teamAPlayers, teamBPlayers]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isTeamTrade) {
    return <TeamTrade />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow p-3">
        <div className="flex justify-end mb-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => setIsTeamTrade(true)}
          >
            Switch to Team Trade
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 relative">
          <div className="pr-2 border-r-2 border-black">
            <h2 className="text-center text-xl font-bold mb-2">
              Team A (Click the cards for stats then click again for
              values!!!!!)
            </h2>
            <PlayerSelector
              players={players}
              onSelectPlayer={(player) => handleSelectPlayer(player, "A")}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
              {teamAPlayers.map((player, index) => (
                <PlayerCard
                  key={index}
                  player={player}
                  onRemove={() => handleRemovePlayer(index, "A")}
                  weights={weights}
                />
              ))}
            </div>
          </div>
          <div className="">
            <h2 className="text-center text-xl font-bold mb-2">
              Team B (Click the cards for stats then click again for
              values!!!!!)
            </h2>
            <PlayerSelector
              players={players}
              onSelectPlayer={(player) => handleSelectPlayer(player, "B")}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
              {teamBPlayers.map((player, index) => (
                <PlayerCard
                  key={index}
                  player={player}
                  onRemove={() => handleRemovePlayer(index, "B")}
                  weights={weights}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <div className="flex justify-center items-center gap-8">
            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <p
                className={`text-2xl font-bold ${
                  teamATotalValue >= teamBTotalValue
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {teamATotalValue.toFixed(2)}
              </p>
            </div>
            <p className="font-bold text-2xl">VS</p>
            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <p
                className={`text-2xl font-bold ${
                  teamBTotalValue >= teamATotalValue
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {teamBTotalValue.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={openModal}
        >
          Adjust Stat Weights
        </button>
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-2 rounded-lg shadow-md w-11/12 max-w-3xl">
              <h2 className="text-center text-xl font-bold mb-2">
                Adjust Stat Weights
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {Object.keys(tempWeights).map((key) => (
                  <div key={key} className="flex flex-col items-center">
                    <label className="text-center mb-1 font-medium">
                      {key.toUpperCase()}
                    </label>
                    <input
                      type="number"
                      name={key}
                      value={tempWeights[key]}
                      onChange={handleWeightChange}
                      className="p-2 border rounded text-center w-20"
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-center items-center mt-2 space-x-2">
                <button
                  className="bg-red-500 text-white py-2 px-2 rounded"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-500 text-white py-2 px-2 rounded"
                  onClick={saveWeights}
                >
                  Save
                </button>
              </div>
              <div className="mt-2 text-center">
                <p className="text-xs text-gray-500">
                  PPG (Points), APG (Assists), BPG (Blocks), SPG (Steals), TO
                  (Turnovers), FT (Free Throws), EFG (Effective Field Goal)
                </p>
                <p className="text-xs text-gray-500">
                  GP (Games Played), GS(Games Started), OR (Offensive Rebounds),
                  DR (Defensive Rebounds), PF (Personal Fouls), MP (Minutes
                  Played)
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Trade;
