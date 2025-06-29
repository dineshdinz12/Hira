"use client"

import { useTheme } from "next-themes"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { year: "2020", salary: 95000 },
  { year: "2021", salary: 105000 },
  { year: "2022", salary: 112000 },
  { year: "2023", salary: 118000 },
  { year: "2024", salary: 125000 },
  { year: "2025", salary: 135000, projected: true },
]

export function SalaryChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#e2e8f0"} />
        <XAxis dataKey="year" stroke={isDark ? "#94a3b8" : "#64748b"} tick={{ fill: isDark ? "#94a3b8" : "#64748b" }} />
        <YAxis
          stroke={isDark ? "#94a3b8" : "#64748b"}
          tick={{ fill: isDark ? "#94a3b8" : "#64748b" }}
          tickFormatter={(value) => `$${value / 1000}k`}
        />
        <Tooltip
          formatter={(value) => [`$${value.toLocaleString()}`, "Salary"]}
          contentStyle={{
            backgroundColor: isDark ? "#1e293b" : "#ffffff",
            borderColor: isDark ? "#334155" : "#e2e8f0",
            color: isDark ? "#e2e8f0" : "#1e293b",
          }}
        />
        <Legend />
        <Bar dataKey="salary" name="Average Salary" fill="#9333ea" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
      </BarChart>
    </ResponsiveContainer>
  )
}
