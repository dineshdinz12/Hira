import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { LucideArrowRight } from "lucide-react"

export function ResumeScoreCard() {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Resume Score</CardTitle>
        <CardDescription>ATS compatibility analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">85</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">out of 100</div>
                </div>
              </div>
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="2"
                  className="dark:stroke-slate-700"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="2"
                  strokeDasharray="85, 100"
                  className="dark:stroke-purple-500"
                />
              </svg>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Keyword Optimization</span>
              <span className="font-medium">75%</span>
            </div>
            <Progress value={75} className="h-1.5" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Formatting</span>
              <span className="font-medium">90%</span>
            </div>
            <Progress value={90} className="h-1.5" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Content Quality</span>
              <span className="font-medium">85%</span>
            </div>
            <Progress value={85} className="h-1.5" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>ATS Compatibility</span>
              <span className="font-medium">95%</span>
            </div>
            <Progress value={95} className="h-1.5" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full gap-2">
          <span>Improve Score</span>
          <LucideArrowRight size={16} />
        </Button>
      </CardFooter>
    </Card>
  )
}
