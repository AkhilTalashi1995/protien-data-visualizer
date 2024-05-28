import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchProteins } from '../api';
import { Chart, registerables } from 'chart.js';

// Register all components
Chart.register(...registerables);

interface Protein {
  entry: string;
  length: number;
  // add other properties if needed
}

interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string;
}

interface ChartConfig {
  labels: string[];
  datasets: ChartDataset[];
}


const DataVisualization: React.FC = () => {
  const [chartData, setChartData] = useState<ChartConfig | null>(null);

  const getData = async (): Promise<Protein[]> => {
    const response = await fetchProteins();
    return response;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();

      const labels = data.map((protein: Protein) => protein.entry);
      const lengths = data.map((protein: Protein) => protein.length);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Protein Length',
            data: lengths,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      });
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Protein Lengths</h2>
      {chartData && (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                type: 'linear',
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default DataVisualization;
