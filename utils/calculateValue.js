
// function to calculate player value
export function calculatePlayerValue(player) {
    const ppgValue = player.PTS;
    const apgValue = player.AST * 1.5;
    const rpgValue = player.TRB * 1.5;
    const bpgValue = player.BLK * 2;
    const spgValue = player.STL * 2;

    return ppgValue + apgValue + rpgValue + bpgValue + spgValue;
}