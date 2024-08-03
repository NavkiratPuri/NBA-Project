"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddPlayer = () => {
  const router = useRouter();

  const [input, setInput] = useState({
    Rk: "",
    Player: "",
    Pos: "",
    Age: "",
    Tm: "",
    G: "",
    GS: "",
    MP: "",
    FG: "",
    FGA: "",
    FGPercent: "",
    threeP: "",
    threePA: "",
    threePPercent: "",
    twoP: "",
    twoPA: "",
    twoPPercent: "",
    eFGPercent: "",
    FT: "",
    FTA: "",
    FTPercent: "",
    ORB: "",
    DRB: "",
    TRB: "",
    AST: "",
    STL: "",
    BLK: "",
    TOV: "",
    PF: "",
    PTS: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const positions = ["PG", "SG", "SF", "PF", "C", "PF-C", "SG-SF", "PG-SG", "SF-PF"];
  const teams = {
    ATL: "ATL",
    BOS: "BOS",
    BKN: "BKN",
    CHA: "CHA",
    CHI: "CHI",
    CLE: "CLE",
    DAL: "DAL",
    DEN: "DEN",
    DET: "DET",
    GSW: "GSW",
    HOU: "HOU",
    IND: "IND",
    LAC: "LAC",
    LAL: "LAL",
    MEM: "MEM",
    MIA: "MIA",
    MIL: "MIL",
    MIN: "MIN",
    NOP: "NOP",
    NYK: "NYK",
    OKC: "OKC",
    ORL: "ORL",
    PHI: "PHI",
    PHX: "PHX",
    POR: "POR",
    SAC: "SAC",
    SAS: "SAS",
    TOR: "TOR",
    UTA: "UTA",
    WAS: "WAS",
  };

  const wholeNumberFields = ["Rk", "Age", "G", "GS"];
  const percentageFields = ["FGPercent", "threePPercent", "twoPPercent", "eFGPercent", "FTPercent"];
  const numericFields = [
    "Rk",
    "Age",
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
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    const numericValue = parseFloat(value);

    if (name === "Player" && /\d/.test(value)) {
      setError("Player name should not contain numbers.");
      return;
    } else if (percentageFields.includes(name) && (numericValue > 1 || numericValue < 0)) {
      setError(`${name} should be between 0 and 1.`);
      return;
    } else if (numericFields.includes(name) && numericValue < 0) {
      setError(`${name} cannot be negative.`);
      return;
    } else {
      setError("");
    }

    setInput((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? (numericValue || numericValue === 0 ? numericValue : "") : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if all fields are filled
    for (const key in input) {
      if (input[key] === "") {
        setError("All fields must be filled.");
        return;
      }
    }

    try {
      const response = await axios.post("/api/player", input);
      console.log("Successfully added player:", response.data);
      setInput({
        Rk: "",
        Player: "",
        Pos: "",
        Age: "",
        Tm: "",
        G: "",
        GS: "",
        MP: "",
        FG: "",
        FGA: "",
        FGPercent: "",
        threeP: "",
        threePA: "",
        threePPercent: "",
        twoP: "",
        twoPA: "",
        twoPPercent: "",
        eFGPercent: "",
        FT: "",
        FTA: "",
        FTPercent: "",
        ORB: "",
        DRB: "",
        TRB: "",
        AST: "",
        STL: "",
        BLK: "",
        TOV: "",
        PF: "",
        PTS: "",
      });
      setShowModal(false);
    } catch (error) {
      console.error("Failed to submit player:", error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="bg-orange-500 text-white px-2 py-1 rounded-md hover:bg-orange-600"
      >
        Add New Player
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 relative w-full max-w-md max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-0 right-0 mt-2 mr-2 text-gray-700 text-2xl"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <form onSubmit={handleSubmit} className="space-y-4 bg-gray-700 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-white">Add a New Player</h2>
              {Object.keys(input).map((key) => {
                if (key === "Pos") {
                  return (
                    <div key={key} className="flex flex-col space-y-2">
                      <label htmlFor={key} className="text-sm font-medium text-white">
                        {key}
                      </label>
                      <select
                        id={key}
                        name={key}
                        value={input[key]}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select Position</option>
                        {positions.map((position) => (
                          <option key={position} value={position}>
                            {position}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                } else if (key === "Tm") {
                  return (
                    <div key={key} className="flex flex-col space-y-2">
                      <label htmlFor={key} className="text-sm font-medium text-white">
                        {key}
                      </label>
                      <select
                        id={key}
                        name={key}
                        value={input[key]}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select Team</option>
                        {Object.keys(teams).map((team) => (
                          <option key={team} value={team}>
                            {team}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                } else {
                  return (
                    <div key={key} className="flex flex-col space-y-2">
                      <label htmlFor={key} className="text-sm font-medium text-white">
                        {key}
                      </label>
                      <input
                        id={key}
                        type={numericFields.includes(key) ? "number" : "text"}
                        name={key}
                        placeholder={key}
                        value={input[key] || ""}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        step={percentageFields.includes(key) ? "0.001" : wholeNumberFields.includes(key) ? "1" : "0.1"}
                        min="0"
                      />
                    </div>
                  );
                }
              })}
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className="w-full mt-4 bg-orange-500 text-white px-5 py-2 rounded-md hover:bg-orange-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPlayer;
