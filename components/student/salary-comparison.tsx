"use client"

import { useTheme } from "next-themes"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { skill: "Base", premium: 0, salary: 125000 },
  { skill: "React", premium: 10000, salary: 135000 },
  { skill: "TypeScript", premium: 8000, salary: 133000 },
  { skill: "Node.js", premium: 7000, salary: 132000 },
  { skill: "AWS", premium: 15000, salary: 140000 },
  { skill: "GraphQL", premium: 12000, salary: 137000 },
]

export function SalaryComparison() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 60, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#e2e8f0"} />
        <XAxis
          type="number"
          stroke={isDark ? "#94a3b8" : "#64748b"}
          tick={{ fill: isDark ? "#94a3b8" : "#64748b" }}
          tickFormatter={(value) => `$${value / 1000}k`}
        />
        <YAxis
          dataKey="skill"
          type="category"
          stroke={isDark ? "#94a3b8" : "#64748b"}
          tick={{ fill: isDark ? "#94a3b8" : "#64748b" }}
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
        <Bar dataKey="salary" name="Salary with Skill" fill="#9333ea" radius={[0, 4, 4, 0]} fillOpacity={0.8} />
      </BarChart>
    </ResponsiveContainer>
  )
}
