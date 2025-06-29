"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { StudentSidebar } from "@/components/student/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { LearningPathDetails } from "@/app/components/learning-path-details"
import {
  LucideArrowRight,
  LucideBookOpen,
  LucideCheck,
  LucideCode,
  LucideDatabase,
  LucideGraduationCap,
  LucideSearch,
  LucideServer,
  LucideStar,
} from "lucide-react"

// Import the learning paths data
import learningPathsData from "@/app/data/learning-paths.json"

// Define types for the learning path data structure
type Resource = {
  type: string
  title: string
  url: string
  completed?: boolean
}

type Subtopic = {
  name: string
  content: string
  completed: boolean
  resources: Resource[]
}

type Topic = {
  name: string
  completed: boolean
  subtopics: Subtopic[]
}

type Step = {
  name: string
  description: string
  completed: boolean
  topics: Topic[]
}

type LearningPath = {
  title: string
  description: string
  progress: number
  status: string
  current_module: string
  steps: Step[]
}

type LearningPathsData = {
  [key: string]: LearningPath
}

function LearningPathsContent() {
  const searchParams = useSearchParams()
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [pathsData, setPathsData] = useState<LearningPathsData>(learningPathsData)

  // Load saved progress from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('learningPathsProgress')
    if (savedProgress) {
      try {
        const parsedData = JSON.parse(savedProgress) as LearningPathsData
        setPathsData(parsedData)
      } catch (error) {
        console.error('Error loading saved progress:', error)
      }
    }
  }, [])

  // Handle path selection from URL parameter
  useEffect(() => {
    const pathId = searchParams.get('path')
    if (pathId && pathsData[pathId]) {
      setSelectedPath(pathId)
    }
  }, [searchParams, pathsData])

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('learningPathsProgress', JSON.stringify(pathsData))
  }, [pathsData])

  const handlePathSelect = (pathId: string) => {
    if (pathsData[pathId]) {
      setSelectedPath(pathId)
    } else {
      console.error(`Path ${pathId} not found in pathsData`)
    }
  }

  const handleProgressUpdate = (pathId: string, progress: number) => {
    setPathsData(prevData => {
      const updatedData = {
        ...prevData,
        [pathId]: {
          ...prevData[pathId],
          progress: progress,
          current_module: findNextIncompleteStep(prevData[pathId])
        }
      }
      return updatedData
    })
  }

  const findNextIncompleteStep = (path: LearningPath) => {
    if (!path || !path.steps) return "No steps available"
    
    for (const step of path.steps) {
      const hasIncompleteResource = step.topics.some(topic =>
        topic.subtopics.some(subtopic =>
          subtopic.resources.some(resource => !resource.completed)
        )
      )
      if (hasIncompleteResource) {
        return step.name
      }
    }
    return "All steps completed!"
  }

  const getNextIncompleteTopics = (path: LearningPath) => {
    if (!path || !path.steps) return []
    
    const topics: string[] = []
    let foundIncomplete = false

    for (const step of path.steps) {
      if (foundIncomplete) break

      for (const topic of step.topics) {
        const hasIncompleteResource = topic.subtopics.some(subtopic =>
          subtopic.resources.some(resource => !resource.completed)
        )

        if (hasIncompleteResource) {
          topics.push(topic.name)
          foundIncomplete = true
          break
        }
      }
    }

    // If no incomplete topics found, return the first topic of the first step
    if (topics.length === 0 && path.steps.length > 0 && path.steps[0].topics.length > 0) {
      return [path.steps[0].topics[0].name]
    }

    return topics
  }

  const filteredPaths = Object.entries(pathsData).filter(([_, path]) => {
    return path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           path.description.toLowerCase().includes(searchQuery.toLowerCase())
  })

  // Filter paths for current section
  const currentPaths = Object.entries(pathsData).filter(([id, path]) => 
    path.status === "in_progress" || path.status === "paused"
  )

  // Filter paths for recommended section
  const recommendedPaths = ["ai_machine_learning", "cloud_architecture", "mobile_development"]

  if (selectedPath && pathsData[selectedPath]) {
    const path = pathsData[selectedPath]
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <StudentSidebar />
        <main className="md:pl-64 pt-16 md:pt-0">
          <div className="container mx-auto p-6">
            <header className="mb-8">
              <Button
                variant="ghost"
                className="mb-4"
                onClick={() => setSelectedPath(null)}
              >
                ← Back to Learning Paths
              </Button>
              <LearningPathDetails
                path={path}
                onProgressUpdate={(progress: number) => handleProgressUpdate(selectedPath, progress)}
              />
            </header>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <StudentSidebar />

      <main className="md:pl-64 pt-16 md:pt-0">
        <div className="container mx-auto p-6">
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Learning Paths</h1>
                <p className="text-slate-600 dark:text-slate-400">
                  AI-curated courses based on your skills and career goals
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative w-full md:w-64">
                  <LucideSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <Input
                    type="search"
                    placeholder="Search paths..."
                    className="w-full pl-9 bg-white dark:bg-slate-900"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button>Find My Path</Button>
              </div>
            </div>
          </header>

          <div className="mb-8">
            <Tabs defaultValue="current">
              <TabsList className="mb-4">
                <TabsTrigger value="current">Current Paths</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="current">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentPaths.map(([pathId, path]) => (
                    <Card key={pathId}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg mt-0.5">
                              {pathId === "full_stack_development" ? (
                                <LucideCode size={20} className="text-purple-600 dark:text-purple-400" />
                              ) : (
                                <LucideDatabase size={20} className="text-purple-600 dark:text-purple-400" />
                              )}
                            </div>
                            <div>
                              <CardTitle className="text-lg">{path.title}</CardTitle>
                              <CardDescription>{path.description}</CardDescription>
                            </div>
                          </div>
                          <Badge>{path.status === "in_progress" ? "In Progress" : "Paused"}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span>Progress</span>
                              <span className="font-medium">{path.progress}%</span>
                            </div>
                            <Progress value={path.progress} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium">Current Module: {path.current_module}</h4>
                            <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                              {getNextIncompleteTopics(path).map((topic, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <div className="h-3.5 w-3.5 rounded-full border-2 border-purple-600" />
                                  <span>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full gap-2"
                          onClick={() => handlePathSelect(pathId)}
                        >
                          <span>Continue Learning</span>
                          <LucideArrowRight size={16} />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recommended">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recommendedPaths.map((pathId) => {
                    const path = pathsData[pathId]
                    if (!path) return null

                    return (
                      <Card key={pathId}>
                        <CardHeader className="pb-2">
                          <div className="flex items-start gap-3">
                            <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg mt-0.5">
                              <LucideServer size={20} className="text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{path.title}</CardTitle>
                              <CardDescription>{path.description}</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-1 text-sm">
                                <span>Match Score</span>
                                <span className="font-medium">
                                  {pathId === "ai_machine_learning" ? "92" :
                                   pathId === "cloud_architecture" ? "85" : "78"}%
                                </span>
                              </div>
                              <Progress 
                                value={pathId === "ai_machine_learning" ? 92 :
                                       pathId === "cloud_architecture" ? 85 : 78} 
                                className="h-2" 
                              />
                            </div>
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium">Why it's recommended:</h4>
                              <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                                {pathId === "ai_machine_learning" ? (
                                  <>
                                    <li className="flex items-center gap-2">
                                      <LucideStar size={14} className="text-amber-500" />
                                      <span>Matches your interest in data analysis</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                      <LucideStar size={14} className="text-amber-500" />
                                      <span>Complements your programming skills</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                      <LucideStar size={14} className="text-amber-500" />
                                      <span>High demand in your target job market</span>
                                    </li>
                                  </>
                                ) : pathId === "cloud_architecture" ? (
                                  <>
                                    <li className="flex items-center gap-2">
                                      <LucideStar size={14} className="text-amber-500" />
                                      <span>Builds on your DevOps experience</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                      <LucideStar size={14} className="text-amber-500" />
                                      <span>Trending skill in your industry</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                      <LucideStar size={14} className="text-amber-500" />
                                      <span>Salary increase potential: 25%</span>
                                    </li>
                                  </>
                                ) : (
                                  <>
                                    <li className="flex items-center gap-2">
                                      <LucideStar size={14} className="text-amber-500" />
                                      <span>Extends your React knowledge</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                      <LucideStar size={14} className="text-amber-500" />
                                      <span>Diversifies your skill portfolio</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                      <LucideStar size={14} className="text-amber-500" />
                                      <span>Growing demand in startup sector</span>
                                    </li>
                                  </>
                                )}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            className="w-full gap-2"
                            onClick={() => handlePathSelect(pathId)}
                          >
                            <span>Start Learning Path</span>
                            <LucideArrowRight size={16} />
                          </Button>
                        </CardFooter>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>

              <TabsContent value="completed">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-lg mt-0.5">
                            <LucideCheck size={20} className="text-green-600 dark:text-green-400" />
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
                          Completed
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Final Score</span>
                            <span className="font-medium">94%</span>
                          </div>
                          <Progress value={100} className="h-2 bg-green-200 dark:bg-green-900/30">
                            <div className="h-full bg-green-600 rounded-full" style={{ width: "94%" }}></div>
                          </Progress>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Completion Date: March 15, 2025</h4>
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <LucideGraduationCap size={16} className="text-green-600" />
                            <span>Certificate issued and added to your profile</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex gap-3 w-full">
                        <Button variant="outline" className="flex-1">
                          View Certificate
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Review Materials
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-lg mt-0.5">
                            <LucideCheck size={20} className="text-green-600 dark:text-green-400" />
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
                          Completed
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Final Score</span>
                            <span className="font-medium">88%</span>
                          </div>
                          <Progress value={100} className="h-2 bg-green-200 dark:bg-green-900/30">
                            <div className="h-full bg-green-600 rounded-full" style={{ width: "88%" }}></div>
                          </Progress>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Completion Date: January 22, 2025</h4>
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <LucideGraduationCap size={16} className="text-green-600" />
                            <span>Certificate issued and added to your profile</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex gap-3 w-full">
                        <Button variant="outline" className="flex-1">
                          View Certificate
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Review Materials
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Learning Path Details</h2>
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg">
                    <LucideCode size={24} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Full-Stack Development</CardTitle>
                    <CardDescription>Comprehensive path to become a full-stack developer</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Path Overview</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      This learning path covers all aspects of full-stack development, from frontend frameworks to
                      backend services, databases, and deployment. You'll build real-world projects and develop a
                      comprehensive portfolio.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Modules</h3>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4 bg-white dark:bg-slate-900">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">1. Frontend Fundamentals</h4>
                          <Badge
                            variant="outline"
                            className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                          >
                            Completed
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          HTML, CSS, JavaScript, and responsive design principles
                        </p>
                        <Progress value={100} className="h-1.5 bg-green-200 dark:bg-green-900/30">
                          <div className="h-full bg-green-600 rounded-full"></div>
                        </Progress>
                      </div>

                      <div className="border rounded-lg p-4 bg-white dark:bg-slate-900">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">2. React & Modern JavaScript</h4>
                          <Badge
                            variant="outline"
                            className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                          >
                            Completed
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          React components, hooks, state management, and routing
                        </p>
                        <Progress value={100} className="h-1.5 bg-green-200 dark:bg-green-900/30">
                          <div className="h-full bg-green-600 rounded-full"></div>
                        </Progress>
                      </div>

                      <div className="border rounded-lg p-4 bg-white dark:bg-slate-900">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">3. Advanced React Patterns</h4>
                          <Badge>In Progress</Badge>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          Advanced patterns, performance optimization, and testing
                        </p>
                        <Progress value={50} className="h-1.5" />
                      </div>

                      <div className="border rounded-lg p-4 bg-white dark:bg-slate-900">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">4. Backend Development with Node.js</h4>
                          <Badge variant="outline">Not Started</Badge>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          RESTful APIs, authentication, and middleware
                        </p>
                        <Progress value={0} className="h-1.5" />
                      </div>

                      <div className="border rounded-lg p-4 bg-white dark:bg-slate-900">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">5. Database Integration</h4>
                          <Badge variant="outline">Not Started</Badge>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          MongoDB, PostgreSQL, and database design principles
                        </p>
                        <Progress value={0} className="h-1.5" />
                      </div>

                      <div className="border rounded-lg p-4 bg-white dark:bg-slate-900">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">6. Deployment & DevOps</h4>
                          <Badge variant="outline">Not Started</Badge>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          CI/CD, Docker, cloud services, and monitoring
                        </p>
                        <Progress value={0} className="h-1.5" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Skills You'll Gain</h3>
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
                        Node.js
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                      >
                        MongoDB
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                      >
                        Express
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                      >
                        REST APIs
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                      >
                        Authentication
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                      >
                        Responsive Design
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                      >
                        Testing
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                      >
                        CI/CD
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                      >
                        Docker
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Career Opportunities</h3>
                    <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                      <li className="flex items-center gap-2">
                        <LucideBookOpen size={16} className="text-purple-600" />
                        <span>Full-Stack Developer (Avg. Salary: $105,000)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <LucideBookOpen size={16} className="text-purple-600" />
                        <span>Frontend Developer (Avg. Salary: $95,000)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <LucideBookOpen size={16} className="text-purple-600" />
                        <span>Backend Developer (Avg. Salary: $100,000)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <LucideBookOpen size={16} className="text-purple-600" />
                        <span>JavaScript Developer (Avg. Salary: $90,000)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex gap-3 w-full">
                  <Button className="flex-1">Continue Learning</Button>
                  <Button variant="outline" className="flex-1">
                    View Curriculum
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Recommended Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Advanced React Patterns Workshop</CardTitle>
                  <CardDescription>By Kent C. Dodds</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Learn advanced React patterns from one of the most respected educators in the React community.
                  </p>
                  <Badge
                    variant="outline"
                    className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                  >
                    Video Course
                  </Badge>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Access Resource
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Full-Stack Open 2025</CardTitle>
                  <CardDescription>By University of Helsinki</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Deep dive into modern web development with React, Node.js, GraphQL, and TypeScript.
                  </p>
                  <Badge
                    variant="outline"
                    className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                  >
                    Online Course
                  </Badge>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Access Resource
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Testing JavaScript Applications</CardTitle>
                  <CardDescription>By Testing JavaScript</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Comprehensive guide to testing JavaScript applications with Jest, React Testing Library, and
                    Cypress.
                  </p>
                  <Badge
                    variant="outline"
                    className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                  >
                    Interactive Course
                  </Badge>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Access Resource
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

export default function LearningPaths() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LearningPathsContent />
    </Suspense>
  )
}
