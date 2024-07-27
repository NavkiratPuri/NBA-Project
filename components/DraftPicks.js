import React from "react";

const DraftPicks = ({
  onSelectDraftPick,
  draftPicks,
  onRemoveDraftPick,
  team,
}) => {
  const availableDraftPicks = [
    { type: "Lottery Pick", value: 30 },
    { type: "1st Round Pick", value: 20 },
    { type: "2nd Round Pick", value: 10 },
  ];

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Add Draft Pick</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {availableDraftPicks.map((pick, index) => (
          <button
            key={index}
            className="p-2 border bg-gray-200 hover:bg-gray-300 rounded"
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
