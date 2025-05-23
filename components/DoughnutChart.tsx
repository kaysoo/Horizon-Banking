"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  datasets: [
    {
      label: "Banks",
      data: [1254, 3400, 3329],
      backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"],
    },
  ],
  labels: ["Bank 1", "Bank 2", "Bank 3"],
};

export default function DoughnutChart({ accounts }: DoughnutChartProps) {
  return (
    <Doughnut
      data={data}
      options={{
        cutout: "60%",
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
}
