import { StudentSidebar } from "@/components/student/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  LucideArrowRight,
  LucideAward,
  LucideCalendar,
  LucideCheck,
  LucideCode,
  LucideEye,
  LucideGraduationCap,
  LucideInfo,
  MicIcon as LucideMicrophone,
  LucidePlay,
  LucideUser,
} from "lucide-react"
import { PerformanceChart } from "@/components/student/performance-chart"
import { SkillRadarChart } from "@/components/student/skill-radar-chart"

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <StudentSidebar />

      <main className="md:pl-64 pt-16 md:pt-0">
        <div className="container mx-auto p-6">
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back, Alex</h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Track your progress and continue your learning journey
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2">
                  <LucideCalendar size={16} />
                  <span>May 3, 2025</span>
                </Button>
                <Button className="gap-2">
                  <LucidePlay size={16} />
                  <span>Continue Learning</span>
                </Button>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Learning Progress</CardTitle>
                <CardDescription>Full-Stack Development Path</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Overall Completion</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                    <span>Next milestone: Advanced React Patterns</span>
                    <Badge
                      variant="outline"
                      className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                    >
                      3 days left
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Coding Streak</CardTitle>
                <CardDescription>Keep your momentum going</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">16</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Days</div>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded-sm flex items-center justify-center ${
                          i < 5 ? "bg-purple-600 text-white" : "bg-slate-200 dark:bg-slate-700"
                        }`}
                      >
                        {i < 5 && <LucideCheck size={14} />}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full text-sm">
                    Complete today&apos;s challenge
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Upcoming Interview</CardTitle>
                <CardDescription>Practice session scheduled</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg">
                      <LucideUser size={20} className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <div className="font-medium">Mock Frontend Interview</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Today, 3:00 PM</div>
                    </div>
                  </div>
                  <Button className="w-full gap-2">
                    <LucidePlay size={16} />
                    <span>Start Practice</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Performance Dashboard</CardTitle>
                <CardDescription>Your skill progression compared to peers</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <PerformanceChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skill Assessment</CardTitle>
                <CardDescription>Your current proficiency levels</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <SkillRadarChart />
              </CardContent>
            </Card>
          </div>

          <div className="mb-8">
            <Tabs defaultValue="learning">
              <TabsList className="mb-4">
                <TabsTrigger value="learning">Learning Paths</TabsTrigger>
                <TabsTrigger value="certifications">Certifications</TabsTrigger>
                <TabsTrigger value="feedback">Real-Time Feedback</TabsTrigger>
              </TabsList>

              <TabsContent value="learning">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">Full-Stack Development</CardTitle>
                          <CardDescription>React, Node.js, MongoDB</CardDescription>
                        </div>
                        <Badge>In Progress</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Progress</span>
                            <span className="font-medium">68%</span>
                          </div>
                          <Progress value={68} className="h-2" />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <LucideGraduationCap size={16} />
                          <span>Next: Advanced React Patterns</span>
                        </div>
                        <Button variant="outline" className="w-full gap-2">
                          <span>Continue Learning</span>
                          <LucideArrowRight size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">AI & Machine Learning</CardTitle>
                          <CardDescription>Python, TensorFlow, PyTorch</CardDescription>
                        </div>
                        <Badge variant="outline">Recommended</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Matches your profile</span>
                            <span className="font-medium">92%</span>
                          </div>
                          <Progress value={92} className="h-2" />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <LucideInfo size={16} />
                          <span>Based on your skills and job interests</span>
                        </div>
                        <Button className="w-full gap-2">
                          <span>Start Learning Path</span>
                          <LucideArrowRight size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="certifications">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">React Developer</CardTitle>
                      <CardDescription>Advanced Frontend</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg">
                          <LucideAward size={20} className="text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Blockchain Verified</div>
                      </div>
                      <Button variant="outline" className="w-full">
                        View Certificate
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Node.js Expert</CardTitle>
                      <CardDescription>Backend Development</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg">
                          <LucideAward size={20} className="text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Blockchain Verified</div>
                      </div>
                      <Button variant="outline" className="w-full">
                        View Certificate
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-100 dark:bg-slate-800 border-dashed">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Full-Stack Developer</CardTitle>
                      <CardDescription>Complete Path Certification</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-slate-200 dark:bg-slate-700 p-2 rounded-lg">
                          <LucideAward size={20} className="text-slate-400 dark:text-slate-500" />
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">32% Requirements Completed</div>
                      </div>
                      <Button variant="outline" className="w-full">
                        View Requirements
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="feedback">
                <div className="space-y-4">
                  <Alert className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                    <LucideEye className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <AlertTitle className="text-amber-800 dark:text-amber-300">Eye Contact Feedback</AlertTitle>
                    <AlertDescription className="text-amber-700 dark:text-amber-400">
                      During your last interview practice, you maintained eye contact 62% of the time. Try to increase
                      this to 70-80% for better engagement.
                    </AlertDescription>
                  </Alert>

                  <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                    <LucideMicrophone className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <AlertTitle className="text-green-800 dark:text-green-300">Speech Improvement</AlertTitle>
                    <AlertDescription className="text-green-700 dark:text-green-400">
                      Great job reducing filler words! Your use of "um" and "like" decreased by 40% compared to your
                      previous session.
                    </AlertDescription>
                  </Alert>

                  <Alert className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                    <LucideCode className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    <AlertTitle className="text-purple-800 dark:text-purple-300">Coding Challenge Feedback</AlertTitle>
                    <AlertDescription className="text-purple-700 dark:text-purple-400">
                      Your solution to the array manipulation problem was in the top 15% for efficiency. Consider
                      optimizing your space complexity next time.
                    </AlertDescription>
                  </Alert>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
