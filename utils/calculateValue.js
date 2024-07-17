function calculateAgeValue(age) {
    if (age < 27) {
        return (27 - age) * 1.5; 
    } else if (age <= 31) {
        return 10; 
    } else {
        return (31 - age) * 0.5; 
    }
}

// function to calculate player value
// assigns a value to each category 
// add all the categories to return a total value
export function calculatePlayerValue(player) {
    const ppgValue = Number(player.PTS) || 0; // points per game
    const apgValue = (Number(player.AST) || 0) * 1.5; // assists per game
    //const rpgValue = (Number(player.TRB) || 0) * 1.5; // rebounds per game
    const bpgValue = (Number(player.BLK) || 0) * 2; // blocks per game
    const spgValue = (Number(player.STL) || 0) * 2; // steals per game
    const toValue = (Number(player.TOV) || 0) * -1; // turnovers per game
    //const tpValue = (Number(player.threePPercent) || 0) * 10; // 3 point percentage
    //const fgValue = (Number(player.FGPercent) || 0) * 10; // fg percentage
    const ftValue = (Number(player.FTPercent) || 0) * 10; // ft percentage
    const efgValue = (Number(player.eFGPercent) || 0) * 20; // effective fg
    const gpValue = (Number(player.G) || 0) * 0.1; // games played
    const gsValue = (Number(player.GS) || 0) * 0.2; // games started
    const orValue = (Number(player.ORB) || 0) * 1.5; // offensive rebounds per game
    const drValue = Number(player.DRB) || 0; // defensive rebounds per game
    const pfValue = (Number(player.PF) || 0) * -0.3; // personal fouls
    const mpValue = (Number(player.MP) || 0) * 0.5; // minutes per game
    const ageValue = calculateAgeValue(Number(player.Age) || 0); // age value

    const rpgValue = orValue + drValue;

    const totalValue = ppgValue + apgValue + bpgValue + spgValue + toValue + gpValue + gsValue + rpgValue + pfValue + ftValue + efgValue + mpValue ;


    return {
        totalValue: parseFloat(totalValue.toFixed(2)),
        ppgValue: parseFloat(ppgValue.toFixed(2)),
        apgValue: parseFloat(apgValue.toFixed(2)),
        bpgValue: parseFloat(bpgValue.toFixed(2)),
        spgValue: parseFloat(spgValue.toFixed(2)),
        toValue: parseFloat(toValue.toFixed(2)),
        ftValue: parseFloat(ftValue.toFixed(2)),
        efgValue: parseFloat(efgValue.toFixed(2)),
        gpValue: parseFloat(gpValue.toFixed(2)),
        gsValue: parseFloat(gsValue.toFixed(2)),
        orValue: parseFloat(orValue.toFixed(2)),
        drValue: parseFloat(drValue.toFixed(2)),
        pfValue: parseFloat(pfValue.toFixed(2)),
        mpValue: parseFloat(mpValue.toFixed(2)),
        // ageValue: parseFloat(ageValue.toFixed(2)),
        rpgValue: parseFloat(rpgValue.toFixed(2))
    };
}