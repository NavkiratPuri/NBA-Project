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
    setInput((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? parseFloat(value) || "" : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      router.reload();
    } catch (error) {
      console.error("Failed to submit player:", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-700 text-white px-2 py-1 rounded-md hover:bg-blue-800"
      >
        Add New Player
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 relative w-full max-w-md max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-0 right-0 mt-2 mr-2 text-gray-700 text-2xl"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Add a New Player</h2>
              {Object.keys(input).map((key) => (
                <div key={key} className="flex flex-col space-y-2">
                  <label
                    htmlFor={key}
                    className="text-sm font-medium text-gray-700"
                  >
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
                    step={numericFields.includes(key) ? "0.1" : undefined}
                  />
                </div>
              ))}
              <button
                type="submit"
                className="w-full mt-4 bg-blue-700 text-white px-5 py-2 rounded-md hover:bg-blue-800"
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
