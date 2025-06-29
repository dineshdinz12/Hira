"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useTheme } from "next-themes"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const timeToHireData = [
  { month: "Jan", days: 22 },
  { month: "Feb", days: 21 },
  { month: "Mar", days: 20 },
  { month: "Apr", days: 19 },
  { month: "May", days: 18 },
]

const sourceData = [
  { source: "Referrals", candidates: 35 },
  { source: "Job Boards", candidates: 25 },
  { source: "LinkedIn", candidates: 20 },
  { source: "University", candidates: 12 },
  { source: "Events", candidates: 8 },
]

export function RecruiterStats() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recruitment Performance</CardTitle>
          <CardDescription>Key metrics for your recruitment activities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Time-to-Hire</span>
              <span className="text-sm font-medium">18 days (15% improvement)</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Offer Acceptance Rate</span>
              <span className="text-sm font-medium">78%</span>
            </div>
            <Progress value={78} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Candidate Satisfaction</span>
              <span className="text-sm font-medium">92%</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Diversity Hiring</span>
              <span className="text-sm font-medium">65% (Target: 70%)</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Time-to-Hire Trend</CardTitle>
            <CardDescription>Average days to fill positions</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeToHireData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#e2e8f0"} />
                <XAxis
                  dataKey="month"
                  stroke={isDark ? "#94a3b8" : "#64748b"}
                  tick={{ fill: isDark ? "#94a3b8" : "#64748b" }}
                />
                <YAxis stroke={isDark ? "#94a3b8" : "#64748b"} tick={{ fill: isDark ? "#94a3b8" : "#64748b" }} />
                <Tooltip
                  formatter={(value) => [`${value} days`, "Time to Hire"]}
                  contentStyle={{
                    backgroundColor: isDark ? "#1e293b" : "#ffffff",
                    borderColor: isDark ? "#334155" : "#e2e8f0",
                    color: isDark ? "#e2e8f0" : "#1e293b",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="days"
                  name="Days to Hire"
                  stroke="#9333ea"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#9333ea" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Candidate Sources</CardTitle>
            <CardDescription>Where your candidates come from</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceData} layout="vertical" margin={{ top: 20, right: 30, left: 60, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#e2e8f0"} />
                <XAxis
                  type="number"
                  stroke={isDark ? "#94a3b8" : "#64748b"}
                  tick={{ fill: isDark ? "#94a3b8" : "#64748b" }}
                />
                <YAxis
                  dataKey="source"
                  type="category"
                  stroke={isDark ? "#94a3b8" : "#64748b"}
                  tick={{ fill: isDark ? "#94a3b8" : "#64748b" }}
                />
                <Tooltip
                  formatter={(value) => [`${value} candidates`, "Count"]}
                  contentStyle={{
                    backgroundColor: isDark ? "#1e293b" : "#ffffff",
                    borderColor: isDark ? "#334155" : "#e2e8f0",
                    color: isDark ? "#e2e8f0" : "#1e293b",
                  }}
                />
                <Legend />
                <Bar dataKey="candidates" name="Candidates" fill="#9333ea" radius={[0, 4, 4, 0]} fillOpacity={0.8} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
