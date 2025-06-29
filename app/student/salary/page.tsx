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
  LucideBarChart,
  LucideBriefcase,
  LucideBuilding,
  LucideCheck,
  LucideDollarSign,
  LucideFilter,
  LucideInfo,
  LucideMapPin,
  LucideSearch,
  LucideSliders,
} from "lucide-react"
import { SalaryChart } from "@/components/student/salary-chart"
import { SalaryComparison } from "@/components/student/salary-comparison"

export default function SalaryNavigator() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <StudentSidebar />

      <main className="md:pl-64 pt-16 md:pt-0">
        <div className="container mx-auto p-6">
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Salary Navigator</h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Research market rates and negotiate with confidence
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2">
                  <LucideFilter size={16} />
                  <span>Filter</span>
                </Button>
                <Button className="gap-2">
                  <LucideBarChart size={16} />
                  <span>Generate Report</span>
                </Button>
              </div>
            </div>
          </header>

          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <LucideBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
                <Input
                  type="text"
                  placeholder="Job title or role..."
                  className="pl-9 bg-white dark:bg-slate-900"
                  defaultValue="Full-Stack Developer"
                />
              </div>
              <div className="relative w-full md:w-64">
                <LucideMapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
                <Input
                  type="text"
                  placeholder="Location..."
                  className="pl-9 bg-white dark:bg-slate-900"
                  defaultValue="San Francisco, CA"
                />
              </div>
              <Button className="gap-2">
                <LucideSearch size={16} />
                <span>Search</span>
              </Button>
            </div>

            <Alert className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
              <LucideAlertCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <AlertDescription className="text-purple-700 dark:text-purple-400">
                Based on your skills and experience, you're positioned in the top 25% of the salary range for Full-Stack
                Developers in San Francisco.
              </AlertDescription>
            </Alert>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Average Salary</CardTitle>
                <CardDescription>Full-Stack Developer in SF</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">$125,000</div>
                <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                  <LucideInfo size={14} />
                  <span>Based on 1,245 data points</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Salary Range</CardTitle>
                <CardDescription>10th - 90th percentile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">$95K - $160K</div>
                <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                  <LucideSliders size={14} />
                  <span>Experience: 3-5 years</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Your Market Value</CardTitle>
                <CardDescription>Based on your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">$135,000</div>
                <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                  <LucideArrowRight size={14} className="rotate-45" />
                  <span>Top 25% of market</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Negotiation Power</CardTitle>
                <CardDescription>Your position</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">Strong</div>
                <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                  <LucideCheck size={14} />
                  <span>In-demand skills</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Salary Trends</CardTitle>
                <CardDescription>Full-Stack Developer salaries over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <SalaryChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skill Premium</CardTitle>
                <CardDescription>Salary impact of specific skills</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <SalaryComparison />
              </CardContent>
            </Card>
          </div>

          <div className="mb-8">
            <Tabs defaultValue="companies">
              <TabsList className="mb-4">
                <TabsTrigger value="companies">Top Paying Companies</TabsTrigger>
                <TabsTrigger value="benefits">Benefits Comparison</TabsTrigger>
                <TabsTrigger value="negotiation">Negotiation Tips</TabsTrigger>
              </TabsList>

              <TabsContent value="companies">
                <div className="space-y-4">
                  {[
                    {
                      name: "TechGiant Inc.",
                      role: "Senior Full-Stack Developer",
                      salary: "$150,000 - $180,000",
                      location: "San Francisco, CA",
                      benefits: ["Remote work", "Unlimited PTO", "401(k) match"],
                    },
                    {
                      name: "StartupX",
                      role: "Full-Stack Engineer",
                      salary: "$130,000 - $160,000",
                      location: "San Francisco, CA",
                      benefits: ["Equity options", "Flexible hours", "Health insurance"],
                    },
                    {
                      name: "InnovateTech",
                      role: "Full-Stack Developer",
                      salary: "$125,000 - $155,000",
                      location: "San Francisco, CA (Remote)",
                      benefits: ["4-day workweek", "Professional development", "Wellness program"],
                    },
                    {
                      name: "DataCorp",
                      role: "Full-Stack Developer",
                      salary: "$120,000 - $150,000",
                      location: "San Francisco, CA (Hybrid)",
                      benefits: ["Annual bonus", "Stock options", "Paid parental leave"],
                    },
                  ].map((company, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg mt-0.5">
                              <LucideBuilding size={20} className="text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{company.name}</CardTitle>
                              <CardDescription>{company.role}</CardDescription>
                            </div>
                          </div>
                          <Badge className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                            Top Paying
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                              <LucideMapPin size={14} />
                              <span>{company.location}</span>
                            </div>
                            <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                              <LucideDollarSign size={14} />
                              <span>{company.salary}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {company.benefits.map((benefit, i) => (
                              <Badge key={i} variant="outline">
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="flex gap-3 w-full">
                          <Button className="flex-1">View Jobs</Button>
                          <Button variant="outline" className="flex-1">
                            Company Profile
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="benefits">
                <Card>
                  <CardHeader>
                    <CardTitle>Benefits Comparison</CardTitle>
                    <CardDescription>Beyond the base salary</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-700">
                            <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">Company</th>
                            <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">
                              Health Insurance
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">
                              Retirement
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">PTO</th>
                            <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">
                              Remote Work
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">
                              Stock Options
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-200 dark:border-slate-700">
                            <td className="py-3 px-4 font-medium">TechGiant Inc.</td>
                            <td className="py-3 px-4">
                              <Badge className="bg-green-50 text-green-700 border-green-200">Excellent</Badge>
                            </td>
                            <td className="py-3 px-4">6% 401(k) match</td>
                            <td className="py-3 px-4">Unlimited</td>
                            <td className="py-3 px-4">Full remote</td>
                            <td className="py-3 px-4">RSUs</td>
                          </tr>
                          <tr className="border-b border-slate-200 dark:border-slate-700">
                            <td className="py-3 px-4 font-medium">StartupX</td>
                            <td className="py-3 px-4">
                              <Badge className="bg-green-50 text-green-700 border-green-200">Good</Badge>
                            </td>
                            <td className="py-3 px-4">4% 401(k) match</td>
                            <td className="py-3 px-4">25 days</td>
                            <td className="py-3 px-4">Hybrid</td>
                            <td className="py-3 px-4">Equity options</td>
                          </tr>
                          <tr className="border-b border-slate-200 dark:border-slate-700">
                            <td className="py-3 px-4 font-medium">InnovateTech</td>
                            <td className="py-3 px-4">
                              <Badge className="bg-amber-50 text-amber-700 border-amber-200">Average</Badge>
                            </td>
                            <td className="py-3 px-4">3% 401(k) match</td>
                            <td className="py-3 px-4">20 days</td>
                            <td className="py-3 px-4">4-day workweek</td>
                            <td className="py-3 px-4">Profit sharing</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 font-medium">DataCorp</td>
                            <td className="py-3 px-4">
                              <Badge className="bg-green-50 text-green-700 border-green-200">Good</Badge>
                            </td>
                            <td className="py-3 px-4">5% 401(k) match</td>
                            <td className="py-3 px-4">15 days + 10 holidays</td>
                            <td className="py-3 px-4">Hybrid</td>
                            <td className="py-3 px-4">Stock options</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Full Benefits Comparison
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="negotiation">
                <Card>
                  <CardHeader>
                    <CardTitle>Salary Negotiation Tips</CardTitle>
                    <CardDescription>Maximize your compensation package</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="font-medium text-lg">Research Market Rates</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                          Before entering negotiations, research salary ranges for your role, experience level, and
                          location. Use data from multiple sources including industry reports, job boards, and
                          professional networks.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium text-lg">Highlight Your Value</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                          Quantify your achievements and contributions. Explain how your skills and experience will
                          benefit the company and justify a higher salary.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium text-lg">Consider the Total Package</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                          Salary is just one component of compensation. Consider benefits, bonuses, equity, flexible
                          work arrangements, and professional development opportunities.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium text-lg">Practice Your Delivery</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                          Rehearse your negotiation conversation. Be confident, professional, and prepared to explain
                          your reasoning. Use our AI Interview Simulator to practice negotiation scenarios.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium text-lg">Be Patient</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                          Don't rush to accept the first offer. Take time to consider it, and don't be afraid to
                          counter. Most employers expect negotiation and build that into their initial offers.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Practice with AI Negotiation Simulator</Button>
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
