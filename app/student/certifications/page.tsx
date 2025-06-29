"use client"

import { useRouter } from "next/navigation"
import { StudentSidebar } from "@/components/student/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  LucideAlertCircle,
  LucideArrowRight,
  LucideAward,
  LucideCheck,
  LucideCode,
  LucideDatabase,
  LucideDownload,
  LucideExternalLink,
  LucideGraduationCap,
  LucideLinkedin,
  LucideLock,
  LucideServer,
  LucideShare2,
} from "lucide-react"

export default function Certifications() {
  const router = useRouter()

  const handlePathNavigation = (pathId: string) => {
    router.push(`/student/learning-paths?path=${pathId}`)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <StudentSidebar />

      <main className="md:pl-64 pt-16 md:pt-0">
        <div className="container mx-auto p-6">
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Certification Builder</h1>
                <p className="text-slate-600 dark:text-slate-400">Blockchain-verified credentials for your portfolio</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2">
                  <LucideShare2 size={16} />
                  <span>Share Credentials</span>
                </Button>
                <Button className="gap-2">
                  <LucideAward size={16} />
                  <span>View All Certificates</span>
                </Button>
              </div>
            </div>
          </header>

          <div className="mb-8">
            <Alert className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
              <LucideAlertCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <AlertDescription className="text-purple-700 dark:text-purple-400">
                All certificates are verified on the blockchain and can be shared directly to LinkedIn and other
                learning portals.
              </AlertDescription>
            </Alert>
          </div>

          <div className="mb-8">
            <Tabs defaultValue="earned">
              <TabsList className="mb-4">
                <TabsTrigger value="earned">Earned Certificates</TabsTrigger>
                <TabsTrigger value="progress">In Progress</TabsTrigger>
                <TabsTrigger value="available">Available Certifications</TabsTrigger>
              </TabsList>

              <TabsContent value="earned">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-lg mt-0.5">
                            <LucideAward size={20} className="text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">JavaScript Fundamentals</CardTitle>
                            <CardDescription>ES6+, Async, Functional Programming</CardDescription>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                        >
                          Verified
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <LucideGraduationCap size={16} className="text-green-600" />
                          <span>Issued on March 15, 2025</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <LucideCheck size={16} className="text-green-600" />
                          <span>Blockchain verified: 0x8f72...3e91</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <LucideCode size={16} className="text-green-600" />
                          <span>Final Score: 94%</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex gap-3 w-full">
                        <Button variant="outline" className="flex-1 gap-2">
                          <LucideDownload size={16} />
                          <span>Download</span>
                        </Button>
                        <Button variant="outline" className="flex-1 gap-2">
                          <LucideLinkedin size={16} />
                          <span>Share</span>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-lg mt-0.5">
                            <LucideAward size={20} className="text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">HTML & CSS Mastery</CardTitle>
                            <CardDescription>Responsive Design, CSS Grid, Flexbox</CardDescription>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                        >
                          Verified
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <LucideGraduationCap size={16} className="text-green-600" />
                          <span>Issued on January 22, 2025</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <LucideCheck size={16} className="text-green-600" />
                          <span>Blockchain verified: 0x3a45...9c12</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <LucideCode size={16} className="text-green-600" />
                          <span>Final Score: 88%</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex gap-3 w-full">
                        <Button variant="outline" className="flex-1 gap-2">
                          <LucideDownload size={16} />
                          <span>Download</span>
                        </Button>
                        <Button variant="outline" className="flex-1 gap-2">
                          <LucideLinkedin size={16} />
                          <span>Share</span>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-lg mt-0.5">
                            <LucideAward size={20} className="text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">React Developer</CardTitle>
                            <CardDescription>Components, Hooks, State Management</CardDescription>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                        >
                          Verified
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <LucideGraduationCap size={16} className="text-green-600" />
                          <span>Issued on February 10, 2025</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <LucideCheck size={16} className="text-green-600" />
                          <span>Blockchain verified: 0x7b23...1d45</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <LucideCode size={16} className="text-green-600" />
                          <span>Final Score: 91%</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex gap-3 w-full">
                        <Button variant="outline" className="flex-1 gap-2">
                          <LucideDownload size={16} />
                          <span>Download</span>
                        </Button>
                        <Button variant="outline" className="flex-1 gap-2">
                          <LucideLinkedin size={16} />
                          <span>Share</span>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="progress">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg mt-0.5">
                            <LucideCode size={20} className="text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">Full-Stack Developer</CardTitle>
                            <CardDescription>React, Node.js, MongoDB</CardDescription>
                          </div>
                        </div>
                        <Badge>In Progress</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Certification Progress</span>
                            <span className="font-medium">68%</span>
                          </div>
                          <Progress value={68} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Requirements:</h4>
                          <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                            <li className="flex items-center gap-2">
                              <LucideCheck size={16} className="text-green-600" />
                              <span>Complete all modules</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <LucideCheck size={16} className="text-green-600" />
                              <span>Pass all assessments</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <LucideCheck size={16} className="text-green-600" />
                              <span>Build portfolio project</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full gap-2"
                        onClick={() => handlePathNavigation("full_stack_development")}
                      >
                        <span>Continue Learning</span>
                        <LucideArrowRight size={16} />
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg mt-0.5">
                            <LucideDatabase size={20} className="text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">Database Design</CardTitle>
                            <CardDescription>SQL, NoSQL, Data Modeling</CardDescription>
                          </div>
                        </div>
                        <Badge>In Progress</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Certification Progress</span>
                            <span className="font-medium">35%</span>
                          </div>
                          <Progress value={35} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Requirements:</h4>
                          <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                            <li className="flex items-center gap-2">
                              <LucideCheck size={16} className="text-green-600" />
                              <span>Complete all modules</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <LucideCheck size={16} className="text-green-600" />
                              <span>Pass all assessments</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <LucideCheck size={16} className="text-green-600" />
                              <span>Design database schema</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full gap-2"
                        onClick={() => handlePathNavigation("database_design_sql")}
                      >
                        <span>Continue Learning</span>
                        <LucideArrowRight size={16} />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="available">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg mt-0.5">
                            <LucideServer size={20} className="text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">AI & Machine Learning</CardTitle>
                            <CardDescription>Python, TensorFlow, PyTorch</CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline">Available</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Requirements:</h4>
                          <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                            <li className="flex items-center gap-2">
                              <LucideCheck size={16} className="text-green-600" />
                              <span>Python Fundamentals</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <LucideCheck size={16} className="text-green-600" />
                              <span>Machine Learning Basics</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <LucideCheck size={16} className="text-green-600" />
                              <span>Deep Learning Projects</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full gap-2"
                        onClick={() => handlePathNavigation("ai_machine_learning")}
                      >
                        <span>Start Certification Path</span>
                        <LucideArrowRight size={16} />
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg mt-0.5">
                            <LucideServer size={20} className="text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">Cloud Architecture</CardTitle>
                            <CardDescription>AWS, Azure, GCP, Kubernetes</CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline">Available</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Requirements:</h4>
                          <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                            <li className="flex items-center gap-2">
                              <LucideCheck size={16} className="text-green-600" />
                              <span>Cloud Fundamentals</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <LucideCheck size={16} className="text-green-600" />
                              <span>AWS Services</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <LucideCheck size={16} className="text-green-600" />
                              <span>DevOps Practices</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full gap-2"
                        onClick={() => handlePathNavigation("cloud_architecture")}
                      >
                        <span>Start Certification Path</span>
                        <LucideArrowRight size={16} />
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-start gap-3">
                        <div className="bg-slate-200 dark:bg-slate-700 p-2 rounded-lg mt-0.5">
                          <LucideLock size={20} className="text-slate-500 dark:text-slate-400" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">DevOps Engineer</CardTitle>
                          <CardDescription>CI/CD, Docker, Kubernetes, Monitoring</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Learn DevOps practices, CI/CD pipelines, infrastructure as code, and monitoring solutions.
                        </p>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Requirements:</h4>
                          <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                            <li className="flex items-center gap-2">
                              <LucideArrowRight size={14} className="text-slate-500" />
                              <span>Complete DevOps Fundamentals</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <LucideArrowRight size={14} className="text-slate-500" />
                              <span>Build CI/CD Pipelines</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <LucideArrowRight size={14} className="text-slate-500" />
                              <span>Pass Final Assessment</span>
                            </li>
                          </ul>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <LucideLock size={14} />
                          <span>Premium subscription required</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Upgrade to Premium
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Certificate Details</h2>
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
                    <LucideAward size={24} className="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">React Developer Certificate</CardTitle>
                    <CardDescription>Blockchain-verified credential</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="aspect-[3/2] bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center p-6">
                    <div className="text-center space-y-4">
                      <div className="inline-block bg-purple-100 dark:bg-purple-900/20 p-4 rounded-full">
                        <LucideAward size={48} className="text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">React Developer</h3>
                        <p className="text-slate-600 dark:text-slate-400">Awarded to Alex Johnson</p>
                        <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">February 10, 2025</p>
                      </div>
                      <div className="pt-4 border-t border-dashed border-slate-200 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-500">
                        <p>Blockchain Verification: 0x7b23...1d45</p>
                        <p>Issued by Hira Learning Platform</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Certificate Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Issued Date</span>
                        <span className="font-medium">February 10, 2025</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Expiration</span>
                        <span className="font-medium">No Expiration</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Credential ID</span>
                        <span className="font-medium">HIRA-REACT-2025-0472</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Blockchain Hash</span>
                        <span className="font-medium">0x7b23...1d45</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Final Score</span>
                        <span className="font-medium">91%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Skills Verified</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                      >
                        React
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                      >
                        JavaScript
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                      >
                        Hooks
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                      >
                        State Management
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                      >
                        Context API
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                      >
                        Component Design
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                      >
                        Performance Optimization
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Verification</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      This certificate can be verified by scanning the QR code or visiting the verification URL.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 flex-1 flex items-center justify-center">
                        <div className="w-32 h-32 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                      </div>
                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 flex-1">
                        <h4 className="font-medium mb-2">Verification URL</h4>
                        <div className="flex items-center gap-2">
                          <code className="text-xs bg-slate-100 dark:bg-slate-800 p-2 rounded flex-1 overflow-x-auto">
                            https://hira.io/verify/HIRA-REACT-2025-0472
                          </code>
                          <Button variant="outline" size="sm" className="shrink-0">
                            <LucideExternalLink size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <Button className="sm:flex-1 gap-2">
                    <LucideDownload size={16} />
                    <span>Download Certificate</span>
                  </Button>
                  <Button variant="outline" className="sm:flex-1 gap-2">
                    <LucideLinkedin size={16} />
                    <span>Share to LinkedIn</span>
                  </Button>
                  <Button variant="outline" className="sm:flex-1 gap-2">
                    <LucideShare2 size={16} />
                    <span>Share Certificate</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Industry Recognition</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">LinkedIn Integration</CardTitle>
                  <CardDescription>Add certificates to your profile</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    All certificates can be directly added to your LinkedIn profile with a single click.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                    <LucideCheck size={16} />
                    <span>LinkedIn account connected</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full gap-2">
                    <LucideLinkedin size={16} />
                    <span>Manage LinkedIn Integration</span>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Employer Verification</CardTitle>
                  <CardDescription>Simplified credential verification</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Employers can easily verify your credentials through our secure verification portal.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <LucideExternalLink size={16} className="text-purple-600" />
                    <span>3 employers have verified your credentials</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Verification History
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Partner Network</CardTitle>
                  <CardDescription>Recognized by industry leaders</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Our certificates are recognized by leading technology companies and educational institutions.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <LucideExternalLink size={16} className="text-purple-600" />
                    <span>View our 50+ industry partners</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Explore Partner Network
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
