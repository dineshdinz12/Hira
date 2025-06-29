import { StudentSidebar } from "@/components/student/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  LucideEdit,
  LucideGithub,
  LucideGlobe,
  LucideLinkedin,
  LucideMail,
  LucideMapPin,
  LucidePhone,
  LucideShare2,
  LucideTwitter,
  LucideUser,
} from "lucide-react"
import { ProfileSkillsChart } from "@/components/student/profile-skills-chart"
import { ProfileActivity } from "@/components/student/profile-activity"

export default function StudentProfile() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <StudentSidebar />

      <main className="md:pl-64 pt-16 md:pt-0">
        <div className="container mx-auto p-6">
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Profile</h1>
                <p className="text-slate-600 dark:text-slate-400">Manage your personal and professional information</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2">
                  <LucideShare2 size={16} />
                  <span>Share Profile</span>
                </Button>
                <Button className="gap-2">
                  <LucideEdit size={16} />
                  <span>Edit Profile</span>
                </Button>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-1">
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Alex Johnson" />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Alex Johnson</h2>
                    <p className="text-purple-600 dark:text-purple-400 font-medium">Full-Stack Developer</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">San Francisco, CA</p>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="icon" className="rounded-full">
                        <LucideLinkedin size={16} />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <LucideGithub size={16} />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <LucideTwitter size={16} />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <LucideGlobe size={16} />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full">
                        <LucideMail size={16} className="text-slate-600 dark:text-slate-400" />
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">alex.johnson@example.com</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full">
                        <LucidePhone size={16} className="text-slate-600 dark:text-slate-400" />
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">(555) 123-4567</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full">
                        <LucideMapPin size={16} className="text-slate-600 dark:text-slate-400" />
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">San Francisco, CA</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full">
                        <LucideUser size={16} className="text-slate-600 dark:text-slate-400" />
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Joined: January 2025</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>React</span>
                        <span className="font-medium">Advanced</span>
                      </div>
                      <Progress value={90} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Node.js</span>
                        <span className="font-medium">Advanced</span>
                      </div>
                      <Progress value={85} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>TypeScript</span>
                        <span className="font-medium">Intermediate</span>
                      </div>
                      <Progress value={75} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>MongoDB</span>
                        <span className="font-medium">Intermediate</span>
                      </div>
                      <Progress value={70} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>GraphQL</span>
                        <span className="font-medium">Intermediate</span>
                      </div>
                      <Progress value={65} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Docker</span>
                        <span className="font-medium">Beginner</span>
                      </div>
                      <Progress value={40} className="h-1.5" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full text-sm">
                      View All Skills
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Tabs defaultValue="about">
                <TabsList className="mb-4">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="about">
                  <Card>
                    <CardHeader>
                      <CardTitle>About Me</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-slate-600 dark:text-slate-400">
                          Experienced Full-Stack Developer with 5+ years of expertise in building responsive web
                          applications using React, Node.js, and MongoDB. Passionate about creating clean, efficient
                          code and delivering exceptional user experiences. Strong problem-solving skills and experience
                          working in agile environments.
                        </p>
                        <p className="text-slate-600 dark:text-slate-400">
                          I specialize in building scalable web applications with modern JavaScript frameworks and have
                          a strong focus on performance optimization and accessibility. Currently exploring AI
                          integration in web applications and serverless architectures.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Skills Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ProfileSkillsChart />
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>External Profiles</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                              <LucideGithub size={20} className="text-slate-600 dark:text-slate-400" />
                            </div>
                            <div>
                              <div className="font-medium">GitHub</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">github.com/alexjohnson</div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                              <LucideLinkedin size={20} className="text-slate-600 dark:text-slate-400" />
                            </div>
                            <div>
                              <div className="font-medium">LinkedIn</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                linkedin.com/in/alexjohnson
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-slate-600 dark:text-slate-400"
                              >
                                <path
                                  d="M16.5 16.5L21 21"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M19 11.5C19 15.6421 15.6421 19 11.5 19C7.35786 19 4 15.6421 4 11.5C4 7.35786 7.35786 4 11.5 4C15.6421 4 19 7.35786 19 11.5Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M11.5 7V16"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M7 11.5H16"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div>
                              <div className="font-medium">Stack Overflow</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                stackoverflow.com/users/alexj
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                              <LucideGlobe size={20} className="text-slate-600 dark:text-slate-400" />
                            </div>
                            <div>
                              <div className="font-medium">Personal Website</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">alexjohnson.dev</div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="experience">
                  <Card>
                    <CardHeader>
                      <CardTitle>Work Experience</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        <div className="relative pl-8 pb-8 border-l border-slate-200 dark:border-slate-800">
                          <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-purple-600"></div>
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                            <div>
                              <h3 className="text-lg font-medium">Senior Frontend Developer</h3>
                              <div className="text-purple-600 dark:text-purple-400">TechCorp Inc.</div>
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">Jan 2023 - Present</div>
                          </div>
                          <div className="mt-2 text-slate-600 dark:text-slate-400">
                            <ul className="list-disc list-inside space-y-1">
                              <li>
                                Led the development of a React-based dashboard that improved user engagement by 40%
                              </li>
                              <li>Implemented performance optimizations that reduced load time by 60%</li>
                              <li>Mentored junior developers and conducted code reviews</li>
                              <li>Collaborated with UX designers to implement responsive designs</li>
                            </ul>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <Badge variant="outline">React</Badge>
                            <Badge variant="outline">TypeScript</Badge>
                            <Badge variant="outline">Redux</Badge>
                            <Badge variant="outline">Performance Optimization</Badge>
                          </div>
                        </div>

                        <div className="relative pl-8 pb-8 border-l border-slate-200 dark:border-slate-800">
                          <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                            <div>
                              <h3 className="text-lg font-medium">Full-Stack Developer</h3>
                              <div className="text-purple-600 dark:text-purple-400">WebSolutions LLC</div>
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">Mar 2020 - Dec 2022</div>
                          </div>
                          <div className="mt-2 text-slate-600 dark:text-slate-400">
                            <ul className="list-disc list-inside space-y-1">
                              <li>Developed and maintained multiple client websites using React and Node.js</li>
                              <li>Created RESTful APIs and integrated with third-party services</li>
                              <li>Implemented authentication and authorization systems</li>
                              <li>Optimized database queries and improved application performance</li>
                            </ul>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <Badge variant="outline">React</Badge>
                            <Badge variant="outline">Node.js</Badge>
                            <Badge variant="outline">MongoDB</Badge>
                            <Badge variant="outline">Express</Badge>
                          </div>
                        </div>

                        <div className="relative pl-8">
                          <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                            <div>
                              <h3 className="text-lg font-medium">Junior Web Developer</h3>
                              <div className="text-purple-600 dark:text-purple-400">Digital Creations</div>
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">Jun 2018 - Feb 2020</div>
                          </div>
                          <div className="mt-2 text-slate-600 dark:text-slate-400">
                            <ul className="list-disc list-inside space-y-1">
                              <li>Developed responsive websites using HTML, CSS, and JavaScript</li>
                              <li>Collaborated with designers to implement UI/UX designs</li>
                              <li>Maintained and updated existing client websites</li>
                              <li>Assisted in migrating legacy applications to modern frameworks</li>
                            </ul>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <Badge variant="outline">HTML/CSS</Badge>
                            <Badge variant="outline">JavaScript</Badge>
                            <Badge variant="outline">jQuery</Badge>
                            <Badge variant="outline">Responsive Design</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="education">
                  <Card>
                    <CardHeader>
                      <CardTitle>Education</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        <div className="relative pl-8 pb-8 border-l border-slate-200 dark:border-slate-800">
                          <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-purple-600"></div>
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                            <div>
                              <h3 className="text-lg font-medium">Bachelor of Science in Computer Science</h3>
                              <div className="text-purple-600 dark:text-purple-400">University of Technology</div>
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">2016 - 2020</div>
                          </div>
                          <div className="mt-2 text-slate-600 dark:text-slate-400">
                            <p>Graduated with honors. Specialized in web development and software engineering.</p>
                            <p className="mt-1">
                              Relevant coursework: Data Structures & Algorithms, Database Systems, Web Development,
                              Software Engineering, Computer Networks
                            </p>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <Badge variant="outline">GPA: 3.8/4.0</Badge>
                            <Badge variant="outline">Dean's List</Badge>
                          </div>
                        </div>

                        <div className="relative pl-8">
                          <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                            <div>
                              <h3 className="text-lg font-medium">Advanced Web Development Bootcamp</h3>
                              <div className="text-purple-600 dark:text-purple-400">CodeCamp Academy</div>
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">Summer 2018</div>
                          </div>
                          <div className="mt-2 text-slate-600 dark:text-slate-400">
                            <p>
                              Intensive 12-week bootcamp focused on modern web development technologies and practices.
                            </p>
                            <p className="mt-1">Developed a full-stack e-commerce application as a capstone project.</p>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <Badge variant="outline">React</Badge>
                            <Badge variant="outline">Node.js</Badge>
                            <Badge variant="outline">MongoDB</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Certifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg">
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-purple-600 dark:text-purple-400"
                              >
                                <path
                                  d="M19 9L13 3M19 9V17C19 18.1046 18.1046 19 17 19H7C5.89543 19 5 18.1046 5 17V7C5 5.89543 5.89543 5 7 5H13M19 9L13 5"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div>
                              <div className="font-medium">React Developer Certification</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                Issued by Hira • February 2025
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg">
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-purple-600 dark:text-purple-400"
                              >
                                <path
                                  d="M19 9L13 3M19 9V17C19 18.1046 18.1046 19 17 19H7C5.89543 19 5 18.1046 5 17V7C5 5.89543 5.89543 5 7 5H13M19 9L13 5"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div>
                              <div className="font-medium">JavaScript Fundamentals</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                Issued by Hira • March 2025
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg">
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-purple-600 dark:text-purple-400"
                              >
                                <path
                                  d="M19 9L13 3M19 9V17C19 18.1046 18.1046 19 17 19H7C5.89543 19 5 18.1046 5 17V7C5 5.89543 5.89543 5 7 5H13M19 9L13 5"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div>
                              <div className="font-medium">AWS Certified Developer</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                Issued by Amazon • January 2025
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="projects">
                  <Card>
                    <CardHeader>
                      <CardTitle>Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="border rounded-lg p-4 bg-white dark:bg-slate-900">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                            <div>
                              <h3 className="text-lg font-medium">E-commerce Platform</h3>
                              <div className="text-sm text-purple-600 dark:text-purple-400">Personal Project</div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                                <LucideGithub size={14} className="mr-1" /> GitHub
                              </Button>
                              <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                                <LucideGlobe size={14} className="mr-1" /> Demo
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                            Built a full-stack e-commerce platform using React, Node.js, and MongoDB. Implemented
                            features like user authentication, product catalog, shopping cart, and payment processing.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-xs">
                              React
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Node.js
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              MongoDB
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Express
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Stripe API
                            </Badge>
                          </div>
                        </div>

                        <div className="border rounded-lg p-4 bg-white dark:bg-slate-900">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                            <div>
                              <h3 className="text-lg font-medium">Task Management App</h3>
                              <div className="text-sm text-purple-600 dark:text-purple-400">Team Project</div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                                <LucideGithub size={14} className="mr-1" /> GitHub
                              </Button>
                              <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                                <LucideGlobe size={14} className="mr-1" /> Demo
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                            Collaborative task management application with real-time updates, drag-and-drop interface,
                            and team collaboration features. Implemented user authentication, permissions, and
                            notifications.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-xs">
                              React
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              TypeScript
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Firebase
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Redux
                            </Badge>
                          </div>
                        </div>

                        <div className="border rounded-lg p-4 bg-white dark:bg-slate-900">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                            <div>
                              <h3 className="text-lg font-medium">Weather Dashboard</h3>
                              <div className="text-sm text-purple-600 dark:text-purple-400">Personal Project</div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                                <LucideGithub size={14} className="mr-1" /> GitHub
                              </Button>
                              <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                                <LucideGlobe size={14} className="mr-1" /> Demo
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                            Interactive weather dashboard that displays current weather conditions and forecasts for
                            multiple locations. Features include location search, saved locations, and interactive
                            charts.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-xs">
                              React
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              OpenWeather API
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Chart.js
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Geolocation API
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="activity">
                  <ProfileActivity />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
