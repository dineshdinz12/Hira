import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideAward, LucideBookOpen, LucideCode, LucideFileText, LucideVideo } from "lucide-react"

export function ProfileActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your learning and application activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="relative pl-8 pb-8 border-l border-slate-200 dark:border-slate-800">
            <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-purple-600"></div>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg">
                  <LucideAward size={16} className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-medium">Earned React Developer Certificate</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Completed certification with a score of 91%
                  </p>
                </div>
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">2 days ago</div>
            </div>
          </div>

          <div className="relative pl-8 pb-8 border-l border-slate-200 dark:border-slate-800">
            <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-purple-600"></div>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg">
                  <LucideCode size={16} className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-medium">Completed Coding Challenge</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Solved "Array Manipulation" challenge</p>
                </div>
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">3 days ago</div>
            </div>
          </div>

          <div className="relative pl-8 pb-8 border-l border-slate-200 dark:border-slate-800">
            <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-purple-600"></div>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg">
                  <LucideFileText size={16} className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-medium">Updated Resume</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Added new skills and work experience</p>
                </div>
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">5 days ago</div>
            </div>
          </div>

          <div className="relative pl-8 pb-8 border-l border-slate-200 dark:border-slate-800">
            <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-purple-600"></div>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg">
                  <LucideVideo size={16} className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-medium">Completed Mock Interview</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Frontend Developer interview practice</p>
                </div>
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">1 week ago</div>
            </div>
          </div>

          <div className="relative pl-8">
            <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-purple-600"></div>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg">
                  <LucideBookOpen size={16} className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-medium">Started Advanced React Course</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Enrolled in "Advanced React Patterns"</p>
                </div>
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">1 week ago</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
