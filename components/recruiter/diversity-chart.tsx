"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const genderData = [
  { name: "Women", value: 42, color: "#9333ea" },
  { name: "Men", value: 56, color: "#6366f1" },
  { name: "Non-binary", value: 2, color: "#10b981" },
]

const ethnicityData = [
  { name: "White", value: 62, color: "#6366f1" },
  { name: "Asian", value: 18, color: "#9333ea" },
  { name: "Hispanic/Latino", value: 10, color: "#10b981" },
  { name: "Black", value: 7, color: "#0ea5e9" },
  { name: "Other", value: 3, color: "#f59e0b" },
]

export function DiversityChart() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [chartData, setChartData] = useState("gender")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"
  const textColor = isDark ? "#94a3b8" : "#64748b"

  const data = chartData === "gender" ? genderData : ethnicityData

  return (
    <div className="h-full">
      <div className="flex justify-center mb-4">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              chartData === "gender"
                ? "bg-purple-600 text-white"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            }`}
            onClick={() => setChartData("gender")}
          >
            Gender
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              chartData === "ethnicity"
                ? "bg-purple-600 text-white"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            }`}
            onClick={() => setChartData("ethnicity")}
          >
            Ethnicity
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#1e293b" : "#ffffff",
              borderColor: isDark ? "#334155" : "#e2e8f0",
              color: isDark ? "#f8fafc" : "#0f172a",
            }}
            formatter={(value) => [`${value}%`, ""]}
          />
          <Legend wrapperStyle={{ color: textColor }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
