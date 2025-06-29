import { RecruiterSidebar } from "@/components/recruiter/sidebar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  LucideBuilding,
  LucideEdit,
  LucideGlobe,
  LucideLinkedin,
  LucideMail,
  LucideMapPin,
  LucidePhone,
  LucideShare2,
  LucideTwitter,
} from "lucide-react"
import { RecruiterStats } from "@/components/recruiter/recruiter-stats"
import { RecruiterActivity } from "@/components/recruiter/recruiter-activity"

export default function RecruiterProfile() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <RecruiterSidebar />

      <main className="md:pl-64 pt-16 md:pt-0">
        <div className="container mx-auto p-6">
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Profile</h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Manage your professional information and preferences
                </p>
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
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Taylor Williams" />
                      <AvatarFallback>TW</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Taylor Williams</h2>
                    <p className="text-purple-600 dark:text-purple-400 font-medium">Senior Technical Recruiter</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">TechCorp Inc.</p>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="icon" className="rounded-full">
                        <LucideLinkedin size={16} />
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
                      <div className="text-sm text-slate-600 dark:text-slate-400">taylor.williams@techcorp.com</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full">
                        <LucidePhone size={16} className="text-slate-600 dark:text-slate-400" />
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">(555) 987-6543</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full">
                        <LucideMapPin size={16} className="text-slate-600 dark:text-slate-400" />
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">San Francisco, CA</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full">
                        <LucideBuilding size={16} className="text-slate-600 dark:text-slate-400" />
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">TechCorp Inc.</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hiring Specialties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                      Frontend Development
                    </Badge>
                    <Badge className="bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                      Backend Development
                    </Badge>
                    <Badge className="bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                      Full-Stack
                    </Badge>
                    <Badge className="bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                      DevOps
                    </Badge>
                    <Badge className="bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                      Data Engineering
                    </Badge>
                    <Badge className="bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                      Machine Learning
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Tabs defaultValue="about">
                <TabsList className="mb-4">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="company">Company</TabsTrigger>
                  <TabsTrigger value="stats">Recruitment Stats</TabsTrigger>
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
                          Senior Technical Recruiter with 7+ years of experience in the tech industry. Specialized in
                          recruiting software engineers, data scientists, and DevOps professionals for leading
                          technology companies.
                        </p>
                        <p className="text-slate-600 dark:text-slate-400">
                          I'm passionate about connecting talented individuals with opportunities that match their
                          skills and career aspirations. My approach focuses on understanding both technical
                          requirements and cultural fit to ensure successful long-term placements.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Contact Preferences</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                              <LucideMail size={20} className="text-slate-600 dark:text-slate-400" />
                            </div>
                            <div>
                              <div className="font-medium">Email</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                Preferred for initial contact
                              </div>
                            </div>
                          </div>
                          <Badge>Primary</Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                              <LucidePhone size={20} className="text-slate-600 dark:text-slate-400" />
                            </div>
                            <div>
                              <div className="font-medium">Phone</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                Available 9 AM - 5 PM PST
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline">Secondary</Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                              <LucideLinkedin size={20} className="text-slate-600 dark:text-slate-400" />
                            </div>
                            <div>
                              <div className="font-medium">LinkedIn</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                Open to connection requests
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline">Secondary</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Professional Experience</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        <div className="relative pl-8 pb-8 border-l border-slate-200 dark:border-slate-800">
                          <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-purple-600"></div>
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                            <div>
                              <h3 className="text-lg font-medium">Senior Technical Recruiter</h3>
                              <div className="text-purple-600 dark:text-purple-400">TechCorp Inc.</div>
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">Jan 2022 - Present</div>
                          </div>
                          <div className="mt-2 text-slate-600 dark:text-slate-400">
                            <ul className="list-disc list-inside space-y-1">
                              <li>Lead technical recruitment for engineering and data science teams</li>
                              <li>Reduced time-to-hire by 35% through process optimization</li>
                              <li>Implemented diversity initiatives that increased diverse hires by 40%</li>
                              <li>Developed and maintained relationships with top tech universities</li>
                            </ul>
                          </div>
                        </div>

                        <div className="relative pl-8">
                          <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                            <div>
                              <h3 className="text-lg font-medium">Technical Recruiter</h3>
                              <div className="text-purple-600 dark:text-purple-400">InnovateTech</div>
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">Mar 2018 - Dec 2021</div>
                          </div>
                          <div className="mt-2 text-slate-600 dark:text-slate-400">
                            <ul className="list-disc list-inside space-y-1">
                              <li>Recruited software engineers and DevOps specialists</li>
                              <li>Conducted technical screenings and coordinated interview processes</li>
                              <li>Managed relationships with external recruiting agencies</li>
                              <li>Participated in tech conferences and recruitment events</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="company">
                  <Card>
                    <CardHeader>
                      <CardTitle>Company Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                            <svg
                              width="48"
                              height="48"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="text-purple-600"
                            >
                              <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" fill="currentColor" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">TechCorp Inc.</h3>
                            <p className="text-slate-600 dark:text-slate-400">Enterprise Software Solutions</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium">About the Company</h4>
                          <p className="text-slate-600 dark:text-slate-400">
                            TechCorp Inc. is a leading provider of enterprise software solutions, specializing in cloud
                            infrastructure, data analytics, and AI-powered applications. Founded in 2010, we've grown to
                            over 1,500 employees across offices in San Francisco, New York, London, and Singapore.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium">Company Culture</h4>
                          <p className="text-slate-600 dark:text-slate-400">
                            We foster a collaborative and innovative environment where creativity and problem-solving
                            are valued. Our culture emphasizes continuous learning, work-life balance, and diversity &
                            inclusion. We offer flexible work arrangements, comprehensive benefits, and career
                            development opportunities.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium">Current Hiring Needs</h4>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge>Senior Frontend Developer</Badge>
                            <Badge>Backend Engineer</Badge>
                            <Badge>DevOps Specialist</Badge>
                            <Badge>Data Scientist</Badge>
                            <Badge>Product Manager</Badge>
                            <Badge>UX Designer</Badge>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium">Benefits & Perks</h4>
                          <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1">
                            <li>Competitive salary and equity packages</li>
                            <li>Comprehensive health, dental, and vision insurance</li>
                            <li>401(k) with 4% company match</li>
                            <li>Unlimited PTO policy</li>
                            <li>Remote work flexibility</li>
                            <li>Professional development budget</li>
                            <li>Wellness programs and gym stipend</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">View Company Profile</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="stats">
                  <RecruiterStats />
                </TabsContent>

                <TabsContent value="activity">
                  <RecruiterActivity />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
