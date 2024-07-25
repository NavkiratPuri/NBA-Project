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
          plugins: {},
          scales: {
            x: {
              title: {
                display: true,
                text: "Age",
                font: {
                  size: 40, // Customize the font size for x-axis title
                  weight: "bold",
                  lineHeight: 1,
                },
              },
              ticks: {
                font: {
                  size: 20, // Customize the font size for x-axis labels
                  weight: "semibold",
                },
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
              },
              ticks: {
                font: {
                  size: 20,
                },
              },
            },
          },
          elements: {
            line: {
              borderWidth: 8, // Customize the line thickness
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
        className="w-30 h-10 text-xl font-semibold bg-red-200 p-1 rounded-md ml-2 mb-2"
      >
        <option value="Total Value">Total Value</option>
        <option value="Points">Points</option>
        <option value="Assists">Assists</option>
        <option value="Steals">Steals</option>
        <option value="Rebounds">Rebounds</option>
        <option value="Turnovers">Turnovers</option>
        <option value="Games">Games</option>
        <option value="Minutes">Minutes</option>
      </select>

      <canvas ref={chartRef} className=" max-h-6/12 mr-5"></canvas>
    </div>
  );
};

export default CompareChart;
