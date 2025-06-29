"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Engineering",
    Women: 28,
    "Underrepresented Minorities": 32,
    Veterans: 6,
    "LGBTQ+": 15,
    "People with Disabilities": 5,
  },
  {
    name: "Product",
    Women: 45,
    "Underrepresented Minorities": 36,
    Veterans: 4,
    "LGBTQ+": 18,
    "People with Disabilities": 7,
  },
  {
    name: "Design",
    Women: 52,
    "Underrepresented Minorities": 38,
    Veterans: 3,
    "LGBTQ+": 22,
    "People with Disabilities": 8,
  },
  {
    name: "Marketing",
    Women: 58,
    "Underrepresented Minorities": 42,
    Veterans: 5,
    "LGBTQ+": 20,
    "People with Disabilities": 6,
  },
  {
    name: "Sales",
    Women: 48,
    "Underrepresented Minorities": 40,
    Veterans: 12,
    "LGBTQ+": 14,
    "People with Disabilities": 5,
  },
  {
    name: "HR",
    Women: 72,
    "Underrepresented Minorities": 45,
    Veterans: 8,
    "LGBTQ+": 18,
    "People with Disabilities": 9,
  },
  {
    name: "Finance",
    Women: 52,
    "Underrepresented Minorities": 35,
    Veterans: 7,
    "LGBTQ+": 12,
    "People with Disabilities": 6,
  },
  {
    name: "Operations",
    Women: 46,
    "Underrepresented Minorities": 38,
    Veterans: 15,
    "LGBTQ+": 13,
    "People with Disabilities": 8,
  },
]

export function DiversityByDepartment() {
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
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis type="number" tick={{ fill: textColor }} />
        <YAxis dataKey="name" type="category" tick={{ fill: textColor }} width={100} />
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
