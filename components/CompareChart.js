import React, { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";

const CompareChart = ({ chartData, category, statsFilter }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.data = chartData;
      chartInstanceRef.current.options.scales.y.title.text = category;
      chartInstanceRef.current.update();
    } else if (chartRef.current) {
      chartInstanceRef.current = new Chart(chartRef.current, {
        type: "line",
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              labels: {
                color: "white", // Legend text color
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Age",
                font: {
                  size: 40,
                  weight: "bold",
                  lineHeight: 1,
                },
                color: "white",
              },
              ticks: {
                font: {
                  size: 20,
                  weight: "semibold",
                },
                color: "white",
              },
              grid: {
                color: "rgba(255, 255, 255, 0.2)", // Grid line color
              },
            },
            y: {
              title: {
                display: true,
                text: category,
                font: {
                  size: 40,
                  weight: "bold",
                  lineHeight: 2,
                },
                color: "white",
              },
              ticks: {
                font: {
                  size: 20,
                },
                color: "white",
              },
              grid: {
                color: "rgba(255, 255, 255, 0.2)", // Grid line color
              },
            },
          },
          elements: {
            line: {
              borderWidth: 8,
              borderCapStyle: "round",

            },
          },
        },
      });
    }
  }, [chartData, category]);

  return (
    <div className="">
      <select
        id="statHeader"
        value={category}
        onChange={statsFilter}
        className="w-30 h-10 text-lg font-semibold bg-red-200 hover:bg-red-300 p-1 rounded-md ml-2 mb-2"
      >
        <option value="TotalValue">Total Value</option>
        <option value="Points">Points</option>
        <option value="Assists">Assists</option>
        <option value="Rebounds">Rebounds</option>
        <option value="Blocks">Blocks</option>
        <option value="Steals">Steals</option>
        <option value="Turnovers">Turnovers</option>
        <option value="FTPercent">Free Throw %</option>
        <option value="eFGPercent">Effective FG %</option>
        <option value="Games">Games</option>
        <option value="GamesStarted">Games Started</option>
        <option value="PersonalFouls">Personal Fouls</option>
        <option value="Minutes">Minutes</option>
      </select>

      <canvas ref={chartRef} className="max-h-6/12 mr-5"></canvas>
    </div>
  );
};

export default CompareChart;
