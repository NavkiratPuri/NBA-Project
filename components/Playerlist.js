import React, { useState, useEffect } from "react";
import Player from "./Player";
import Modal from "./Modal";

const PAGE_SIZE = 20;

const teamMapping = {
  ATL: "Atlanta Hawks",
  BOS: "Boston Celtics",
  BKN: "Brooklyn Nets",
  CHA: "Charlotte Hornets",
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
  PHX: "Phoenix Suns",
  POR: "Portland Trail Blazers",
  SAC: "Sacramento Kings",
  SAS: "San Antonio Spurs",
  TOR: "Toronto Raptors",
  UTA: "Utah Jazz",
  WAS: "Washington Wizards",
  TOT: "Total"
};

const PlayerList = ({ players }) => {
  const [filteredPlayers, setFilteredPlayers] = useState(players);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [modalInfo, setModalInfo] = useState({ show: false, type: "", player: null });

  useEffect(() => {
    setFilteredPlayers(
      players.filter((player) =>
        player.Player.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.Tm.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (teamMapping[player.Tm] && teamMapping[player.Tm].toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );
  }, [searchTerm, players]);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedPlayers = [...filteredPlayers].sort((a, b) => {
      const aValue = isNaN(a[key]) ? a[key] : parseFloat(a[key]);
      const bValue = isNaN(b[key]) ? b[key] : parseFloat(b[key]);

      if (aValue < bValue) {
        return direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setFilteredPlayers(sortedPlayers);
  };

  const getArrow = (key) => {
    if (sortConfig.key !== key) return "";
    return sortConfig.direction === "ascending" ? "↑" : "↓";
  };

  const currentData = filteredPlayers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="container mx-auto px-2 sm:px-4">
      <div className="py-4">
        <div>
          <input
            type="text"
            placeholder="Search by player or team name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 mb-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-xs">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Rk",
                    "Player",
                    "Pos",
                    "Tm",
                    "G",
                    "GS",
                    "MP",
                    "FG",
                    "FGA",
                    "FGPercent",
                    "threeP",
                    "threePA",
                    "threePPercent",
                    "twoP",
                    "twoPA",
                    "twoPPercent",
                    "eFGPercent",
                    "FT",
                    "FTA",
                    "FTPercent",
                    "ORB",
                    "DRB",
                    "TRB",
                    "AST",
                    "STL",
                    "BLK",
                    "TOV",
                    "PF",
                    "PTS",
                  ].map((key) => (
                    <th
                      key={key}
                      className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort(key)}
                    >
                      {key} {getArrow(key)}
                    </th>
                  ))}
                  <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.length > 0 ? (
                  currentData.map((player) => (
                    <Player
                      key={player.id}
                      player={player}
                      onPlayerUpdate={(id, updatedPlayer) =>
                        setFilteredPlayers((prevPlayers) =>
                          prevPlayers.map((p) =>
                            p.id === id ? { ...p, ...updatedPlayer } : p
                          )
                        )
                      }
                      onPlayerDelete={(id) =>
                        setFilteredPlayers((prevPlayers) =>
                          prevPlayers.filter((p) => p.id !== id)
                        )
                      }
                      setModalInfo={setModalInfo}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="31" className="text-center py-4">
                      No players found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 bg-blue-700 text-white rounded-md disabled:bg-gray-400"
          >
            Previous
          </button>
          <span className="px-2 py-1">{currentPage}</span>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                prev * PAGE_SIZE >= filteredPlayers.length ? prev : prev + 1
              )
            }
            disabled={currentPage * PAGE_SIZE >= filteredPlayers.length}
            className="px-2 py-1 bg-blue-700 text-white rounded-md disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
      {modalInfo.show && (
        <Modal
          showModal={modalInfo.show}
          setShowModal={(show) => setModalInfo({ ...modalInfo, show })}
        >
          {modalInfo.type === "edit" && (
            <form onSubmit={handleEditSubmit} className="w-full px-5 pb-6">
              {Object.keys(modalInfo.player).map((key) => (
                <input
                  key={key}
                  type={typeof modalInfo.player[key] === "number" ? "number" : "text"}
                  placeholder={key}
                  name={key}
                  className="w-full p-2 mb-3"
                  value={modalInfo.player[key] || ""}
                  onChange={handleChange}
                  step="0.1"
                />
              ))}
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-700 text-white px-5 py-2"
              >
                Update Player
              </button>
            </form>
          )}
          {modalInfo.type === "delete" && (
            <div>
              <p className="text-lg text-grey-600 font-semibold my-2">
                Are you sure you want to delete this player?
              </p>
              <button
                onClick={handleDeletePlayer}
                className="bg-red-700 text-white mr-2 font-bold"
              >
                Yes
              </button>
              <button
                onClick={() => setModalInfo({ ...modalInfo, show: false })}
                className="bg-blue-800 text-white font-bold"
              >
                No
              </button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default PlayerList;
