import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

export default function SpiderMini({ data }) {
  const chartData = [
    { metric: "Execution", value: data.execution },
    { metric: "Ramp", value: data.ramp },
    { metric: "Attention", value: data.attentionCost },
    { metric: "Network", value: data.network }
  ];

  return (
    <div className="mini-chart">
      <RadarChart
        cx={100}
        cy={100}
        outerRadius={60}
        width={200}
        height={200}
        data={chartData}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="metric" tick={{ fill: "#ccc", fontSize: 10 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
        <Radar
          name={data.name}
          dataKey="value"
          stroke="#3ddc84"
          fill="#3ddc84"
          fillOpacity={0.3}
        />
      </RadarChart>
    </div>
  );
}
