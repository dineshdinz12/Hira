"use client"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Line,
  LineChart,
  LinearGradient,
} from "@/components/ui/chart"

const data = [
  { date: "Jan", you: 30, peers: 20 },
  { date: "Feb", you: 45, peers: 25 },
  { date: "Mar", you: 55, peers: 35 },
  { date: "Apr", you: 60, peers: 40 },
  { date: "May", you: 68, peers: 45 },
  { date: "Jun", you: 75, peers: 50 },
  { date: "Jul", you: 82, peers: 55 },
]

export function PerformanceChart() {
  return (
    <ChartContainer className="h-full w-full" data={data}>
      <Chart className="h-full">
        <LinearGradient id="gradient-1" from="rgba(124, 58, 237, 0.5)" to="rgba(124, 58, 237, 0)" />
        <LinearGradient id="gradient-2" from="rgba(99, 102, 241, 0.3)" to="rgba(99, 102, 241, 0)" />
        <LineChart>
          <Line name="You" dataKey="you" stroke="#7c3aed" strokeWidth={2} fill="url(#gradient-1)" />
          <Line name="Peers" dataKey="peers" stroke="#6366f1" strokeWidth={2} fill="url(#gradient-2)" />
        </LineChart>
        <ChartTooltip>
          <ChartTooltipContent />
        </ChartTooltip>
      </Chart>
    </ChartContainer>
  )
}
