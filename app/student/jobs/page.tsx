"use client"

import { StudentSidebar } from "@/components/student/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  LucideAlertCircle,
  LucideArrowRight,
  LucideBriefcase,
  LucideBuilding,
  LucideCalendar,
  LucideCheck,
  LucideClock,
  LucideDollarSign,
  LucideFilter,
  LucideInfo,
  LucideMapPin,
  LucideUser,
  LucideX,
  LucideCode,
  LucideVideo,
  LucideMessageSquare,
  LucideCheckCircle2,
  LucideClipboardCheck,
} from "lucide-react"
import { JobApplicationStatus } from "@/components/student/job-application-status"
import { useRouter } from "next/navigation"

export default function JobApplications() {
  const router = useRouter()
  
  const handleStartCodingRound = () => {
    router.push("/student/coding-proctor")
  }

  const handleStartRound1 = () => {
    router.push("/student/round")
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <StudentSidebar />

      <main className="md:pl-64 pt-16 md:pt-0">
        <div className="container mx-auto p-6">
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Job Applications</h1>
                <p className="text-slate-600 dark:text-slate-400">Track and manage your job search</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2">
                  <LucideFilter size={16} />
                  <span>Filter</span>
                </Button>
                <Button className="gap-2">
                  <LucideBriefcase size={16} />
                  <span>Add Application</span>
                </Button>
              </div>
            </div>
          </header>

          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <LucideBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
                <Input type="text" placeholder="Search jobs..." className="pl-9 bg-white dark:bg-slate-900" />
              </div>
              <div className="relative w-full md:w-64">
                <LucideMapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
                <Input type="text" placeholder="Location..." className="pl-9 bg-white dark:bg-slate-900" />
              </div>
            </div>

            <Alert className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
              <LucideAlertCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <AlertDescription className="text-purple-700 dark:text-purple-400">
                You have 3 upcoming interviews this week. Make sure to prepare and review the company information.
              </AlertDescription>
            </Alert>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Applications</CardTitle>
                <CardDescription>All time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">24</div>
                <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                  <LucideArrowRight size={14} className="rotate-45" />
                  <span>3 new this week</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">In Progress</CardTitle>
                <CardDescription>Active applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">16</div>
                <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                  <LucideClock size={14} />
                  <span>5 need follow-up</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Interviews</CardTitle>
                <CardDescription>Scheduled</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">3</div>
                <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                  <LucideCalendar size={14} />
                  <span>Next: Tomorrow, 2:00 PM</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Offers</CardTitle>
                <CardDescription>Received</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">1</div>
                <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                  <LucideCheck size={14} />
                  <span>TechCorp Inc.</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-8">
            <Tabs defaultValue="active">
              <TabsList className="mb-4">
                <TabsTrigger value="active">Active Applications</TabsTrigger>
                <TabsTrigger value="interviews">Interview Rounds</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="active">
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg mt-0.5">
                            <LucideBriefcase size={20} className="text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">Senior Frontend Developer</CardTitle>
                            <CardDescription>TechCorp Inc.</CardDescription>
                          </div>
                        </div>
                        <Badge>Interview Scheduled</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                            <LucideMapPin size={14} />
                            <span>San Francisco, CA (Remote)</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                            <LucideDollarSign size={14} />
                            <span>$120,000 - $150,000</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                            <LucideCalendar size={14} />
                            <span>Applied: May 1, 2025</span>
                          </div>
                        </div>
                        <JobApplicationStatus status="interview" />
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <LucideCalendar size={14} className="text-purple-600" />
                          <span>Technical Interview: Tomorrow, 2:00 PM</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex gap-3 w-full">
                        <Button className="flex-1">Prepare for Interview</Button>
                        <Button variant="outline" className="flex-1">
                          View Application
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="interviews">
                <div className="space-y-4">
                  {/* Junior Developer Application */}
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg mt-0.5">
                            <LucideBriefcase size={20} className="text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">Junior Frontend Developer</CardTitle>
                            <CardDescription>TechCorp Inc.</CardDescription>
                          </div>
                        </div>
                        <Badge>In Progress</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-6">
                        {/* Interview Round Progress */}
                        <div className="space-y-4">
                          <h3 className="font-semibold">Interview Rounds</h3>
                          <div className="space-y-4">
                            {/* Round 1: MCQ Assessment */}
                            <div className="flex items-center gap-4">
                              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                                <LucideClipboardCheck className="h-4 w-4 text-purple-600" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="font-medium">Round 1: MCQ Assessment</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">5 questions • 15 minutes</p>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button onClick={handleStartRound1} variant="outline">
                                      View Instructions
                                    </Button>
                                    <Button onClick={handleStartRound1}>
                                      Start MCQ
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Round 2: Technical Interview */}
                            <div className="flex items-center gap-4">
                              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                <LucideMessageSquare className="h-4 w-4 text-slate-600" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="font-medium">Round 2: Technical Interview</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Scheduled for May 5, 2025</p>
                                  </div>
                                  <Badge variant="outline" className="bg-slate-50 text-slate-700">Upcoming</Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Interview Progress */}
                        <div className="pt-4 border-t">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">Overall Progress</h4>
                            <span className="text-sm text-slate-600">0/2 Rounds Completed</span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                            <div className="w-0 h-full bg-purple-600 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Senior Developer Application */}
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg mt-0.5">
                            <LucideBriefcase size={20} className="text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">Senior Frontend Developer</CardTitle>
                            <CardDescription>TechCorp Inc.</CardDescription>
                          </div>
                        </div>
                        <Badge>In Progress</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-6">
                        {/* Interview Round Progress */}
                        <div className="space-y-4">
                          <h3 className="font-semibold">Interview Rounds</h3>
                          <div className="space-y-4">
                            {/* Round 1: Coding Assessment */}
                            <div className="flex items-center gap-4">
                              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                                <LucideCode className="h-4 w-4 text-purple-600" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="font-medium">Round 1: Coding Assessment</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">60 minutes • 2 coding questions</p>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button onClick={handleStartCodingRound} variant="outline">
                                      View Instructions
                                    </Button>
                                    <Button onClick={handleStartCodingRound}>
                                      Start Coding
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Round 2: System Design */}
                            <div className="flex items-center gap-4">
                              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                <LucideMessageSquare className="h-4 w-4 text-slate-600" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="font-medium">Round 2: System Design</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Scheduled for May 5, 2025</p>
                                  </div>
                                  <Badge variant="outline" className="bg-slate-50 text-slate-700">Upcoming</Badge>
                                </div>
                              </div>
                            </div>

                            {/* Round 3: Technical Leadership */}
                            <div className="flex items-center gap-4">
                              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                <LucideMessageSquare className="h-4 w-4 text-slate-600" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="font-medium">Round 3: Technical Leadership</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Scheduled for May 10, 2025</p>
                                  </div>
                                  <Badge variant="outline" className="bg-slate-50 text-slate-700">Upcoming</Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Interview Progress */}
                        <div className="pt-4 border-t">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">Overall Progress</h4>
                            <span className="text-sm text-slate-600">0/3 Rounds Completed</span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                            <div className="w-0 h-full bg-purple-600 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="completed">
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-lg mt-0.5">
                            <LucideBriefcase size={20} className="text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">Full Stack Developer</CardTitle>
                            <CardDescription>InnovateTech</CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700">Completed</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                            <LucideMapPin size={14} />
                            <span>New York, NY (Hybrid)</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                            <LucideDollarSign size={14} />
                            <span>$130,000 - $160,000</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                            <LucideCalendar size={14} />
                            <span>Completed: April 15, 2025</span>
                          </div>
                        </div>
                        <JobApplicationStatus status="completed" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}





