import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const CompareChart = ({ chartData }) => {
  return (
    <div>
      {chartData ? (
        <Line 
          data={chartData} 
          options={{
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Age'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Points'
                }
              }
            }
          }} 
        />
      ) : (
        <p>select two players to compare</p>
      )}
    </div>
  );
};

export default CompareChart;