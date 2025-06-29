"use client"

import { useState, useEffect } from "react"
import { RecruiterSidebar } from "@/components/recruiter/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  LucideArrowRight,
  LucideBell,
  LucideCalendar,
  LucideCheck,
  LucideFilter,
  LucideMessageSquare,
  LucidePlus,
  LucideSearch,
  LucideStar,
  LucideTag,
  LucideUser,
  LucideUsers,
  LucideDollarSign,
  LucideHeart,
  LucideAlertCircle,
  LucideFileText,
  LucideChevronDown,
  LucideMoreVertical,
  LucideTrash2,
  LucideEdit,
  LucideDownload,
  LucideBarChart2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

// Types for our data
type Employee = {
  id: number
  name: string
  department: string
  case: string
  status: "In Progress" | "Under Review" | "Urgent" | "Resolved"
  avatar: string
  lastUpdated: string
  satisfactionScore?: number
}

type CaseType = {
  id: number
  title: string
  type: "Conflict" | "Harassment" | "Performance" | "Other"
  priority: "Low" | "Medium" | "High"
  assignedTo: string
  createdAt: string
  updatedAt: string
}

type Benefit = {
  id: number
  name: string
  type: "Health" | "Retirement" | "Wellness" | "Other"
  enrollment: number
  cost: number
  status: "Active" | "Pending" | "Expired"
}

// Sample data for demonstration
const initialEmployees: Employee[] = [
  {
    id: 1,
    name: "John Doe",
    department: "Engineering",
    case: "Performance Review",
    status: "In Progress",
    avatar: "JD",
    lastUpdated: "2023-06-15T10:30:00",
    satisfactionScore: 85,
  },
  {
    id: 2,
    name: "Alice Roberts",
    department: "Marketing",
    case: "Team Conflict",
    status: "Under Review",
    avatar: "AR",
    lastUpdated: "2023-06-14T14:15:00",
    satisfactionScore: 72,
  },
  {
    id: 3,
    name: "Tom Kelly",
    department: "Design",
    case: "Workplace Harassment",
    status: "Urgent",
    avatar: "TK",
    lastUpdated: "2023-06-15T09:00:00",
    satisfactionScore: 65,
  },
  {
    id: 4,
    name: "Sarah Johnson",
    department: "Sales",
    case: "Promotion Discussion",
    status: "Resolved",
    avatar: "SJ",
    lastUpdated: "2023-06-10T16:45:00",
    satisfactionScore: 94,
  },
]

const initialCases: CaseType[] = [
  {
    id: 1,
    title: "Team conflict resolution",
    type: "Conflict",
    priority: "High",
    assignedTo: "HR Manager",
    createdAt: "2023-06-01",
    updatedAt: "2023-06-15",
  },
  {
    id: 2,
    title: "Performance improvement plan",
    type: "Performance",
    priority: "Medium",
    assignedTo: "Department Head",
    createdAt: "2023-05-20",
    updatedAt: "2023-06-14",
  },
  {
    id: 3,
    title: "Harassment complaint",
    type: "Harassment",
    priority: "High",
    assignedTo: "HR Director",
    createdAt: "2023-06-10",
    updatedAt: "2023-06-15",
  },
]

const initialBenefits: Benefit[] = [
  {
    id: 1,
    name: "Health Insurance",
    type: "Health",
    enrollment: 85,
    cost: 500,
    status: "Active",
  },
  {
    id: 2,
    name: "401(k) Plan",
    type: "Retirement",
    enrollment: 75,
    cost: 200,
    status: "Active",
  },
  {
    id: 3,
    name: "Gym Membership",
    type: "Wellness",
    enrollment: 60,
    cost: 50,
    status: "Active",
  },
]

