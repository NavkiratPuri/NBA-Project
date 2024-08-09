"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PlayerDisplay from "@/components/PlayerDisplay";
import playerData from "@/utils/playerData";

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

const years = Array.from({ length: 2024 - 1992 + 1 }, (_, i) => 1992 + i);

const Team = () => {
  const [team, setTeam] = useState("");
  const [year, setYear] = useState("");
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);

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

  useEffect(() => {
    if (team && year) {
      const filtered = players.filter(
        (player) => player.Tm === team && player.Year === year
      );
      setFilteredPlayers(filtered);
    }
  }, [team, year, players]);

  const handleTeamChange = (e) => {
    setTeam(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-700">
      <Header />
      <main className="mt-2">
        <div className="flex flex-wrap mb-4">
          <div className="flex-1 mr-4">
            <label
              htmlFor="team"
              className="block text-lg text-white font-bold mb-2"
            >
              Select Team:
            </label>
            <select
              id="team"
              value={team}
              onChange={handleTeamChange}
              className="p-2 border rounded w-full"
            >
              <option value="">Select a team</option>
              {Object.entries(teamMapping).map(([key, name]) => (
                <option key={key} value={key}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label
              htmlFor="year"
              className="block text-lg text-white font-bold mb-2"
            >
              Select Year:
            </label>
            <select
              id="year"
              value={year}
              onChange={handleYearChange}
              className="p-2 border rounded w-full"
            >
              <option value="">Select a year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
          {filteredPlayers.map((player, index) => (
            <PlayerDisplay
              className="gap-1"
              key={index}
              player={player}
              weights={{}}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Team;
