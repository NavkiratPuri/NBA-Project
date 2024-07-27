"use client";
import React, { useState, useEffect } from "react";
import PlayerSelector from "@/components/PlayerSelector";
import PlayerCard from "@/components/PlayerCard";
import Header from "@/components/header";
import Footer from "@/components/footer";
import playerData from "@/utils/playerData";
import { calculatePlayerValue } from "@/utils/calculateValue";
import DraftPicks from "@/components/DraftPicks";
import { avgStats, AvgModal } from "@/utils/avgStats";
import { Glossary } from "@/utils/glossary";

const Trade = () => {
  const [players, setPlayers] = useState([]);
  const [teamAPlayers, setTeamAPlayers] = useState([]);
  const [teamBPlayers, setTeamBPlayers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const [draftPicksTeamA, setDraftPicksTeamA] = useState([]);
  const [draftPicksTeamB, setDraftPicksTeamB] = useState([]);
  const [teamASalary, setTeamASalary] = useState(0);
  const [teamBSalary, setTeamBSalary] = useState(0);
  const SALARY_CAP = 136000000;
  const [isAvgStatsModalOpen, setIsAvgStatsModalOpen] = useState(false);
  const [teamAStats, setTeamAStats] = useState({});
  const [teamBStats, setTeamBStats] = useState({});
  const [isGlossaryOpen, setGlossaryOpen] = useState(false);
  const openGlossary = () => setGlossaryOpen(true);
  const closeGlossary = () => setGlossaryOpen(false);

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

  const selectPlayer = (player, team) => {
    const salary = parseFloat(player.Salary) || 0;

    if (team === "A") {
      setTeamAPlayers((prevPlayers) => [...prevPlayers, player]);
      setTeamASalary((prevSalary) => prevSalary + salary);
    } else if (team === "B") {
      setTeamBPlayers((prevPlayers) => [...prevPlayers, player]);
      setTeamBSalary((prevSalary) => prevSalary + salary);
    }
  };

  const removePlayer = (index, team) => {
    if (team === "A") {
      const playerToRemove = teamAPlayers[index];
      const salary = parseFloat(playerToRemove?.Salary) || 0;
      setTeamASalary((prevSalary) => prevSalary - salary);
      setTeamAPlayers((prevPlayers) =>
        prevPlayers.filter((_, i) => i !== index)
      );
    } else if (team === "B") {
      const playerToRemove = teamBPlayers[index];
      const salary = parseFloat(playerToRemove?.Salary) || 0;
      setTeamBSalary((prevSalary) => prevSalary - salary);
      setTeamBPlayers((prevPlayers) =>
        prevPlayers.filter((_, i) => i !== index)
      );
    }
  };

  const addDraftPick = (team, pick) => {
    if (team === "A") {
      setDraftPicksTeamA([...draftPicksTeamA, pick]);
    } else if (team === "B") {
      setDraftPicksTeamB([...draftPicksTeamB, pick]);
    }
  };

  const removeDraftPick = (index, team) => {
    if (team === "A") {
      setDraftPicksTeamA(draftPicksTeamA.filter((_, i) => i !== index));
    } else if (team === "B") {
      setDraftPicksTeamB(draftPicksTeamB.filter((_, i) => i !== index));
    }
  };

  const getTotalValue = (players, weights, draftPicks) => {
    const playersValue = players.reduce((total, player) => {
      if (player) {
        return total + calculatePlayerValue(player, weights).totalValue;
      }
      return total;
    }, 0);

    const draftPicksValue = draftPicks.reduce((total, pick) => {
      return total + pick.value;
    }, 0);

    return playersValue + draftPicksValue;
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
    const teamATotal = getTotalValue(teamAPlayers, weights, draftPicksTeamA);
    const teamBTotal = getTotalValue(teamBPlayers, weights, draftPicksTeamB);
    setTeamATotalValue(teamATotal);
    setTeamBTotalValue(teamBTotal);
  }, [weights, teamAPlayers, teamBPlayers, draftPicksTeamA, draftPicksTeamB]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const showAvgStats = () => {
    const avgStatsA = avgStats(teamAPlayers);
    const avgStatsB = avgStats(teamBPlayers);
    setTeamAStats(avgStatsA);
    setTeamBStats(avgStatsB);
    setIsAvgStatsModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow p-2">
        <div>
          <button
            className="bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 rounded"
            onClick={openModal}
          >
            Adjust Stat Weights
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 m-2 hover:bg-blue-600 rounded"
            onClick={showAvgStats}
          >
            Show Average Stats
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 rounded"
            onClick={openGlossary}
          >
            Glossary
          </button>
        </div>
        <div className="flex justify-end mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 relative">
          <div className="pr-2 border-r-2 border-black">
            <h2 className="text-center text-xl font-bold mb-2">Team A</h2>
            <PlayerSelector
              players={players}
              onSelectPlayer={(player) => selectPlayer(player, "A")}
            />
            <DraftPicks
              draftPicks={draftPicksTeamA}
              onSelectDraftPick={(pick) => addDraftPick("A", pick)}
              onRemoveDraftPick={(index) => removeDraftPick(index, "A")}
              team="A"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
              {teamAPlayers.map((player, index) => (
                <PlayerCard
                  key={index}
                  player={player}
                  onRemove={() => removePlayer(index, "A")}
                  weights={weights}
                />
              ))}
            </div>
            <div className="rounded-lg  p-4 text-center mx-4">
              <p className="text-lg font-bold">Team A Salary</p>
              <p
                className={`text-lg font-bold ${
                  teamASalary >= SALARY_CAP ? "text-red-500" : "text-green-500"
                }`}
              >
                ${teamASalary}M / ${SALARY_CAP}M
              </p>
            </div>
          </div>
          <div className="">
            <h2 className="text-center text-xl font-bold mb-2">Team B</h2>
            <PlayerSelector
              players={players}
              onSelectPlayer={(player) => selectPlayer(player, "B")}
            />
            <DraftPicks
              draftPicks={draftPicksTeamB}
              onSelectDraftPick={(pick) => addDraftPick("B", pick)}
              onRemoveDraftPick={(index) => removeDraftPick(index, "B")}
              team="B"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
              {teamBPlayers.map((player, index) => (
                <PlayerCard
                  key={index}
                  player={player}
                  onRemove={() => removePlayer(index, "B")}
                  weights={weights}
                />
              ))}
            </div>
            <div className=" rounded-lg  p-4 text-center mx-4">
              <p className="text-lg font-bold">Team B Salary</p>
              <p
                className={`text-lg font-bold ${
                  teamBSalary > SALARY_CAP ? "text-red-500" : "text-green-500"
                }`}
              >
                ${teamBSalary}M / ${SALARY_CAP}M
              </p>
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

        <div>
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
              </div>
            </div>
          )}
        </div>
        <div>
          <AvgModal
            isOpen={isAvgStatsModalOpen}
            onClose={() => setIsAvgStatsModalOpen(false)}
            teamAStats={teamAStats}
            teamBStats={teamBStats}
          />
          <Glossary isOpen={isGlossaryOpen} onClose={closeGlossary} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Trade;
