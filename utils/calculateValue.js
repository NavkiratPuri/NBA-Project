
// function to calculate player value
// assigns a value to each category 
// add all the categories to return a total value
export function calculatePlayerValue(player) {
    const ppgValue = player.PTS;
    const apgValue = player.AST * 1.5;
    const rpgValue = player.TRB * 1.5;
    const bpgValue = player.BLK * 2;
    const spgValue = player.STL * 2;

    const totalValue = ppgValue + apgValue + rpgValue + bpgValue + spgValue;
    return parseFloat(totalValue.toFixed(2));
}