import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DoubleBarChart() {
  const data = {
    labels: [
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
      "Dimanche",
    ],
    datasets: [
      {
        data: [40, 30, 45, 40, 70, 25, 65],
        backgroundColor: "rgb(19, 78, 74)",
        barThickness: 10,
        borderRadius: 10,
      },
      {
        data: [60, 70, 35, 80, 30, 75, 35],
        backgroundColor: "rgba(239, 68, 68)",
        barThickness: 10,
        borderRadius: 10,
      },
    ],
  };

  const uniqueKey = JSON.stringify(data);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },

    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Bar key={uniqueKey} data={data} options={options} />;
}
