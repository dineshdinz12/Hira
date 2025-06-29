"use client"

import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Bar,
  BarChart,
  XAxis,
  YAxis,
} from "@/components/ui/chart"

const data = [
  {
    name: "Resume",
    passed: 85,
    failed: 15,
  },
  {
    name: "Screening",
    passed: 65,
    failed: 35,
  },
  {
    name: "Technical",
    passed: 45,
    failed: 55,
  },
  {
    name: "Culture",
    passed: 35,
    failed: 65,
  },
  {
    name: "Final",
    passed: 25,
    failed: 75,
  },
]

export function CandidateMetrics() {
  return (
    <ChartContainer className="h-full w-full" data={data}>
      <Chart className="h-full">
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <Bar dataKey="passed" stackId="a" fill="#7c3aed" />
          <Bar dataKey="failed" stackId="a" fill="#e5e7eb" />
        </BarChart>
        <ChartTooltip>
          <ChartTooltipContent />
        </ChartTooltip>
      </Chart>
    </ChartContainer>
  )
}
