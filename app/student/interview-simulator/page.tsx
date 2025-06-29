import { StudentSidebar } from "@/components/student/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  LucideAlertCircle,
  LucideCamera,
  LucideEye,
  MicIcon as LucideMicrophone,
  LucidePlay,
  LucideUser,
  LucideVideo,
} from "lucide-react"
import { InterviewFeedback } from "@/components/student/interview-feedback"

export default function InterviewSimulator() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <StudentSidebar />

      <main className="md:pl-64 pt-16 md:pt-0">
        <div className="container mx-auto p-6">
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">AI Interview Simulator</h1>
                <p className="text-slate-600 dark:text-slate-400">Practice interviews with real-time feedback</p>
              </div>
              <div>
                <Button className="gap-2">
                  <LucidePlay size={16} />
                  <span>Start New Interview</span>
                </Button>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Interview Simulator</CardTitle>
                  <CardDescription>Practice with AI-powered interviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <LucideVideo size={48} className="mx-auto mb-2 text-slate-400 dark:text-slate-600" />
                      <p className="text-slate-600 dark:text-slate-400">Start a new interview session</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <Card>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm font-medium">Speech Analysis</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <LucideMicrophone size={16} className="text-purple-600" />
                            <span className="text-sm">Confidence</span>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                          >
                            Good
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm font-medium">Eye Contact</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <LucideEye size={16} className="text-purple-600" />
                            <span className="text-sm">Engagement</span>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                          >
                            Improve
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm font-medium">Body Language</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <LucideCamera size={16} className="text-purple-600" />
                            <span className="text-sm">Posture</span>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                          >
                            Good
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Alert className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                    <LucideAlertCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    <AlertDescription className="text-purple-700 dark:text-purple-400">
                      Your last interview showed improvement in technical responses, but try to maintain more consistent
                      eye contact with the camera.
                    </AlertDescription>
                  </Alert>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-3">
                  <Button className="w-full sm:w-auto gap-2">
                    <LucidePlay size={16} />
                    <span>Start Frontend Interview</span>
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Choose Interview Type
                  </Button>
                </CardFooter>
              </Card>

              <InterviewFeedback />
            </div>

            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Interview Types</CardTitle>
                  <CardDescription>Choose your practice scenario</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-purple-100 dark:bg-purple-900/20 p-1.5 rounded">
                          <LucideUser size={16} className="text-purple-600 dark:text-purple-400" />
                        </div>
                        <span>Frontend Developer</span>
                      </div>
                      <Badge>Popular</Badge>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      React, CSS, JavaScript, Web Performance
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-purple-100 dark:bg-purple-900/20 p-1.5 rounded">
                          <LucideUser size={16} className="text-purple-600 dark:text-purple-400" />
                        </div>
                        <span>Backend Developer</span>
                      </div>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Node.js, Databases, API Design, System Design
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-purple-100 dark:bg-purple-900/20 p-1.5 rounded">
                          <LucideUser size={16} className="text-purple-600 dark:text-purple-400" />
                        </div>
                        <span>Full-Stack Developer</span>
                      </div>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      React, Node.js, Databases, System Design
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-purple-100 dark:bg-purple-900/20 p-1.5 rounded">
                          <LucideUser size={16} className="text-purple-600 dark:text-purple-400" />
                        </div>
                        <span>DevOps Engineer</span>
                      </div>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      CI/CD, Docker, Kubernetes, Cloud Infrastructure
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Interview Types
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                  <CardDescription>Interview practice stats</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Interviews Completed</span>
                      <span className="font-medium">12/20</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>

                  <div className="pt-2">
                    <h4 className="text-sm font-medium mb-3">Skills Improvement</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1 text-xs">
                          <span>Technical Responses</span>
                          <span>78%</span>
                        </div>
                        <Progress value={78} className="h-1.5" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-xs">
                          <span>Communication</span>
                          <span>65%</span>
                        </div>
                        <Progress value={65} className="h-1.5" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-xs">
                          <span>Body Language</span>
                          <span>82%</span>
                        </div>
                        <Progress value={82} className="h-1.5" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-xs">
                          <span>Problem Solving</span>
                          <span>70%</span>
                        </div>
                        <Progress value={70} className="h-1.5" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
