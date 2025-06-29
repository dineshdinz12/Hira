export const Chart = ({ children, className, ...props }) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export const ChartContainer = ({ children, data, className, ...props }) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export const ChartTooltip = ({ children, ...props }) => {
  return <div {...props}>{children}</div>
}

export const ChartTooltipContent = ({ children, ...props }) => {
  return <div {...props}>{children}</div>
}

export const ChartLegend = ({ children, ...props }) => {
  return <div {...props}>{children}</div>
}

export const Bar = () => null
export const BarChart = () => null
export const XAxis = () => null
export const YAxis = () => null
export const Pie = () => null
export const PieChart = () => null
export const Line = () => null
export const LineChart = () => null
export const LinearGradient = () => null
export const PolarAngleAxis = () => null
export const Radar = () => null
export const RadarChart = () => null
