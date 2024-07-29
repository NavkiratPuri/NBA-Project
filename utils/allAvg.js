// utils/allAvg.js
import { calculatePlayerValue } from "@/utils/calculateValue";

export const allAvgStats = (data) => {
  const ageStats = {};

  data.forEach((player) => {
    const {
      Age,
      PTS,
      AST,
      BLK,
      STL,
      TOV,
      FTPercent,
      eFGPercent,
      G,
      GS,
      ORB,
      DRB,
      PF,
      MP,
    } = player;

    const totalValue = calculatePlayerValue(player).totalValue;

    if (!ageStats[Age]) {
      ageStats[Age] = {
        Points: 0,
        Assists: 0,
        Blocks: 0,
        Steals: 0,
        Turnovers: 0,
        FTPercent: 0,
        eFGPercent: 0,
        Games: 0,
        GamesStarted: 0,
        Rebounds: 0,
        PersonalFouls: 0,
        Minutes: 0,
        TotalValue: 0,
        count: 0,
      };
    }

    ageStats[Age].Points += parseFloat(PTS) || 0;
    ageStats[Age].Assists += parseFloat(AST) || 0;
    ageStats[Age].Blocks += parseFloat(BLK) || 0;
    ageStats[Age].Steals += parseFloat(STL) || 0;
    ageStats[Age].Turnovers += parseFloat(TOV) || 0;
    ageStats[Age].FTPercent += parseFloat(FTPercent) || 0;
    ageStats[Age].eFGPercent += parseFloat(eFGPercent) || 0;
    ageStats[Age].Games += parseFloat(G) || 0;
    ageStats[Age].GamesStarted += parseFloat(GS) || 0;
    ageStats[Age].Rebounds += (parseFloat(ORB) || 0) + (parseFloat(DRB) || 0);
    ageStats[Age].PersonalFouls += parseFloat(PF) || 0;
    ageStats[Age].Minutes += parseFloat(MP) || 0;
    ageStats[Age].TotalValue += totalValue;
    ageStats[Age].count += 1;
  });

  const averages = {
    ages: [],
    Points: [],
    Assists: [],
    Blocks: [],
    Steals: [],
    Turnovers: [],
    FTPercent: [],
    eFGPercent: [],
    Games: [],
    GamesStarted: [],
    Rebounds: [],
    PersonalFouls: [],
    Minutes: [],
    TotalValue: [],
  };

  Object.keys(ageStats)
    .sort((a, b) => a - b)
    .forEach((age) => {
      averages.ages.push(age);
      averages.Points.push(ageStats[age].Points / ageStats[age].count);
      averages.Assists.push(ageStats[age].Assists / ageStats[age].count);
      averages.Blocks.push(ageStats[age].Blocks / ageStats[age].count);
      averages.Steals.push(ageStats[age].Steals / ageStats[age].count);
      averages.Turnovers.push(ageStats[age].Turnovers / ageStats[age].count);
      averages.FTPercent.push(ageStats[age].FTPercent / ageStats[age].count);
      averages.eFGPercent.push(ageStats[age].eFGPercent / ageStats[age].count);
      averages.Games.push(ageStats[age].Games / ageStats[age].count);
      averages.GamesStarted.push(
        ageStats[age].GamesStarted / ageStats[age].count
      );
      averages.Rebounds.push(ageStats[age].Rebounds / ageStats[age].count);
      averages.PersonalFouls.push(
        ageStats[age].PersonalFouls / ageStats[age].count
      );
      averages.Minutes.push(ageStats[age].Minutes / ageStats[age].count);
      averages.TotalValue.push(ageStats[age].TotalValue / ageStats[age].count);
    });

  return averages;
};
