import React, { useState, useEffect } from "react";
import TeamSelect from "@/components/teamSelect";
import PlayerCard from "@/components/PlayerCard";
import Header from "@/components/header";
import Footer from "@/components/footer";
import playerData from "@/utils/playerData";
import calculatePlayerValue from "@/utils/calculateValue";
import Trade from "@/app/(pages)/trade/page";
import DraftPicks from "@/components/DraftPicks";

const TeamTrade = () => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayersTeamA, setFilteredPlayersTeamA] = useState([]);
  const [filteredPlayersTeamB, setFilteredPlayersTeamB] = useState([]);
  const [teamATotalValue, setTeamATotalValue] = useState(0);
  const [teamBTotalValue, setTeamBTotalValue] = useState(0);
  const [isTrade, setIsTeamTrade] = useState(false);
  const [draftPicksTeamA, setDraftPicksTeamA] = useState([]);
  const [draftPicksTeamB, setDraftPicksTeamB] = useState([]);

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

  const handleFilterPlayers = (filtered, team) => {
    if (team === "A") {
      setFilteredPlayersTeamA(filtered);
    } else if (team === "B") {
      setFilteredPlayersTeamB(filtered);
    }
  };

  const handleRemovePlayer = (index, team) => {
    if (team === "A") {
      setFilteredPlayersTeamA(
        filteredPlayersTeamA.filter((_, i) => i !== index)
      );
    } else if (team === "B") {
      setFilteredPlayersTeamB(
        filteredPlayersTeamB.filter((_, i) => i !== index)
      );
    }
  };

  const handleAddDraftPick = (team, pick) => {
    if (team === "A") {
      setDraftPicksTeamA([...draftPicksTeamA, pick]);
    } else if (team === "B") {
      setDraftPicksTeamB([...draftPicksTeamB, pick]);
    }
  };

  const handleRemoveDraftPick = (index, team) => {
    if (team === "A") {
      setDraftPicksTeamA(draftPicksTeamA.filter((_, i) => i !== index));
    } else if (team === "B") {
      setDraftPicksTeamB(draftPicksTeamB.filter((_, i) => i !== index));
    }
  };

  const getTotalValue = (players, draftPicks) => {
    const playerValue = players.reduce((total, player) => {
      if (player) {
        return total + calculatePlayerValue(player).totalValue;
      }
      return total;
    }, 0);

    const draftPickValue = draftPicks.reduce(
      (total, pick) => total + pick.value,
      0
    );

    return playerValue + draftPickValue;
  };

  useEffect(() => {
    const teamATotal = getTotalValue(filteredPlayersTeamA, draftPicksTeamA);
    const teamBTotal = getTotalValue(filteredPlayersTeamB, draftPicksTeamB);
    setTeamATotalValue(teamATotal);
    setTeamBTotalValue(teamBTotal);
  }, [
    filteredPlayersTeamA,
    filteredPlayersTeamB,
    draftPicksTeamA,
    draftPicksTeamB,
  ]);

  if (isTrade) {
    return <Trade />;
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
            Switch to Trade Sim
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 relative">
          <div className="pr-2 border-r-2 border-black">
            <h2 className="text-center text-xl font-bold mb-2">
              Team A (Click the cards for stats then click again for
              values!!!!!)
            </h2>
            <TeamSelect
              players={players}
              onFilterPlayers={(filtered) => handleFilterPlayers(filtered, "A")}
            />
            <DraftPicks
              draftPicks={draftPicksTeamA}
              onSelectDraftPick={(pick) => handleAddDraftPick("A", pick)}
              onRemoveDraftPick={handleRemoveDraftPick}
              team="A"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
              {filteredPlayersTeamA.map((player, index) => (
                <PlayerCard
                  key={index}
                  player={player}
                  onRemove={() => handleRemovePlayer(index, "A")}
                />
              ))}
            </div>
          </div>
          <div className="">
            <h2 className="text-center text-xl font-bold mb-2">
              Team B (Click the cards for stats then click again for
              values!!!!!)
            </h2>
            <TeamSelect
              players={players}
              onFilterPlayers={(filtered) => handleFilterPlayers(filtered, "B")}
            />
            <DraftPicks
              draftPicks={draftPicksTeamB}
              onSelectDraftPick={(pick) => handleAddDraftPick("B", pick)}
              onRemoveDraftPick={handleRemoveDraftPick}
              team="B"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
              {filteredPlayersTeamB.map((player, index) => (
                <PlayerCard
                  key={index}
                  player={player}
                  onRemove={() => handleRemovePlayer(index, "B")}
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
      </main>
      <Footer />
    </div>
  );
};

export default TeamTrade;
