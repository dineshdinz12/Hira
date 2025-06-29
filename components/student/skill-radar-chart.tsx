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
    score: 85,
    fullMark: 100,
  },
  {
    subject: "Node.js",
    score: 70,
    fullMark: 100,
  },
  {
    subject: "CSS",
    score: 75,
    fullMark: 100,
  },
  {
    subject: "Database",
    score: 65,
    fullMark: 100,
  },
  {
    subject: "Testing",
    score: 60,
    fullMark: 100,
  },
  {
    subject: "DevOps",
    score: 50,
    fullMark: 100,
  },
]

export function SkillRadarChart() {
  return (
    <ChartContainer className="h-full w-full" data={data}>
      <Chart className="h-full">
        <RadarChart>
          <PolarAngleAxis dataKey="subject" />
          <Radar name="Your Skills" dataKey="score" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.3} />
        </RadarChart>
        <ChartTooltip>
          <ChartTooltipContent />
        </ChartTooltip>
        <ChartLegend />
      </Chart>
    </ChartContainer>
  )
}
