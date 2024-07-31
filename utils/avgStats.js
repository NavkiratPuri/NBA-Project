export const avgStats = (players) => {
  if (players.length === 0) {
    return {
      age: 0,
      ppg: 0,
      apg: 0,
      bpg: 0,
      spg: 0,
      to: 0,
      ft: 0,
      efg: 0,
      gp: 0,
      gs: 0,
      or: 0,
      dr: 0,
      pf: 0,
      mp: 0,
    };
  }

  const totalStats = players.reduce(
    (acc, player) => {
      acc.age += Number(player.Age) || 0;
      acc.ppg += Number(player.PTS) || 0;
      acc.apg += Number(player.AST) || 0;
      acc.bpg += Number(player.BLK) || 0;
      acc.spg += Number(player.STL) || 0;
      acc.to += Number(player.TOV) || 0;
      acc.ft += Number(player.FTPercent) || 0;
      acc.efg += Number(player.eFGPercent) || 0;
      acc.gp += Number(player.G) || 0;
      acc.gs += Number(player.GS) || 0;
      acc.or += Number(player.ORB) || 0;
      acc.dr += Number(player.DRB) || 0;
      acc.pf += Number(player.PF) || 0;
      acc.mp += Number(player.MP) || 0;
      return acc;
    },
    {
      age: 0,
      ppg: 0,
      apg: 0,
      bpg: 0,
      spg: 0,
      to: 0,
      ft: 0,
      efg: 0,
      gp: 0,
      gs: 0,
      or: 0,
      dr: 0,
      pf: 0,
      mp: 0,
    }
  );

  const playerCount = players.length;
  return {
    age: totalStats.age / playerCount,
    ppg: totalStats.ppg / playerCount,
    apg: totalStats.apg / playerCount,
    bpg: totalStats.bpg / playerCount,
    spg: totalStats.spg / playerCount,
    to: totalStats.to / playerCount,
    ft: totalStats.ft / playerCount,
    efg: totalStats.efg / playerCount,
    gp: totalStats.gp / playerCount,
    gs: totalStats.gs / playerCount,
    or: totalStats.or / playerCount,
    dr: totalStats.dr / playerCount,
    pf: totalStats.pf / playerCount,
    mp: totalStats.mp / playerCount,
  };
};

export const AvgModal = ({ isOpen, onClose, teamAStats, teamBStats }) => {
  if (!isOpen) return null;

  const getColorClass = (teamAValue, teamBValue) => {
    if (teamAValue > teamBValue) {
      return ["text-green-500", "text-red-500"];
    } else if (teamAValue < teamBValue) {
      return ["text-red-500", "text-green-500"];
    } else {
      return ["text-black", "text-black"];
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-md w-1/6 max-h-1/6">
        <h2 className="text-center text-xl font-bold mb-4">
          Average Stats Comparison
        </h2>
        <div className="flex flex-cols-3 justify-center gap-2">
          <div className="flex flex-col items-end pr-2">
            <h3 className="text-lg font-bold mb-2">Team A</h3>
            <ul>
              {Object.keys(teamAStats).map((stat) => {
                const [teamAClass, teamBClass] = getColorClass(
                  teamAStats[stat],
                  teamBStats[stat]
                );
                return (
                  <li key={stat} className="flex justify-end items-center mb-1">
                    <span className={`font-bold ${teamAClass}`}>
                      {stat.toUpperCase()}
                    </span>
                    <span className={`ml-2 ${teamAClass}`}>
                      {teamAStats[stat].toFixed(2)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex item-center mr-2 border-r-2 border-black"></div>
          <div className="flex flex-col items-start pl-2">
            <h3 className="text-lg font-bold mb-2">Team B</h3>
            <ul>
              {Object.keys(teamBStats).map((stat) => {
                const [teamAClass, teamBClass] = getColorClass(
                  teamAStats[stat],
                  teamBStats[stat]
                );
                return (
                  <li
                    key={stat}
                    className="flex justify-start items-center mb-1"
                  >
                    <span className={`mr-2 ${teamBClass}`}>
                      {teamBStats[stat].toFixed(2)}
                    </span>
                    <span className={`font-bold ${teamBClass}`}>
                      {stat.toUpperCase()}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
