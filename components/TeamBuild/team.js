"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PlayerSelector from "@/components/PlayerSelector";
import playerData from "@/utils/playerData";
import { calculatePlayerValue } from "@/utils/calculateValue";

const teamMapping = {
  ATL: "Atlanta Hawks",
  BOS: "Boston Celtics",
  BRK: "Brooklyn Nets",
  CHO: "Charlotte Hornets",
  CHI: "Chicago Bulls",
  CLE: "Cleveland Cavaliers",
  DAL: "Dallas Mavericks",
  DEN: "Denver Nuggets",
  DET: "Detroit Pistons",
  GSW: "Golden State Warriors",
  HOU: "Houston Rockets",
  IND: "Indiana Pacers",
  LAC: "Los Angeles Clippers",
  LAL: "Los Angeles Lakers",
  MEM: "Memphis Grizzlies",
  MIA: "Miami Heat",
  MIL: "Milwaukee Bucks",
  MIN: "Minnesota Timberwolves",
  NOP: "New Orleans Pelicans",
  NYK: "New York Knicks",
  OKC: "Oklahoma City Thunder",
  ORL: "Orlando Magic",
  PHI: "Philadelphia 76ers",
  PHO: "Phoenix Suns",
  POR: "Portland Trail Blazers",
  SAC: "Sacramento Kings",
  SAS: "San Antonio Spurs",
  TOR: "Toronto Raptors",
  UTA: "Utah Jazz",
  WAS: "Washington Wizards",
};

const getRandomTeams = (players, numTeams = 5) => {
  const teams = [...new Set(players.map((player) => player.Tm))].filter(
    (team) => team in teamMapping,
  );
  const shuffledTeams = teams.sort(() => 0.5 - Math.random());
  return shuffledTeams.slice(0, numTeams);
};

const filterPlayersByTeams = (players, teams) => {
  return players.filter((player) => teams.includes(player.Tm));
};

const categorizePlayersByPosition = (players) => {
  const positions = ["C", "PF", "SF", "PG", "SG"];
  const categorized = {};

  positions.forEach((position) => {
    categorized[position] = players.filter((player) =>
      player.Pos.includes(position),
    );
  });

  return categorized;
};

const positionLabels = {
  C: "Center",
  PF: "Power Forward",
  SF: "Small Forward",
  PG: "Point Guard",
  SG: "Shooting Guard",
};

