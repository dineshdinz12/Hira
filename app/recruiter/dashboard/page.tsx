import { RecruiterSidebar } from "@/components/recruiter/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  LucideArrowRight,
  LucideCalendar,
  LucideCheck,
  LucideClipboardCheck,
  LucideCode,
  LucideFileText,
  LucideInfo,
  LucidePlus,
  LucideUser,
  LucideUsers,
} from "lucide-react"
import { DiversityChart } from "@/components/recruiter/diversity-chart"
import { CandidateMetrics } from "@/components/recruiter/candidate-metrics"

export default function RecruiterDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <RecruiterSidebar />

      <main className="md:pl-64 pt-16 md:pt-0">
        <div className="container mx-auto p-6">
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back, Taylor</h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Track your recruitment metrics and candidate pipeline
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2">
                  <LucideCalendar size={16} />
                  <span>May 3, 2025</span>
                </Button>
                <Button className="gap-2">
                  <LucidePlus size={16} />
                  <span>New Evaluation</span>
                </Button>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Active Candidates</CardTitle>
                <CardDescription>Current pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">42</div>
                <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                  <LucideArrowRight size={14} className="rotate-45" />
                  <span>12% increase</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Pending Evaluations</CardTitle>
                <CardDescription>Awaiting review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">16</div>
                <div className="flex items-center gap-1 text-sm text-amber-600 dark:text-amber-400">
                  <LucideInfo size={14} />
                  <span>5 high priority</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Interviews Scheduled</CardTitle>
                <CardDescription>Next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">8</div>
                <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                  <LucideCalendar size={14} />
                  <span>3 tomorrow</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Time-to-Hire</CardTitle>
                <CardDescription>Average days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">18</div>
                <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                  <LucideArrowRight size={14} className="rotate-315" />
                  <span>3 days faster</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Diversity Analytics</CardTitle>
                <CardDescription>Team composition and hiring trends</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <DiversityChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Candidate Metrics</CardTitle>
                <CardDescription>Performance across evaluation stages</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <CandidateMetrics />
              </CardContent>
            </Card>
          </div>

          <div className="mb-8">
            <Tabs defaultValue="candidates">
              <TabsList className="mb-4">
                <TabsTrigger value="candidates">Recent Candidates</TabsTrigger>
                <TabsTrigger value="evaluations">Pending Evaluations</TabsTrigger>
                <TabsTrigger value="bias">Bias Alerts</TabsTrigger>
              </TabsList>

              <TabsContent value="candidates">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Candidates</CardTitle>
                    <CardDescription>Latest additions to your pipeline</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800"
                        >
                          <div className="flex items-center gap-3">
                            <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-full">
                              <LucideUser size={20} className="text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <div className="font-medium">Alex Johnson</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                Senior Frontend Developer
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              variant="outline"
                              className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                            >
                              Technical Interview
                            </Badge>
                            <Button variant="ghost" size="icon">
                              <LucideArrowRight size={16} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Candidates
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="evaluations">
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Evaluations</CardTitle>
                    <CardDescription>Candidates awaiting your review</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800"
                        >
                          <div className="flex items-center gap-3">
                            <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-full">
                              <LucideClipboardCheck size={20} className="text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <div className="font-medium">React Coding Challenge</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                Jamie Smith • Completed 2 hours ago
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={i === 1 ? "default" : "outline"}
                              className={
                                i === 1
                                  ? ""
                                  : "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                              }
                            >
                              {i === 1 ? "High Priority" : "Medium Priority"}
                            </Badge>
                            <Button variant="ghost" size="icon">
                              <LucideArrowRight size={16} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Evaluations
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="bias">
                <Card>
                  <CardHeader>
                    <CardTitle>Bias Audit Alerts</CardTitle>
                    <CardDescription>Potential biases detected in evaluations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Alert className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 mb-4">
                      <LucideInfo className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      <AlertTitle className="text-amber-800 dark:text-amber-300">
                        Scoring Discrepancy Detected
                      </AlertTitle>
                      <AlertDescription className="text-amber-700 dark:text-amber-400">
                        Female candidates are receiving 15% lower scores on system design questions compared to male
                        candidates with similar experience levels.
                      </AlertDescription>
                    </Alert>

                    <Alert className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 mb-4">
                      <LucideInfo className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      <AlertTitle className="text-amber-800 dark:text-amber-300">Language Pattern Detected</AlertTitle>
                      <AlertDescription className="text-amber-700 dark:text-amber-400">
                        Job descriptions for senior roles contain language patterns that may discourage diverse
                        candidates from applying.
                      </AlertDescription>
                    </Alert>

                    <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                      <LucideCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <AlertTitle className="text-green-800 dark:text-green-300">Improvement Detected</AlertTitle>
                      <AlertDescription className="text-green-700 dark:text-green-400">
                        The scoring gap between different demographic groups has decreased by 30% since implementing
                        blind code reviews.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Detailed Bias Report
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Coding Proctor</CardTitle>
                <CardDescription>Monitor coding assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg">
                      <LucideCode size={20} className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <div className="font-medium">2 Active Sessions</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Frontend Developer Challenge</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    <p>Automatically monitoring for:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Tab switching detection</li>
                      <li>Copy-paste tracking</li>
                      <li>Code similarity analysis</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2">
                  <LucideCode size={16} />
                  <span>View Active Sessions</span>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interview Templates</CardTitle>
                <CardDescription>Standardized assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg">
                      <LucideFileText size={20} className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <div className="font-medium">8 Active Templates</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">STAR method questions included</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    <p>Recently used templates:</p>
                    <ul className="mt-1 space-y-1">
                      <li className="flex items-center gap-1">
                        <LucideCheck size={14} className="text-green-600" />
                        <span>Frontend Developer (React)</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <LucideCheck size={14} className="text-green-600" />
                        <span>Backend Developer (Node.js)</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <LucideCheck size={14} className="text-green-600" />
                        <span>DevOps Engineer</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-2">
                  <LucideFileText size={16} />
                  <span>Manage Templates</span>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Candidate CRM</CardTitle>
                <CardDescription>Communication tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg">
                      <LucideUsers size={20} className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <div className="font-medium">5 Follow-ups Due</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Within next 48 hours</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    <p>Priority follow-ups:</p>
                    <ul className="mt-1 space-y-1">
                      <li className="flex items-center justify-between">
                        <span>Jamie Smith</span>
                        <Badge variant="outline" className="text-xs">
                          Today
                        </Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Alex Johnson</span>
                        <Badge variant="outline" className="text-xs">
                          Tomorrow
                        </Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Taylor Williams</span>
                        <Badge variant="outline" className="text-xs">
                          Tomorrow
                        </Badge>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-2">
                  <LucideUsers size={16} />
                  <span>View CRM Dashboard</span>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
