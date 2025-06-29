"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Q1 2024",
    Women: 32,
    "Underrepresented Minorities": 28,
    Veterans: 5,
    "LGBTQ+": 12,
    "People with Disabilities": 4,
  },
  {
    name: "Q2 2024",
    Women: 34,
    "Underrepresented Minorities": 29,
    Veterans: 6,
    "LGBTQ+": 13,
    "People with Disabilities": 4,
  },
  {
    name: "Q3 2024",
    Women: 36,
    "Underrepresented Minorities": 31,
    Veterans: 6,
    "LGBTQ+": 14,
    "People with Disabilities": 5,
  },
  {
    name: "Q4 2024",
    Women: 38,
    "Underrepresented Minorities": 33,
    Veterans: 7,
    "LGBTQ+": 15,
    "People with Disabilities": 6,
  },
  {
    name: "Q1 2025",
    Women: 40,
    "Underrepresented Minorities": 35,
    Veterans: 7,
    "LGBTQ+": 16,
    "People with Disabilities": 6,
  },
  {
    name: "Q2 2025",
    Women: 42,
    "Underrepresented Minorities": 38,
    Veterans: 8,
    "LGBTQ+": 17,
    "People with Disabilities": 7,
  },
]

export function DiversityTrends() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"
  const textColor = isDark ? "#94a3b8" : "#64748b"
  const gridColor = isDark ? "#334155" : "#e2e8f0"

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis dataKey="name" tick={{ fill: textColor }} />
        <YAxis tick={{ fill: textColor }} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1e293b" : "#ffffff",
            borderColor: isDark ? "#334155" : "#e2e8f0",
            color: isDark ? "#f8fafc" : "#0f172a",
          }}
        />
        <Legend wrapperStyle={{ color: textColor }} />
        <Bar dataKey="Women" fill="#9333ea" />
        <Bar dataKey="Underrepresented Minorities" fill="#6366f1" />
        <Bar dataKey="Veterans" fill="#0ea5e9" />
        <Bar dataKey="LGBTQ+" fill="#10b981" />
        <Bar dataKey="People with Disabilities" fill="#f59e0b" />
      </BarChart>
    </ResponsiveContainer>
  )
}
