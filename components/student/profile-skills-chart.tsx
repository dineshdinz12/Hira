"use client"

import {
  Chart,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
  PolarAngleAxis,
  Radar,
  RadarChart,
} from "@/components/ui/chart"

const data = [
  {
    subject: "React",
    score: 90,
    fullMark: 100,
  },
  {
    subject: "Node.js",
    score: 85,
    fullMark: 100,
  },
  {
    subject: "TypeScript",
    score: 75,
    fullMark: 100,
  },
  {
    subject: "MongoDB",
    score: 70,
    fullMark: 100,
  },
  {
    subject: "GraphQL",
    score: 65,
    fullMark: 100,
  },
  {
    subject: "Docker",
    score: 40,
    fullMark: 100,
  },
]

export function ProfileSkillsChart() {
  return (
    <ChartContainer className="h-full w-full" data={data}>
      <Chart className="h-full">
        <RadarChart>
          <PolarAngleAxis dataKey="subject" />
          <Radar name="Skills" dataKey="score" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.3} />
        </RadarChart>
        <ChartTooltip>
          <ChartTooltipContent />
        </ChartTooltip>
        <ChartLegend />
      </Chart>
    </ChartContainer>
  )
}
