import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required components from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function Graph({ width = '400px', height = '300px' }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Portfolio Analytics',
        data: [],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  });

  const updateChart = () => {
    setChartData((prevState) => {
      const newData = [...prevState.datasets[0].data, Math.random() * 100];
      const newLabels = [...prevState.labels, new Date().toLocaleTimeString()];

      return {
        ...prevState,
        labels: newLabels.slice(-10), // Keep only the last 10 labels
        datasets: [
          {
            ...prevState.datasets[0],
            data: newData.slice(-10), // Keep only the last 10 data points
          },
        ],
      };
    });
  };

  useEffect(() => {
    const interval = setInterval(updateChart, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="graph-container" style={{ width, height }}>
      <Line data={chartData} />
    </div>
  );
}

export default Graph;
