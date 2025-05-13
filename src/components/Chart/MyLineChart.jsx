import { Line } from "react-chartjs-2";

export default function SimpleLineChart() {
  const data = {
    labels: ["", "", "", "", "", "", "", "", ""],
    datasets: [
      {
        label: "",
        data: [25, 22, 24, 23, 29, 50, 30, 25, 23],
        fill: false,
        borderColor: "rgb(20, 134, 43)",
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  return <Line data={data} options={options} />;
}
