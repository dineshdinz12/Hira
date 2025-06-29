"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LucideBriefcase, LucideCalendar, LucideCheck, LucideUser } from "lucide-react"

export function RecruiterActivity() {
  const activities = [
    {
      type: "interview_scheduled",
      candidate: "Alex Johnson",
      role: "Senior Frontend Developer",
      time: "2 hours ago",
      details: "Technical interview scheduled for tomorrow at 2:00 PM",
    },
    {
      type: "candidate_reviewed",
      candidate: "Jamie Smith",
      role: "Full-Stack Developer",
      time: "Yesterday",
      details: "Reviewed resume and coding assessment",
    },
    {
      type: "feedback_submitted",
      candidate: "Taylor Williams",
      role: "Backend Engineer",
      time: "2 days ago",
      details: "Submitted feedback for technical interview",
    },
    {
      type: "offer_extended",
      candidate: "Morgan Chen",
      role: "Senior Backend Engineer",
      time: "3 days ago",
      details: "Offer letter sent via email",
    },
    {
      type: "candidate_added",
      candidate: "Casey Martinez",
      role: "Data Engineer",
      time: "5 days ago",
      details: "Added to candidate pipeline",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your recruitment activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {activities.map((activity, index) => (
              <div key={index} className="relative pl-8 pb-8 border-l border-slate-200 dark:border-slate-800 last:pb-0">
                <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-purple-600"></div>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-medium">{activity.candidate}</h3>
                      <Badge variant="outline">{activity.role}</Badge>
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{activity.time}</div>
                  </div>
                  <Badge
                    className={
                      activity.type === "offer_extended"
                        ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                        : activity.type === "interview_scheduled"
                          ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }
                  >
                    {activity.type === "interview_scheduled"
                      ? "Interview Scheduled"
                      : activity.type === "candidate_reviewed"
                        ? "Candidate Reviewed"
                        : activity.type === "feedback_submitted"
                          ? "Feedback Submitted"
                          : activity.type === "offer_extended"
                            ? "Offer Extended"
                            : "Candidate Added"}
                  </Badge>
                </div>
                <div className="mt-2 text-slate-600 dark:text-slate-400">{activity.details}</div>
                <div className="mt-3 flex gap-2">
                  {activity.type === "interview_scheduled" && (
                    <Button size="sm" variant="outline" className="gap-1">
                      <LucideCalendar size={14} />
                      <span>View Schedule</span>
                    </Button>
                  )}
                  {activity.type === "offer_extended" && (
                    <Button size="sm" variant="outline" className="gap-1">
                      <LucideCheck size={14} />
                      <span>Check Status</span>
                    </Button>
                  )}
                  <Button size="sm" variant="outline" className="gap-1">
                    <LucideUser size={14} />
                    <span>View Profile</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Tasks</CardTitle>
          <CardDescription>Your scheduled recruitment tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg">
                  <LucideCalendar size={20} className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-medium">Technical Interview: Alex Johnson</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Tomorrow, 2:00 PM</div>
                </div>
              </div>
              <Button size="sm">Prepare</Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg">
                  <LucideBriefcase size={20} className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-medium">Review Applications: Frontend Developer</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">5 new applications</div>
                </div>
              </div>
              <Button size="sm">Review</Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg">
                  <LucideUser size={20} className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-medium">Follow-up: Morgan Chen</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Offer decision due in 2 days</div>
                </div>
              </div>
              <Button size="sm">Contact</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
