"use client";

import { DoughnutChartProps } from "@/types";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({ accounts }: DoughnutChartProps) {
  const accountNames = accounts.map((a) => a.name);
  const balances = accounts.map((a) => a.balance);
  const colors = accounts.map((a) => a.chartColor);
  

  const data = {
    labels: accountNames,
    datasets: [
      {
        label: "Banks",
        data: balances,
        backgroundColor: colors,
      },
    ],
  };

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
