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
export function calculatePlayerValue(player, weights = {}) {
  const defaultWeights = {
    ppg: 1,
    apg: 1.5,
    bpg: 2,
    spg: 2,
    to: -1,
    ft: 10,
    efg: 20,
    gp: 0.1,
    gs: 0.2,
    or: 1.5,
    dr: 1,
    pf: -0.3,
    mp: 0.5,
    age: 0,
  };
  const newWeights = { ...defaultWeights, ...weights };

  const ppgValue = (Number(player.PTS) || 0) * newWeights.ppg;
  const apgValue = (Number(player.AST) || 0) * newWeights.apg;
  const bpgValue = (Number(player.BLK) || 0) * newWeights.bpg;
  const spgValue = (Number(player.STL) || 0) * newWeights.spg;
  const toValue = (Number(player.TOV) || 0) * newWeights.to;
  const ftValue = (Number(player.FTPercent) || 0) * newWeights.ft;
  const efgValue = (Number(player.eFGPercent) || 0) * newWeights.efg;
  const gpValue = (Number(player.G) || 0) * newWeights.gp;
  const gsValue = (Number(player.GS) || 0) * newWeights.gs;
  const orValue = (Number(player.ORB) || 0) * newWeights.or;
  const drValue = (Number(player.DRB) || 0) * newWeights.dr;
  const pfValue = (Number(player.PF) || 0) * newWeights.pf;
  const mpValue = (Number(player.MP) || 0) * newWeights.mp;
  const ageValue = calculateAgeValue(Number(player.Age) || 0) * newWeights.age;

  const rpgValue = orValue + drValue;

  const totalValue =
    ppgValue +
    apgValue +
    bpgValue +
    spgValue +
    toValue +
    gpValue +
    gsValue +
    rpgValue +
    pfValue +
    ftValue +
    efgValue +
    mpValue +
    ageValue;

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
    ageValue: parseFloat(ageValue.toFixed(2)),
    rpgValue: parseFloat(rpgValue.toFixed(2)),
  };
}

export default calculatePlayerValue;
