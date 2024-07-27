import React from "react";

const DraftPicks = ({
  onSelectDraftPick,
  draftPicks,
  onRemoveDraftPick,
  team,
}) => {
  const availableDraftPicks = [
    { type: "UP-1R", value: 100 },
    { type: "P-1R", value: 80 },
    { type: "S-1R", value: 75 },
    { type: "F-1R", value: 65 },
    { type: "UP-2R", value: 50 },
    { type: "P-2R", value: 45 },
    { type: "Con", value: 40 },
    { type: "S-2R", value: 40 },
    { type: "F-2R", value: 30 },
  ];

  return (
    <div>
      <div className="flex flex-col-">
        <p className="grid items-start mt-4 mr-4 text-md font-semibold">
          Add Draft Pick:
        </p>
        {availableDraftPicks.map((pick, index) => (
          <button
            key={index}
            className="p-1  m-2 bg-gray-300 hover:bg-gray-400 rounded"
            onClick={() => onSelectDraftPick(pick)}
          >
            {pick.type}
          </button>
        ))}
      </div>
      <hr className="my-4 border-t-2 border-black" />
      <div className="mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {draftPicks.map((pick, index) => (
            <div
              key={index}
              className="p-2 border bg-gray-200 hover:bg-gray-300 rounded relative"
            >
              <p className="text-center">{pick.type}</p>
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                onClick={() => onRemoveDraftPick(index, team)}
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DraftPicks;