const TeamBuilder = () => {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [categorizedPlayers, setCategorizedPlayers] = useState({});
  const [selectedPlayers, setSelectedPlayers] = useState({
    C: null,
    PF: null,
    SF: null,
    PG: null,
    SG: null,
  });

  const [availableTeams, setAvailableTeams] = useState([]);
  const [usedPositions, setUsedPositions] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const updateHighScore = async () => {
      if (user) {
        try {
          if (totalValue > (user.highScoreT || 0)) {
            setIsNewHighScore(true);
            await axios.patch("/api/user", {
              newHighScore: totalValue,
              gameType: "teambuilder",
            });
          }
        } catch (error) {
          console.error("Error updating high score:", error);
        }
      }
    };

    updateHighScore();
  }, [totalValue, user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await playerData();
        const playersData = data.map((player) => ({
          id: player.Rk,
          Player: player.Player,
          Pos: player.Pos.split("-")[0], // Assuming position is separated by dash
          Tm: player.Tm,
          Year: player.Year,
          Age: player.Age,
          PTS: player.PTS,
          AST: player.AST,
          BLK: player.BLK,
          STL: player.STL,
          TOV: player.TOV,
          FTPercent: player.FTPercent,
          eFGPercent: player.eFGPercent,
          G: player.G,
          GS: player.GS,
          ORB: player.ORB,
          DRB: player.DRB,
          PF: player.PF,
          MP: player.MP,
          image: player.image,
        }));

        setPlayers(playersData);
        const initialTeams = getRandomTeams(playersData);
        setTeams(initialTeams);
        setAvailableTeams(initialTeams); // Initialize available teams
        const filteredPlayers = filterPlayersByTeams(playersData, initialTeams);
        setCategorizedPlayers(categorizePlayersByPosition(filteredPlayers));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const updateTeamsAndPlayers = (playersData) => {
    const newTeams = getRandomTeams(playersData);
    setTeams(newTeams);
    setAvailableTeams(newTeams); // Update available teams
    const filteredPlayers = filterPlayersByTeams(playersData, newTeams);
    setCategorizedPlayers(categorizePlayersByPosition(filteredPlayers));
  };

  const handleSelectPlayer = (position, player) => {
    setSelectedPlayers((prevState) => ({
      ...prevState,
      [position]: player,
    }));

    setAvailableTeams((prevTeams) =>
      prevTeams.filter((team) => team !== player.Tm),
    );
    setUsedPositions((prevState) => [...prevState, position]);
  };

  const handleDeselectPlayer = (position) => {
    const player = selectedPlayers[position];
    if (player) {
      setAvailableTeams((prevTeams) => [...prevTeams, player.Tm]);
      setSelectedPlayers((prevState) => ({
        ...prevState,
        [position]: null,
      }));
      setUsedPositions((prevState) =>
        prevState.filter((pos) => pos !== position),
      );
    }
  };

  const handleReset = async () => {
    try {
      const data = await playerData();
      const playersData = data.map((player) => ({
        id: player.Rk,
        Player: player.Player,
        Pos: player.Pos.split("-")[0], // Assuming position is separated by dash
        Tm: player.Tm,
        Year: player.Year,
        Age: player.Age,
        PTS: player.PTS,
        AST: player.AST,
        BLK: player.BLK,
        STL: player.STL,
        TOV: player.TOV,
        FTPercent: player.FTPercent,
        eFGPercent: player.eFGPercent,
        G: player.G,
        GS: player.GS,
        ORB: player.ORB,
        DRB: player.DRB,
        PF: player.PF,
        MP: player.MP,
        image: player.image,
      }));

      setSelectedPlayers({
        C: null,
        PF: null,
        SF: null,
        PG: null,
        SG: null,
      });
      setUsedPositions([]);
      updateTeamsAndPlayers(playersData);
      setTotalValue(0); // Reset the total value
    } catch (error) {
      console.error("Error resetting data:", error);
    }
  };

  const handleSubmit = () => {
    const values = Object.values(selectedPlayers);
    const calculatedValues = values.reduce(
      (acc, player) => {
        if (player) {
          const playerValue = calculatePlayerValue(player);
          acc.totalValue += playerValue.totalValue;
        }
        return acc;
      },
      { totalValue: 0 },
    );
    setTotalValue(calculatedValues.totalValue);
  };

  const filteredPlayersByPosition = (position) => {
    return (
      categorizedPlayers[position]?.filter((player) =>
        availableTeams.includes(player.Tm),
      ) || []
    );
  };

  return (
    <div className="container mx-auto">
      <div className="flex">
        {/* Left Section: Player Selection and Buttons */}
        <div className="flex flex-col w-1/2 ">
          <div className="flex flex-col mb-4">
            {/* Player Selection */}
            <div className="selected-players mb-8 border-t border-gray-300 flex flex-col">
              <h2 className="text-lg font-bold m-4 text-white">
                Player Selection
              </h2>
              <div className="bg-gray-800 text-white shadow-lg p-4 border-t border-gray-300">
                {Object.keys(positionLabels).map((position) => (
                  <div
                    key={position}
                    className="flex items-center mb-4 bg-gray-700 p-2 rounded-lg"
                  >
                    <div className="w-1/3 font-semibold text-lg">
                      {positionLabels[position]}
                    </div>
                    <div className="text-black w-2/3">
                      {selectedPlayers[position] ? (
                        <h1 className="bg-gray-700 text-white p-5 rounded-lg">
                          Already Picked.
                        </h1>
                      ) : (
                        <PlayerSelector
                          players={filteredPlayersByPosition(position)}
                          onSelectPlayer={(player) =>
                            handleSelectPlayer(position, player)
                          }
                          teams={availableTeams}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Value */}
            <div className="total-value p-4 border-t border-gray-300 flex flex-col items-center bg-gray-800 text-white shadow-lg py-3">
              <h2 className="text-lg font-bold mb-4">Total Score</h2>
              <div className="w-full bg-gray-700 text-white rounded-lg text-center">
                <p className="text-xl font-semibold m-2">
                  {totalValue.toFixed(2)}
                </p>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full p-2 bg-orange-500 text-white rounded hover:bg-orange-400 mt-4"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Selected Players and Available Teams */}
        <div className="w-1/2 flex flex-col pl-4">
          <div className="flex flex-col mb-4">
            {/* Selected Players */}
            <div className="selected-players border-t border-gray-300 flex flex-col">
              <h2 className="text-lg font-bold mb-4 text-white mt-4">
                Selected Players
              </h2>
              <div className="bg-gray-800 text-white shadow-lg border-t border-gray-300">
                {Object.keys(selectedPlayers).map((position) =>
                  selectedPlayers[position] ? (
                    <div
                      key={position}
                      className="flex items-center bg-gray-700 text-white p-3 m-4 rounded-lg"
                    >
                      <div className="w-1/4 font-semibold text-lg">
                        {positionLabels[position]}
                      </div>
                      <div className="flex items-center justify-between">
                        <img
                          src={selectedPlayers[position]?.image}
                          alt={
                            "https://cdn.nba.com/headshots/nba/latest/1040x760/1642351.png"
                          }
                          className="h-16 w-16 mr-3 ml-3 rounded-full"
                        />
                        <p className="mr-2">
                          {selectedPlayers[position].Player}
                        </p>
                        <p className="mr-2">{selectedPlayers[position].Tm}</p>
                        <p className="mr-2">{selectedPlayers[position].Year}</p>
                      </div>
                      <button
                        onClick={() => handleDeselectPlayer(position)}
                        className="p-2 bg-orange-500 text-white rounded hover:bg-orange-400 ml-auto mt-2"
                      >
                        Deselect
                      </button>
                    </div>
                  ) : (
                    <div
                      key={position}
                      className="flex items-center mb-4 bg-gray-700 text-white p-6 m-4 rounded-lg mb-6"
                    >
                      <div className="w-1/3 font-semibold text-lg">
                        {positionLabels[position]}
                      </div>
                      <div className="w-2/3 flex items-center">
                        <h1>Not Picked Yet.</h1>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Available Teams */}
            <div className="available-teams p-4 border-t border-gray-300 flex flex-col bg-gray-800 text-white mt-8">
              <h2 className="text-lg font-bold mb-4">Available Teams</h2>
              <div className="flex flex-wrap justify-between">
                {availableTeams.map((team) => (
                  <div
                    key={team}
                    className="w-1/5 p-2 bg-gray-700 text-white rounded text-center border border-gray-800"
                  >
                    {team}
                  </div>
                ))}
              </div>
              <button
                onClick={handleReset}
                className="p-2 bg-orange-500 text-white rounded hover:bg-orange-400 mt-4"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TeamBuilder;
