


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
    const ppgValue = player.PTS; //points per game
    const apgValue = player.AST * 1.5; // assistes per game
    //const rpgValue = player.TRB * 1.5; // rebounds per game
    const bpgValue = player.BLK * 2; // blocks per game
    const spgValue = player.STL * 2; // steals per game
    const toValue = player.TOV * - 1; // turnovers per game
    //const tpValue = player.threePPercent * 10; // 3 point percentage
    //const fgValue = player.FGPercent * 10; // fg percentage
    const ftValue = player.FTPercent * 10 // ft percentage
    const efgValue = player.eFGPercent * 20; //effective fg
    const gpValue = player.G * 0.1; // games played
    const gsValue = player.GS * 0.2; // games started
    const orValue = player.ORB * 1.5; // offensive rebounds per game
    const drValue = player.DRB; // defensive rebounds per game
    const pfValue = player.PF * - 0.3; // personal fouls
    const mpValue = player.MP * 0.5; // minutes per game
    const ageValue = calculateAgeValue(player.Age); // age value

    const rpgValue = orValue + drValue;
    

    

    const totalValue = ppgValue + apgValue + /*rpgValue +*/ bpgValue + spgValue + toValue + /*tpValue + fgValue 
    +*/ gpValue + gsValue + rpgValue + pfValue + ftValue + efgValue + mpValue + ageValue;
    return {
        totalValue: parseFloat(totalValue.toFixed(2)),
        ppgValue,
        apgValue,
        bpgValue,
        spgValue,
        toValue,
        ftValue,
        efgValue,
        gpValue,
        gsValue,
        orValue,
        drValue,
        pfValue,
        mpValue,
        ageValue,
        rpgValue

    };
    
}