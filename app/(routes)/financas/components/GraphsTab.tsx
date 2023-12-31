"use client";

import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(Tooltip, Legend, ArcElement);

interface GraphsTabProps {}

const data = {
  backgroundColor: [
    "rgb(2, 88, 255)",
    "rgb(249, 151, 0)",
    "rgb(255, 199, 0)",
    "rgb(32, 214, 152)",
  ],
  labels: ["Event 1", "Event 2", "Event 3", "Event 4"],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100, 300],
      backgroundColor: [
        "rgb(2, 88, 255)",
        "rgb(249, 151, 0)",
        "rgb(255, 199, 0)",
        "rgb(32, 214, 152)",
      ],
      hoverOffset: 4,
    },
  ],
};
const options = {
  maintainAspectRatio: false,
  aspectRatio: 1,
};

const GraphsTab = ({}: GraphsTabProps) => {
  return (
    <div className="flex justify-around">
      <div className="w-96">
        <Doughnut data={data} />
      </div>
      <div className="w-96">
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default GraphsTab;
