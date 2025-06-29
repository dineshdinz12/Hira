import { RecruiterSidebar } from "@/components/recruiter/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  LucideAlertCircle,
  LucideArrowRight,
  LucideBarChart,
  LucideCheck,
  LucideDownload,
  LucideInfo,
  LucidePieChart,
  LucideUsers,
} from "lucide-react"
import { DiversityChart } from "@/components/recruiter/diversity-chart"
import { DiversityTrends } from "@/components/recruiter/diversity-trends"
import { DiversityByDepartment } from "@/components/recruiter/diversity-by-department"

export default function DiversityAnalytics() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <RecruiterSidebar />

      <main className="md:pl-64 pt-16 md:pt-0">
        <div className="container mx-auto p-6">
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Diversity Analytics</h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Track and improve diversity metrics across your organization
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2">
                  <LucideDownload size={16} />
                  <span>Export Report</span>
                </Button>
                <Button className="gap-2">
                  <LucideBarChart size={16} />
                  <span>Set Goals</span>
                </Button>
              </div>
            </div>
          </header>

          <div className="mb-8">
            <Alert className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
              <LucideAlertCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <AlertDescription className="text-purple-700 dark:text-purple-400">
                Your organization has improved gender diversity by 12% and ethnic diversity by 8% over the past year.
                You're on track to meet your annual diversity goals.
              </AlertDescription>
            </Alert>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Gender Diversity</CardTitle>
                <CardDescription>Current workforce</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">42% Women</div>
                <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                  <LucideArrowRight size={14} className="rotate-45" />
                  <span>+5% from last year</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Ethnic Diversity</CardTitle>
                <CardDescription>Underrepresented groups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">38%</div>
                <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                  <LucideArrowRight size={14} className="rotate-45" />
                  <span>+3% from last year</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Leadership Diversity</CardTitle>
                <CardDescription>Director level and above</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">31%</div>
                <div className="flex items-center gap-1 text-sm text-amber-600 dark:text-amber-400">
                  <LucideInfo size={14} />
                  <span>Below target (35%)</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Inclusion Score</CardTitle>
                <CardDescription>Employee survey results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">8.4/10</div>
                <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                  <LucideCheck size={14} />
                  <span>Above industry average</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Team Composition</CardTitle>
                <CardDescription>Current diversity breakdown</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <DiversityChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Diversity Trends</CardTitle>
                <CardDescription>Year-over-year changes</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <DiversityTrends />
              </CardContent>
            </Card>
          </div>

          <div className="mb-8">
            <Tabs defaultValue="department">
              <TabsList className="mb-4">
                <TabsTrigger value="department">By Department</TabsTrigger>
                <TabsTrigger value="hiring">Hiring Funnel</TabsTrigger>
                <TabsTrigger value="initiatives">Initiatives</TabsTrigger>
              </TabsList>

              <TabsContent value="department">
                <Card>
                  <CardHeader>
                    <CardTitle>Diversity by Department</CardTitle>
                    <CardDescription>Breakdown across different teams</CardDescription>
                  </CardHeader>
                  <CardContent className="h-96">
                    <DiversityByDepartment />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="hiring">
                <Card>
                  <CardHeader>
                    <CardTitle>Hiring Funnel Analysis</CardTitle>
                    <CardDescription>Diversity metrics at each stage of recruitment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Application Stage</h3>
                          <Badge variant="outline">45% Diverse Candidates</Badge>
                        </div>
                        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <LucideUsers size={18} className="text-purple-600" />
                              <span>Total Applications: 1,245</span>
                            </div>
                            <div className="flex gap-2">
                              <Badge className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                                Women: 42%
                              </Badge>
                              <Badge className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                                URM: 38%
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Phone Screen Stage</h3>
                          <Badge variant="outline">43% Diverse Candidates</Badge>
                        </div>
                        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <LucideUsers size={18} className="text-purple-600" />
                              <span>Candidates Screened: 320</span>
                            </div>
                            <div className="flex gap-2">
                              <Badge className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                                Women: 40%
                              </Badge>
                              <Badge className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                                URM: 36%
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Technical Assessment Stage</h3>
                          <Badge
                            variant="outline"
                            className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                          >
                            38% Diverse Candidates
                          </Badge>
                        </div>
                        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <LucideUsers size={18} className="text-purple-600" />
                              <span>Assessments Completed: 180</span>
                            </div>
                            <div className="flex gap-2">
                              <Badge className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                                Women: 35%
                              </Badge>
                              <Badge className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                                URM: 32%
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Interview Stage</h3>
                          <Badge
                            variant="outline"
                            className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                          >
                            36% Diverse Candidates
                          </Badge>
                        </div>
                        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <LucideUsers size={18} className="text-purple-600" />
                              <span>Candidates Interviewed: 85</span>
                            </div>
                            <div className="flex gap-2">
                              <Badge className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                                Women: 34%
                              </Badge>
                              <Badge className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                                URM: 30%
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Offer Stage</h3>
                          <Badge
                            variant="outline"
                            className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                          >
                            42% Diverse Candidates
                          </Badge>
                        </div>
                        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <LucideUsers size={18} className="text-purple-600" />
                              <span>Offers Extended: 25</span>
                            </div>
                            <div className="flex gap-2">
                              <Badge className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                                Women: 40%
                              </Badge>
                              <Badge className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                                URM: 36%
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="space-y-2 w-full">
                      <Alert className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                        <LucideInfo className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        <AlertDescription className="text-amber-700 dark:text-amber-400">
                          There's a 9% drop in diversity from application to interview stage. Consider implementing
                          blind resume reviews and structured interviews to reduce potential bias.
                        </AlertDescription>
                      </Alert>
                      <Button variant="outline" className="w-full">
                        View Detailed Funnel Analysis
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="initiatives">
                <Card>
                  <CardHeader>
                    <CardTitle>Diversity & Inclusion Initiatives</CardTitle>
                    <CardDescription>Current programs and their impact</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="border rounded-lg p-4 bg-white dark:bg-slate-900">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                          <div>
                            <h3 className="text-lg font-medium">Blind Resume Review Process</h3>
                            <p className="text-sm text-purple-600 dark:text-purple-400">Implemented Q1 2025</p>
                          </div>
                          <Badge className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                            High Impact
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                          Implemented a blind resume review process that removes names, photos, and other potentially
                          biasing information from resumes during initial screening.
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Impact on Gender Diversity</span>
                            <span className="font-medium">+8%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Impact on Ethnic Diversity</span>
                            <span className="font-medium">+6%</span>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4 bg-white dark:bg-slate-900">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                          <div>
                            <h3 className="text-lg font-medium">Structured Interview Training</h3>
                            <p className="text-sm text-purple-600 dark:text-purple-400">Implemented Q2 2025</p>
                          </div>
                          <Badge className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                            High Impact
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                          Trained all interviewers on structured interview techniques to ensure consistent evaluation
                          criteria and reduce unconscious bias.
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Impact on Gender Diversity</span>
                            <span className="font-medium">+5%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Impact on Ethnic Diversity</span>
                            <span className="font-medium">+7%</span>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4 bg-white dark:bg-slate-900">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                          <div>
                            <h3 className="text-lg font-medium">Diverse Sourcing Partnerships</h3>
                            <p className="text-sm text-purple-600 dark:text-purple-400">Implemented Q3 2025</p>
                          </div>
                          <Badge className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800">
                            Medium Impact
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                          Established partnerships with organizations focused on underrepresented groups in tech to
                          expand our candidate pipeline.
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Impact on Gender Diversity</span>
                            <span className="font-medium">+4%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Impact on Ethnic Diversity</span>
                            <span className="font-medium">+5%</span>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4 bg-white dark:bg-slate-900">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                          <div>
                            <h3 className="text-lg font-medium">Inclusive Leadership Training</h3>
                            <p className="text-sm text-purple-600 dark:text-purple-400">Implemented Q4 2025</p>
                          </div>
                          <Badge className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800">
                            Medium Impact
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                          Provided training for all managers and leaders on inclusive leadership practices and creating
                          a sense of belonging for diverse team members.
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Impact on Retention</span>
                            <span className="font-medium">+12%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Impact on Inclusion Score</span>
                            <span className="font-medium">+0.8 points</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full gap-2">
                      <LucidePieChart size={16} />
                      <span>View Initiative Impact Analysis</span>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