export default function EmployeeRelationsPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [cases, setCases] = useState<CaseType[]>(initialCases)
  const [benefits, setBenefits] = useState<Benefit[]>(initialBenefits)
  const [selectedTab, setSelectedTab] = useState("relations")
  const [isNewCaseDialogOpen, setIsNewCaseDialogOpen] = useState(false)
  const [isAddEmployeeDialogOpen, setIsAddEmployeeDialogOpen] = useState(false)
  const [newCaseData, setNewCaseData] = useState({
    title: "",
    type: "Conflict",
    priority: "Medium",
    assignedTo: "",
  })
  const [newEmployeeData, setNewEmployeeData] = useState({
    name: "",
    department: "",
    case: "",
  })
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Filter employees based on search query and active filters
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.case.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilters = activeFilters.length === 0 || 
      activeFilters.includes(employee.status)
    
    return matchesSearch && matchesFilters
  })

  // Sort employees based on selected sort option
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "department":
        return a.department.localeCompare(b.department)
      case "satisfaction":
        return (b.satisfactionScore || 0) - (a.satisfactionScore || 0)
      case "recent":
      default:
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    }
  })

  // Filter cases based on selected tab
  const filteredCases = cases.filter(caseItem => {
    if (selectedTab === "cases") return true
    return caseItem.priority === "High" // For urgent cases in relations tab
  })

  // Calculate metrics for dashboard
  const totalEmployees = employees.length
  const activeCases = employees.filter(e => e.status !== "Resolved").length
  const avgSatisfaction = Math.round(employees.reduce((sum, e) => sum + (e.satisfactionScore || 0), 0) / employees.length)
  const urgentCases = employees.filter(e => e.status === "Urgent").length

  const handleNewCase = () => {
    setIsNewCaseDialogOpen(true)
  }

  const handleAddEmployee = () => {
    setIsAddEmployeeDialogOpen(true)
  }

  const submitNewCase = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const newCase: CaseType = {
        id: cases.length + 1,
        title: newCaseData.title,
        type: newCaseData.type as any,
        priority: newCaseData.priority as any,
        assignedTo: newCaseData.assignedTo || "Unassigned",
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      }
      
      setCases([...cases, newCase])
      setNewCaseData({
        title: "",
        type: "Conflict",
        priority: "Medium",
        assignedTo: "",
      })
      setIsNewCaseDialogOpen(false)
      setIsLoading(false)
      
      toast({
        title: "New case created",
        description: `Case "${newCase.title}" has been successfully created.`,
      })
    }, 1000)
  }

  const submitNewEmployee = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const newEmployee: Employee = {
        id: employees.length + 1,
        name: newEmployeeData.name,
        department: newEmployeeData.department,
        case: newEmployeeData.case || "New Employee Onboarding",
        status: "In Progress",
        avatar: newEmployeeData.name.split(' ').map(n => n[0]).join(''),
        lastUpdated: new Date().toISOString(),
        satisfactionScore: Math.floor(Math.random() * 30) + 70, // Random score 70-100
      }
      
      setEmployees([...employees, newEmployee])
      setNewEmployeeData({
        name: "",
        department: "",
        case: "",
      })
      setIsAddEmployeeDialogOpen(false)
      setIsLoading(false)
      
      toast({
        title: "Employee added",
        description: `${newEmployee.name} has been successfully added to the system.`,
      })
    }, 1000)
  }

  const handleMessage = (employeeId: number) => {
    const employee = employees.find(e => e.id === employeeId)
    toast({
      title: "Messaging initiated",
      description: `Opening message thread with ${employee?.name}.`,
      })
  }

  const handleViewDocuments = (employeeId: number) => {
    const employee = employees.find(e => e.id === employeeId)
    toast({
      title: "Documents accessed",
      description: `Viewing documents for ${employee?.name}.`,
    })
  }

  const handleResolveCase = (employeeId: number) => {
    setEmployees(employees.map(e => 
      e.id === employeeId ? {...e, status: "Resolved"} : e
    ))
    toast({
      title: "Case resolved",
      description: "The case has been marked as resolved.",
    })
  }

  const handleDeleteCase = (caseId: number) => {
    setCases(cases.filter(c => c.id !== caseId))
    toast({
      title: "Case deleted",
      description: "The case has been removed from the system.",
    })
  }

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  const downloadReport = () => {
    toast({
      title: "Report generated",
      description: "Employee relations report is being downloaded.",
      action: (
        <ToastAction altText="Dismiss">Dismiss</ToastAction>
      ),
    })
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <RecruiterSidebar />

      <main className="md:pl-64 pt-16 md:pt-0">
        <div className="container mx-auto p-6">
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Employee Relations</h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Manage workplace relations, conflicts, and employee benefits
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2" onClick={handleNewCase}>
                  <LucidePlus size={16} />
                  <span>New Case</span>
                </Button>
                <Button className="gap-2" onClick={handleAddEmployee}>
                  <LucidePlus size={16} />
                  <span>Add Employee</span>
                </Button>
              </div>
            </div>
          </header>

          {/* Quick Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Employees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalEmployees}</div>
                <div className="flex items-center text-sm text-green-600 dark:text-green-400 mt-1">
                  <LucideArrowRight className="h-4 w-4" />
                  <span>+12% from last quarter</span>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Active Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeCases}</div>
                <div className="flex items-center text-sm text-amber-600 dark:text-amber-400 mt-1">
                  <LucideAlertCircle className="h-4 w-4" />
                  <span>{urgentCases} urgent</span>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Avg Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgSatisfaction}%</div>
                <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 mt-1">
                  <LucideStar className="h-4 w-4" />
                  <span>4.2/5 rating</span>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Benefits Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <div className="flex items-center text-sm text-purple-600 dark:text-purple-400 mt-1">
                  <LucideHeart className="h-4 w-4" />
                  <span>+5% enrollment</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <LucideSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
                <Input
                  type="search"
                  placeholder="Search employees, departments, or cases..."
                  className="w-full bg-white dark:bg-slate-900 pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="flex gap-1">
                  <Button 
                    variant={activeFilters.includes("Urgent") ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => toggleFilter("Urgent")}
                  >
                    Urgent
                  </Button>
                  <Button 
                    variant={activeFilters.includes("Under Review") ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => toggleFilter("Under Review")}
                  >
                    Review
                  </Button>
                  <Button 
                    variant={activeFilters.includes("In Progress") ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => toggleFilter("In Progress")}
                  >
                    In Progress
                  </Button>
                </div>
                <Select 
                  value={sortBy}
                  onValueChange={setSortBy}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Recently Updated</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="department">Department</SelectItem>
                    <SelectItem value="satisfaction">Satisfaction</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Tabs defaultValue="relations" value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="relations">Employee Relations</TabsTrigger>
              <TabsTrigger value="payroll">Payroll & Benefits</TabsTrigger>
              <TabsTrigger value="cases">Active Cases</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="relations">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle>Recent Activities</CardTitle>
                        <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400">
                          View All
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {filteredCases.slice(0, 3).map((caseItem) => (
                          <div key={caseItem.id} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                            <div className={`${
                              caseItem.priority === "High" 
                                ? "bg-red-100 dark:bg-red-900/30" 
                                : caseItem.priority === "Medium"
                                ? "bg-amber-100 dark:bg-amber-900/30"
                                : "bg-blue-100 dark:bg-blue-900/30"
                            } p-2 rounded-full`}>
                              {caseItem.priority === "High" ? (
                                <LucideAlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                              ) : caseItem.priority === "Medium" ? (
                                <LucideTag className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                              ) : (
                                <LucideFileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{caseItem.title}</span>
                                <Badge variant="outline" className="text-xs">
                                  {caseItem.type}
                                </Badge>
                                <span className="text-xs text-slate-500 dark:text-slate-400 ml-auto">
                                  {caseItem.updatedAt}
                                </span>
                              </div>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                Assigned to: {caseItem.assignedTo}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle>Employee Cases</CardTitle>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400">
                            View All
                          </Button>
                          <Button variant="ghost" size="sm" onClick={downloadReport}>
                            <LucideDownload className="h-4 w-4 mr-1" />
                            Export
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {sortedEmployees.slice(0, 5).map((employee) => (
                          <div
                            key={employee.id}
                            className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 hover:shadow-sm transition-shadow"
                          >
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={`/avatars/${employee.id}.jpg`} alt={employee.name} />
                                <AvatarFallback>{employee.avatar}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{employee.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                  <span>{employee.department}</span>
                                  <span>•</span>
                                  <span>{employee.case}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge
                                className={`${
                                  employee.status === "In Progress"
                                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                                    : employee.status === "Under Review"
                                    ? "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300"
                                    : employee.status === "Urgent"
                                    ? "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                                    : "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                                }`}
                                variant="outline"
                              >
                                {employee.status}
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <LucideMoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleMessage(employee.id)}>
                                    <LucideMessageSquare className="h-4 w-4 mr-2" />
                                    Message
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleViewDocuments(employee.id)}>
                                    <LucideFileText className="h-4 w-4 mr-2" />
                                    Documents
                                  </DropdownMenuItem>
                                  {employee.status !== "Resolved" && (
                                    <DropdownMenuItem onClick={() => handleResolveCase(employee.id)}>
                                      <LucideCheck className="h-4 w-4 mr-2" />
                                      Mark Resolved
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle>Employee Satisfaction</CardTitle>
                        <Badge variant="secondary" className="ml-2">
                          {avgSatisfaction}%
                        </Badge>
                      </div>
                      <CardDescription>Overall employee satisfaction score</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Work Environment</span>
                            <span className="font-medium">95%</span>
                          </div>
                          <Progress value={95} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Team Collaboration</span>
                            <span className="font-medium">88%</span>
                          </div>
                          <Progress value={88} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Management Support</span>
                            <span className="font-medium">90%</span>
                          </div>
                          <Progress value={90} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Growth Opportunities</span>
                            <span className="font-medium">82%</span>
                          </div>
                          <Progress value={82} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="outline" className="w-full">
                        View Detailed Survey Results
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Upcoming Events</CardTitle>
                      <CardDescription>Scheduled meetings and reviews</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                          <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                            <LucideCalendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Quarterly Review</span>
                              <span className="text-xs text-slate-500 dark:text-slate-400">Jun 20, 10:00 AM</span>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              All department heads required
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                          <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                            <LucideUsers className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Team Building</span>
                              <span className="text-xs text-slate-500 dark:text-slate-400">Jun 22, 2:00 PM</span>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Outdoor activities planned
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="payroll">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle>Payroll Overview</CardTitle>
                        <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400">
                          View Detailed Report
                        </Button>
                      </div>
                      <CardDescription>Current payroll status and metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium">Total Payroll</h3>
                            <Badge className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300">
                              $245,000
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Base Salaries</span>
                              <span className="font-medium">$210,000</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Bonuses</span>
                              <span className="font-medium">$25,000</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Benefits</span>
                              <span className="font-medium">$10,000</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium">Payroll Distribution</h3>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between mb-1 text-sm">
                                <span>Engineering</span>
                                <span className="font-medium">$120,000</span>
                              </div>
                              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full">
                                <div className="h-2 bg-blue-600 rounded-full" style={{ width: "55%" }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1 text-sm">
                                <span>Marketing</span>
                                <span className="font-medium">$60,000</span>
                              </div>
                              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full">
                                <div className="h-2 bg-blue-600 rounded-full" style={{ width: "27%" }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1 text-sm">
                                <span>Design</span>
                                <span className="font-medium">$40,000</span>
                              </div>
                              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full">
                                <div className="h-2 bg-blue-600 rounded-full" style={{ width: "18%" }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle>Employee Benefits</CardTitle>
                        <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400">
                          Manage Benefits
                        </Button>
                      </div>
                      <CardDescription>Current benefits enrollment</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {benefits.map((benefit) => (
                          <div
                            key={benefit.id}
                            className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-full ${
                                benefit.type === "Health" 
                                  ? "bg-red-100 dark:bg-red-900/30" 
                                  : benefit.type === "Retirement"
                                  ? "bg-blue-100 dark:bg-blue-900/30"
                                  : "bg-green-100 dark:bg-green-900/30"
                              }`}>
                                {benefit.type === "Health" ? (
                                  <LucideHeart className="h-4 w-4 text-red-600 dark:text-red-400" />
                                ) : benefit.type === "Retirement" ? (
                                  <LucideDollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                ) : (
                                  <LucideStar className="h-4 w-4 text-green-600 dark:text-green-400" />
                                )}
                              </div>
                              <div>
                                <h3 className="font-medium">{benefit.name}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                  {benefit.type} • ${benefit.cost}/employee
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <div className="font-medium">{benefit.enrollment}%</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Enrollment</div>
                              </div>
                              <Badge
                                className={`${
                                  benefit.status === "Active"
                                    ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                                    : "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300"
                                }`}
                                variant="outline"
                              >
                                {benefit.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Payroll Calendar</CardTitle>
                      <CardDescription>Upcoming payroll dates</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                            <LucideCalendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Next Payroll Run</span>
                              <span className="text-xs text-slate-500 dark:text-slate-400">Jun 30, 2023</span>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Processing for all employees
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                          <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                            <LucideDollarSign className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Bonus Payments</span>
                              <span className="text-xs text-slate-500 dark:text-slate-400">Jul 15, 2023</span>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Q2 performance bonuses
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Tax Documents</CardTitle>
                      <CardDescription>Important tax forms and filings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg cursor-pointer">
                          <div className="flex items-center gap-3">
                            <LucideFileText className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                            <span className="text-sm">W-2 Forms (2022)</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            Download
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg cursor-pointer">
                          <div className="flex items-center gap-3">
                            <LucideFileText className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                            <span className="text-sm">1095-C Forms (2022)</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            Download
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg cursor-pointer">
                          <div className="flex items-center gap-3">
                            <LucideFileText className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                            <span className="text-sm">941 Form (Q2 2023)</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cases">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle>Active Cases</CardTitle>
                        <Badge className="ml-2">{cases.length}</Badge>
                      </div>
                      <CardDescription>Current workplace relations cases</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {cases.map((caseItem) => (
                          <div
                            key={caseItem.id}
                            className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 hover:shadow-sm transition-shadow"
                          >
                            <div className="flex items-center gap-3 mb-3 md:mb-0">
                              <div className={`p-2 rounded-full ${
                                caseItem.priority === "High" 
                                  ? "bg-red-100 dark:bg-red-900/30" 
                                  : caseItem.priority === "Medium"
                                  ? "bg-amber-100 dark:bg-amber-900/30"
                                  : "bg-blue-100 dark:bg-blue-900/30"
                              }`}>
                                {caseItem.priority === "High" ? (
                                  <LucideAlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                                ) : caseItem.priority === "Medium" ? (
                                  <LucideTag className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                ) : (
                                  <LucideFileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                )}
                              </div>
                              <div>
                                <h3 className="font-medium">{caseItem.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                  <span>{caseItem.type}</span>
                                  <span>•</span>
                                  <span>Assigned to {caseItem.assignedTo}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                              <div className="text-right md:text-left">
                                <div className="text-sm font-medium">{caseItem.updatedAt}</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Last updated</div>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <LucideMoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <LucideEdit className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <LucideFileText className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="text-red-600 dark:text-red-400"
                                    onClick={() => handleDeleteCase(caseItem.id)}
                                  >
                                    <LucideTrash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="outline" className="w-full" onClick={handleNewCase}>
                        <LucidePlus className="h-4 w-4 mr-2" />
                        Add New Case
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Case Statistics</CardTitle>
                      <CardDescription>Distribution and status</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium mb-2">By Priority</h3>
                          <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full">
                            <div 
                              className="h-2.5 rounded-full flex" 
                              style={{ width: "100%" }}
                            >
                              <div className="bg-red-600" style={{ width: "30%" }}></div>
                              <div className="bg-amber-600" style={{ width: "50%" }}></div>
                              <div className="bg-blue-600" style={{ width: "20%" }}></div>
                            </div>
                          </div>
                          <div className="flex justify-between mt-2 text-xs">
                            <span className="flex items-center">
                              <span className="w-2 h-2 bg-red-600 rounded-full mr-1"></span>
                              High (30%)
                            </span>
                            <span className="flex items-center">
                              <span className="w-2 h-2 bg-amber-600 rounded-full mr-1"></span>
                              Medium (50%)
                            </span>
                            <span className="flex items-center">
                              <span className="w-2 h-2 bg-blue-600 rounded-full mr-1"></span>
                              Low (20%)
                            </span>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-2">By Type</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                              <div className="text-2xl font-bold mb-1">12</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">Conflicts</div>
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                              <div className="text-2xl font-bold mb-1">8</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">Performance</div>
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                              <div className="text-2xl font-bold mb-1">5</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">Harassment</div>
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                              <div className="text-2xl font-bold mb-1">3</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">Other</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>Common case management tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="h-24 flex-col gap-2">
                          <LucideUser className="h-5 w-5" />
                          <span>Assign Case</span>
                        </Button>
                        <Button variant="outline" className="h-24 flex-col gap-2">
                          <LucideCalendar className="h-5 w-5" />
                          <span>Schedule Review</span>
                        </Button>
                        <Button variant="outline" className="h-24 flex-col gap-2">
                          <LucideMessageSquare className="h-5 w-5" />
                          <span>Send Update</span>
                        </Button>
                        <Button variant="outline" className="h-24 flex-col gap-2">
                          <LucideCheck className="h-5 w-5" />
                          <span>Resolve Case</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reports">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle>Employee Relations Analytics</CardTitle>
                        <div className="flex items-center gap-2">
                          <Select defaultValue="quarterly">
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="quarterly">Quarterly</SelectItem>
                              <SelectItem value="yearly">Yearly</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button variant="outline" onClick={downloadReport}>
                            <LucideDownload className="h-4 w-4 mr-2" />
                            Export
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                        <div className="text-center p-6">
                          <LucideBarChart2 className="h-8 w-8 mx-auto text-slate-400 dark:text-slate-500 mb-2" />
                          <h3 className="font-medium">Analytics Dashboard</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Visualization of employee relations metrics over time
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle>Case Resolution Metrics</CardTitle>
                        <Badge variant="secondary">Q2 2023</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                          <div className="text-2xl font-bold mb-1">85%</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">Resolution Rate</div>
                          <div className="flex items-center text-xs text-green-600 dark:text-green-400 mt-2">
                            <LucideArrowRight className="h-3 w-3" />
                            <span>+5% from Q1</span>
                          </div>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                          <div className="text-2xl font-bold mb-1">7.2d</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">Avg Resolution Time</div>
                          <div className="flex items-center text-xs text-red-600 dark:text-red-400 mt-2">
                            <LucideArrowRight className="h-3 w-3" />
                            <span>+0.5d from Q1</span>
                          </div>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                          <div className="text-2xl font-bold mb-1">92%</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">Employee Satisfaction</div>
                          <div className="flex items-center text-xs text-green-600 dark:text-green-400 mt-2">
                            <LucideArrowRight className="h-3 w-3" />
                            <span>+3% from Q1</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Generate Reports</CardTitle>
                      <CardDescription>Custom report templates</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          Employee Satisfaction
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          Case Resolution Summary
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          Department Comparison
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          Benefits Utilization
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          Custom Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Recent Reports</CardTitle>
                      <CardDescription>Previously generated reports</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg cursor-pointer">
                          <div className="flex items-center gap-3">
                            <LucideFileText className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                            <div>
                              <div className="text-sm">Q2 Employee Relations</div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">Jun 15, 2023</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <LucideDownload className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg cursor-pointer">
                          <div className="flex items-center gap-3">
                            <LucideFileText className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                            <div>
                              <div className="text-sm">Benefits Enrollment</div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">Jun 10, 2023</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <LucideDownload className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg cursor-pointer">
                          <div className="flex items-center gap-3">
                            <LucideFileText className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                            <div>
                              <div className="text-sm">Conflict Resolution</div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">May 28, 2023</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <LucideDownload className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* New Case Dialog */}
      {isNewCaseDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Create New Case</CardTitle>
              <CardDescription>Fill in the details for the new employee relations case</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Case Title</label>
                <Input 
                  placeholder="Enter case title" 
                  value={newCaseData.title}
                  onChange={(e) => setNewCaseData({...newCaseData, title: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Case Type</label>
                  <Select 
                    value={newCaseData.type}
                    onValueChange={(value) => setNewCaseData({...newCaseData, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Conflict">Conflict</SelectItem>
                      <SelectItem value="Harassment">Harassment</SelectItem>
                      <SelectItem value="Performance">Performance</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <Select 
                    value={newCaseData.priority}
                    onValueChange={(value) => setNewCaseData({...newCaseData, priority: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Assigned To</label>
                <Input 
                  placeholder="Enter assignee name" 
                  value={newCaseData.assignedTo}
                  onChange={(e) => setNewCaseData({...newCaseData, assignedTo: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea placeholder="Enter case details" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsNewCaseDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={submitNewCase} disabled={isLoading || !newCaseData.title}>
                {isLoading ? "Creating..." : "Create Case"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Add Employee Dialog */}
      {isAddEmployeeDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Add New Employee</CardTitle>
              <CardDescription>Enter the employee details to add to the system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input 
                  placeholder="Enter employee name" 
                  value={newEmployeeData.name}
                  onChange={(e) => setNewEmployeeData({...newEmployeeData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Input 
                  placeholder="Enter department" 
                  value={newEmployeeData.department}
                  onChange={(e) => setNewEmployeeData({...newEmployeeData, department: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Initial Case (Optional)</label>
                <Input 
                  placeholder="Enter case description" 
                  value={newEmployeeData.case}
                  onChange={(e) => setNewEmployeeData({...newEmployeeData, case: e.target.value})}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddEmployeeDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={submitNewEmployee} disabled={isLoading || !newEmployeeData.name || !newEmployeeData.department}>
                {isLoading ? "Adding..." : "Add Employee"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}