"use client"

import { useState, useEffect } from "react"
import { RecruiterSidebar } from "@/components/recruiter/sidebar"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  LucideCalendar, 
  LucideClock,
  LucideUser,
  LucideSearch,
  LucideFilter,
  LucidePlus,
  LucideBell,
  LucideMoreVertical,
  LucideCheck,
  LucideX,
  LucideChevronLeft,
  LucideChevronRight,
  LucideArrowUpDown,
  LucideMessageCircle,
  LucideFileText,
  LucideUsers,
  LucideBuilding
} from "lucide-react"
import { format, addDays, subDays, isSameDay } from 'date-fns'

// Mock data for simulation
const MOCK_CANDIDATES = [
  { 
    id: 1, 
    name: "John Doe", 
    position: "Frontend Developer", 
    status: "Screening", 
    department: "Engineering",
    email: "john.doe@example.com",
    phone: "555-123-4567",
    avatar: "/api/placeholder/32/32",
    appliedDate: "2025-04-22"
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    position: "Product Manager", 
    status: "Technical Interview", 
    department: "Product",
    email: "jane.smith@example.com",
    phone: "555-987-6543",
    avatar: "/api/placeholder/32/32",
    appliedDate: "2025-04-25"
  },
  { 
    id: 3, 
    name: "Robert Johnson", 
    position: "UX Designer", 
    status: "HR Interview", 
    department: "Design",
    email: "robert.j@example.com",
    phone: "555-456-7890",
    avatar: "/api/placeholder/32/32",
    appliedDate: "2025-04-28"
  },
  { 
    id: 4, 
    name: "Emily Chen", 
    position: "Backend Developer", 
    status: "Final Interview", 
    department: "Engineering",
    email: "emily.chen@example.com",
    phone: "555-789-1234",
    avatar: "/api/placeholder/32/32",
    appliedDate: "2025-04-30"
  },
  { 
    id: 5, 
    name: "Michael Brown", 
    position: "Data Scientist", 
    status: "Offer", 
    department: "Data",
    email: "michael.b@example.com",
    phone: "555-234-5678",
    avatar: "/api/placeholder/32/32",
    appliedDate: "2025-05-01"
  }
]

const MOCK_DEPARTMENTS = [
  "All Departments", "Engineering", "Product", "Design", "Marketing", "Sales", "Data", "HR", "Finance"
]

const MOCK_INTERVIEWERS = [
  { id: 1, name: "Sarah Wilson", department: "HR", position: "HR Manager", availability: "High" },
  { id: 2, name: "David Lee", department: "Engineering", position: "Tech Lead", availability: "Medium" },
  { id: 3, name: "Lisa Wang", department: "Product", position: "Product Director", availability: "Low" },
  { id: 4, name: "James Taylor", department: "Design", position: "Design Manager", availability: "High" },
  { id: 5, name: "Aisha Johnson", department: "Engineering", position: "Senior Developer", availability: "Medium" }
]

// Generate mock calendar events
const generateMockEvents = (baseDate) => {
  // Current date events (interviews and meetings)
  const todayEvents = [
    {
      id: 1,
      candidateId: 1,
      type: "Technical Interview",
      candidate: "John Doe",
      position: "Frontend Developer",
      time: "10:00 AM - 11:00 AM",
      status: "pending",
      interviewers: ["David Lee"],
      location: "Meeting Room A",
      notes: "Focus on React knowledge and system design"
    },
    {
      id: 2,
      candidateId: 2, 
      type: "HR Interview",
      candidate: "Jane Smith",
      position: "Product Manager",
      time: "2:00 PM - 3:00 PM",
      status: "confirmed",
      interviewers: ["Sarah Wilson"],
      location: "Online (Zoom)",
      notes: "Discuss salary expectations and team fit"
    }
  ]
  
  // Tomorrow's events
  const tomorrowEvents = [
    {
      id: 3,
      candidateId: 3,
      type: "Cultural Fit Interview",
      candidate: "Robert Johnson",
      position: "UX Designer",
      time: "11:00 AM - 12:00 PM",
      status: "confirmed",
      interviewers: ["James Taylor", "Sarah Wilson"],
      location: "Meeting Room B",
      notes: "Evaluate team collaboration skills"
    }
  ]
  
  // Day after tomorrow events
  const dayAfterEvents = [
    {
      id: 4,
      candidateId: 4,
      type: "Final Interview",
      candidate: "Emily Chen",
      position: "Backend Developer",
      time: "9:00 AM - 10:30 AM",
      status: "pending",
      interviewers: ["David Lee", "Aisha Johnson"],
      location: "Meeting Room C",
      notes: "Final round with team leads"
    },
    {
      id: 5,
      candidateId: 5,
      type: "Offer Discussion",
      candidate: "Michael Brown",
      position: "Data Scientist",
      time: "3:00 PM - 4:00 PM",
      status: "confirmed",
      interviewers: ["Sarah Wilson"],
      location: "HR Office",
      notes: "Present official offer and discuss benefits"
    }
  ]

  // Map events to dates
  const events = {}
  
  // Format dates as strings to use as keys
  const todayStr = format(baseDate, 'yyyy-MM-dd')
  const tomorrowStr = format(addDays(baseDate, 1), 'yyyy-MM-dd')
  const dayAfterTomorrowStr = format(addDays(baseDate, 2), 'yyyy-MM-dd')
  
  events[todayStr] = todayEvents
  events[tomorrowStr] = tomorrowEvents
  events[dayAfterTomorrowStr] = dayAfterEvents
  
  return events
}

// Status badge component for visual status indication
const StatusBadge = ({ status }) => {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  }
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

export default function SchedulePage() {
  // State management
  const [date, setDate] = useState(new Date())
  const [viewDate, setViewDate] = useState(new Date())
  const [events, setEvents] = useState({})
  const [candidates, setCandidates] = useState(MOCK_CANDIDATES)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [showEventDetails, setShowEventDetails] = useState(false)
  const [showCandidateDetails, setShowCandidateDetails] = useState(false)
  const [activeTab, setActiveTab] = useState("calendar")
  const [notificationCount, setNotificationCount] = useState(3)
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [calendarView, setCalendarView] = useState("day")
  const [searchTerm, setSearchTerm] = useState("")
  const [interviewers, setInterviewers] = useState(MOCK_INTERVIEWERS)
  
  // Load mock data on initial render
  useEffect(() => {
    setEvents(generateMockEvents(new Date()))
  }, [])
  
  // Handle date change in calendar
  const handleDateSelect = (newDate) => {
    setDate(newDate)
    setViewDate(newDate)
  }
  
  // Get events for selected date
  const selectedDateEvents = events[format(date, 'yyyy-MM-dd')] || []
  
  // Filter candidates based on search and department
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "All Departments" || candidate.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })
  
  // Handle event status change
  const handleStatusChange = (eventId, newStatus) => {
    const updatedEvents = { ...events }
    
    // Find the date key that contains this event
    Object.keys(updatedEvents).forEach(dateKey => {
      const dateEvents = updatedEvents[dateKey]
      const eventIndex = dateEvents.findIndex(e => e.id === eventId)
      
      if (eventIndex !== -1) {
        updatedEvents[dateKey][eventIndex].status = newStatus
      }
    })
    
    setEvents(updatedEvents)
  }
  
  // Schedule new interview (simulation)
  const handleScheduleInterview = (formData) => {
    // Create a new event
    const newEvent = {
      id: Date.now(), // Use timestamp as ID for simplicity
      candidateId: formData.candidate,
      type: formData.interviewType,
      candidate: candidates.find(c => c.id === parseInt(formData.candidate)).name,
      position: candidates.find(c => c.id === parseInt(formData.candidate)).position,
      time: `${formData.startTime} - ${formData.endTime}`,
      status: "pending",
      interviewers: formData.interviewers,
      location: formData.location,
      notes: formData.notes
    }
    
    // Add to events on the selected date
    const dateKey = format(date, 'yyyy-MM-dd')
    const updatedEvents = { ...events }
    
    if (updatedEvents[dateKey]) {
      updatedEvents[dateKey] = [...updatedEvents[dateKey], newEvent]
    } else {
      updatedEvents[dateKey] = [newEvent]
    }
    
    setEvents(updatedEvents)
    setShowScheduleDialog(false)
  }
  
  // Navigate between days
  const goToPreviousDay = () => {
    const newDate = subDays(viewDate, 1)
    setViewDate(newDate)
    setDate(newDate)
  }
  
  const goToNextDay = () => {
    const newDate = addDays(viewDate, 1)
    setViewDate(newDate)
    setDate(newDate)
  }
  
  // Get events for week view (simplified)
  const getWeekEvents = () => {
    const weekEvents = []
    for (let i = 0; i < 7; i++) {
      const currentDate = addDays(viewDate, i - 3) // Start 3 days before viewDate
      const dateKey = format(currentDate, 'yyyy-MM-dd')
      const dayEvents = events[dateKey] || []
      weekEvents.push({
        date: currentDate,
        events: dayEvents
      })
    }
    return weekEvents
  }
  
  // For demonstration purposes, simulating notifications
  const notifications = [
    { id: 1, type: "reminder", message: "Interview with John Doe in 30 minutes", time: "9:30 AM" },
    { id: 2, type: "update", message: "Jane Smith confirmed interview time", time: "Yesterday" },
    { id: 3, type: "alert", message: "New candidate application received", time: "Yesterday" }
  ]
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <RecruiterSidebar />

      <main className="md:pl-64 pt-16 md:pt-0">
        <div className="container mx-auto p-6">
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">HR Scheduling System</h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Manage interviews, candidates, and recruitment processes
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Notification bell */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="relative">
                      <LucideBell className="h-5 w-5" />
                      {notificationCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {notificationCount}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="p-2 font-medium border-b">Notifications</div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className="p-3 border-b last:border-0 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                          <div className="font-medium text-sm">{notification.message}</div>
                          <div className="text-xs text-slate-500 mt-1">{notification.time}</div>
                        </div>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* Schedule interview button */}
                <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <LucidePlus className="mr-2 h-4 w-4" />
                      Schedule Interview
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Schedule New Interview</DialogTitle>
                      <DialogDescription>
                        Create a new interview session for a candidate
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <FormLabel>Candidate</FormLabel>
                        <Select 
                          onValueChange={(value) => console.log("Selected candidate:", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select candidate" />
                          </SelectTrigger>
                          <SelectContent>
                            {candidates.map(candidate => (
                              <SelectItem key={candidate.id} value={candidate.id.toString()}>
                                {candidate.name} - {candidate.position}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <FormLabel>Interview Type</FormLabel>
                        <Select defaultValue="technical">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="screening">Screening Call</SelectItem>
                            <SelectItem value="technical">Technical Interview</SelectItem>
                            <SelectItem value="hr">HR Interview</SelectItem>
                            <SelectItem value="culture">Cultural Fit</SelectItem>
                            <SelectItem value="final">Final Interview</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <FormLabel>Date</FormLabel>
                          <div className="border rounded-md p-2">
                            {format(date, 'MMMM d, yyyy')}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <FormLabel>Location</FormLabel>
                          <Select defaultValue="roomA">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="roomA">Meeting Room A</SelectItem>
                              <SelectItem value="roomB">Meeting Room B</SelectItem>
                              <SelectItem value="roomC">Meeting Room C</SelectItem>
                              <SelectItem value="online">Online (Zoom)</SelectItem>
                              <SelectItem value="phone">Phone Call</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <FormLabel>Start Time</FormLabel>
                          <Select defaultValue="10:00 AM">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                              <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                              <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                              <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                              <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                              <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                              <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <FormLabel>End Time</FormLabel>
                          <Select defaultValue="11:00 AM">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                              <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                              <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                              <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                              <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                              <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                              <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <FormLabel>Interviewers</FormLabel>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select interviewers" />
                          </SelectTrigger>
                          <SelectContent>
                            {interviewers.map(interviewer => (
                              <SelectItem key={interviewer.id} value={interviewer.id.toString()}>
                                {interviewer.name} ({interviewer.department})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <FormLabel>Notes</FormLabel>
                        <Textarea 
                          placeholder="Add interview notes or instructions..."
                          rows={3}
                        />
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowScheduleDialog(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={() => {
                          // Simulate form submission
                          handleScheduleInterview({
                            candidate: "1",
                            interviewType: "Technical Interview",
                            startTime: "10:00 AM",
                            endTime: "11:00 AM",
                            location: "Meeting Room A",
                            interviewers: ["David Lee"],
                            notes: "Focus on technical skills assessment"
                          })
                        }}
                      >
                        Schedule
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </header>

          {/* Main content with tabs */}
          <Tabs defaultValue="calendar" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <LucideCalendar className="h-4 w-4" />
                Calendar
              </TabsTrigger>
              <TabsTrigger value="candidates" className="flex items-center gap-2">
                <LucideUsers className="h-4 w-4" />
                Candidates
              </TabsTrigger>
              <TabsTrigger value="interviewers" className="flex items-center gap-2">
                <LucideBuilding className="h-4 w-4" />
                Interviewers
              </TabsTrigger>
            </TabsList>
            
            {/* Calendar Tab Content */}
            <TabsContent value="calendar" className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Calendar</CardTitle>
                      <CardDescription>Select a date to view scheduled interviews</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        className="rounded-md border"
                      />
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => setCalendarView("day")}>
                          Day
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setCalendarView("week")}>
                          Week
                        </Button>
                      </div>
                      <div className="text-sm text-slate-500">
                        {selectedDateEvents.length} event(s)
                      </div>
                    </CardFooter>
                  </Card>
                  
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Quick Stats</CardTitle>
                      <CardDescription>Interview statistics</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Today's Interviews</span>
                        <span className="font-medium">{events[format(new Date(), 'yyyy-MM-dd')]?.length || 0}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 dark:text-slate-400">This Week</span>
                        <span className="font-medium">8</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 dark:text-slate-400">This Month</span>
                        <span className="font-medium">32</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Open Positions</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Candidates in Pipeline</span>
                        <span className="font-medium">{candidates.length}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="md:w-2/3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>{calendarView === "day" ? "Daily Schedule" : "Weekly Overview"}</CardTitle>
                        <CardDescription>
                          {calendarView === "day" 
                            ? format(date, 'EEEE, MMMM d, yyyy') 
                            : `Week of ${format(viewDate, 'MMMM d, yyyy')}`}
                        </CardDescription>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={calendarView === "day" ? goToPreviousDay : goToPreviousDay}>
                          <LucideChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => setDate(new Date())}>
                          Today
                        </Button>
                        <Button variant="outline" size="icon" onClick={calendarView === "day" ? goToNextDay : goToNextDay}>
                          <LucideChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      {calendarView === "day" ? (
                        <div className="space-y-4">
                          {selectedDateEvents.length > 0 ? (
                            selectedDateEvents.map(event => (
                              <div 
                                key={event.id} 
                                className="flex items-center justify-between p-4 rounded-lg bg-slate-100 dark:bg-slate-800 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                onClick={() => {
                                  setSelectedEvent(event)
                                  setShowEventDetails(true)
                                }}
                              >
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src="/api/placeholder/32/32" alt={event.candidate} />
                                      <AvatarFallback>{event.candidate.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-medium">{event.candidate}</div>
                                      <div className="text-sm text-slate-500">{event.position}</div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1 text-sm text-slate-500">
                                      <LucideClock className="h-4 w-4" />
                                      <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-slate-500">
                                      <LucideUser className="h-4 w-4" />
                                      <span>{event.interviewers.join(', ')}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-xs">
                                      {event.type}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      {event.location}
                                    </Badge>
                                  </div>
                                </div>
                                
                                <div className="flex flex-col items-end gap-2">
                                  <StatusBadge status={event.status} />
                                  
                                  <Select 
                                    defaultValue={event.status}
                                    onValueChange={(value) => handleStatusChange(event.id, value)}
                                  >
                                    <SelectTrigger className="w-[120px]">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">Pending</SelectItem>
                                      <SelectItem value="confirmed">Confirmed</SelectItem>
                                      <SelectItem value="completed">Completed</SelectItem>
                                      <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-8 text-slate-500">
                              No interviews scheduled for this date.
                              <div className="mt-2">
                                <Button 
                                  variant="outline"
                                  onClick={() => setShowScheduleDialog(true)}
                                >
                                  <LucidePlus className="mr-2 h-4 w-4" />
                                  Add Interview
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        // Week view
                        <div className="space-y-4">
                          {getWeekEvents().map((dayData, index) => (
                            <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                              <div className={`font-medium text-sm mb-2 ${isSameDay(dayData.date, new Date()) ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                                {format(dayData.date, 'EEEE, MMMM d')}
                                {isSameDay(dayData.date, new Date()) && ' (Today)'}
                              </div>
                              
                              {dayData.events.length > 0 ? (
                                <div className="space-y-2">
                                  {dayData.events.map(event => (
                                    <div 
                                      key={event.id}
                                      className="flex items-center justify-between p-3 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                                      onClick={() => {
                                        setSelectedEvent(event)
                                        setShowEventDetails(true)
                                      }}
                                    >
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">{event.time}</span>
                                        <span className="text-sm">{event.candidate}</span>
                                        <Badge variant="outline" className="text-xs">{event.type}</Badge>
                                      </div>
                                      <StatusBadge status={event.status} />
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-sm text-slate-500 py-2">No events scheduled</div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Candidates Tab Content */}
            <TabsContent value="candidates" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Candidate Management</CardTitle>
                    <CardDescription>View and manage job candidates</CardDescription>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Input 
                        placeholder="Search candidates..." 
                        className="pl-9 w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <LucideSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
                    </div>
                    
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_DEPARTMENTS.map(dept => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Button>
                      <LucidePlus className="mr-2 h-4 w-4" />
                      Add Candidate
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-100 dark:bg-slate-800">
                          <th className="text-left p-3 font-medium text-slate-600 dark:text-slate-300">
                            <div className="flex items-center gap-1 cursor-pointer hover:text-slate-900">
                              Name
                              <LucideArrowUpDown className="h-4 w-4" />
                            </div>
                          </th>
                          <th className="text-left p-3 font-medium text-slate-600 dark:text-slate-300">Position</th>
                          <th className="text-left p-3 font-medium text-slate-600 dark:text-slate-300">Department</th>
                          <th className="text-left p-3 font-medium text-slate-600 dark:text-slate-300">
                            <div className="flex items-center gap-1 cursor-pointer hover:text-slate-900">
                              Status
                              <LucideArrowUpDown className="h-4 w-4" />
                            </div>
                          </th>
                          <th className="text-left p-3 font-medium text-slate-600 dark:text-slate-300">Applied Date</th>
                          <th className="text-left p-3 font-medium text-slate-600 dark:text-slate-300">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCandidates.map(candidate => (
                          <tr 
                            key={candidate.id} 
                            className="border-t hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer"
                            onClick={() => {
                              setSelectedCandidate(candidate)
                              setShowCandidateDetails(true)
                            }}
                          >
                            <td className="p-3">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={candidate.avatar} alt={candidate.name} />
                                  <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{candidate.name}</span>
                              </div>
                            </td>
                            <td className="p-3">{candidate.position}</td>
                            <td className="p-3">{candidate.department}</td>
                            <td className="p-3">
                              <Badge className={
                                candidate.status === "Offer" ? "bg-green-100 text-green-800 hover:bg-green-200" :
                                candidate.status === "HR Interview" ? "bg-blue-100 text-blue-800 hover:bg-blue-200" :
                                candidate.status === "Technical Interview" ? "bg-purple-100 text-purple-800 hover:bg-purple-200" :
                                candidate.status === "Final Interview" ? "bg-amber-100 text-amber-800 hover:bg-amber-200" :
                                "bg-slate-100 text-slate-800 hover:bg-slate-200"
                              }>
                                {candidate.status}
                              </Badge>
                            </td>
                            <td className="p-3">{candidate.appliedDate}</td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" onClick={(e) => {
                                  e.stopPropagation()
                                  setDate(new Date())
                                  setShowScheduleDialog(true)
                                }}>
                                  <LucideCalendar className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={(e) => {
                                  e.stopPropagation()
                                  console.log("View documents")
                                }}>
                                  <LucideFileText className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={(e) => {
                                  e.stopPropagation()
                                  console.log("Send message")
                                }}>
                                  <LucideMessageCircle className="h-4 w-4" />
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                    <Button variant="ghost" size="icon">
                                      <LucideMoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                    <DropdownMenuItem>Change Status</DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">Remove Candidate</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="text-sm text-slate-500">
                    Showing {filteredCandidates.length} of {candidates.length} candidates
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" className="bg-slate-100">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Interviewers Tab Content */}
            <TabsContent value="interviewers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Interview Team</CardTitle>
                  <CardDescription>Manage your organization's interviewers</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-100 dark:bg-slate-800">
                          <th className="text-left p-3 font-medium text-slate-600 dark:text-slate-300">Interviewer</th>
                          <th className="text-left p-3 font-medium text-slate-600 dark:text-slate-300">Department</th>
                          <th className="text-left p-3 font-medium text-slate-600 dark:text-slate-300">Position</th>
                          <th className="text-left p-3 font-medium text-slate-600 dark:text-slate-300">Availability</th>
                          <th className="text-left p-3 font-medium text-slate-600 dark:text-slate-300">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {interviewers.map(interviewer => (
                          <tr key={interviewer.id} className="border-t hover:bg-slate-50 dark:hover:bg-slate-900">
                            <td className="p-3">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src="/api/placeholder/32/32" alt={interviewer.name} />
                                  <AvatarFallback>{interviewer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{interviewer.name}</span>
                              </div>
                            </td>
                            <td className="p-3">{interviewer.department}</td>
                            <td className="p-3">{interviewer.position}</td>
                            <td className="p-3">
                              <Badge className={
                                interviewer.availability === "High" ? "bg-green-100 text-green-800 hover:bg-green-200" :
                                interviewer.availability === "Medium" ? "bg-amber-100 text-amber-800 hover:bg-amber-200" :
                                "bg-red-100 text-red-800 hover:bg-red-200"
                              }>
                                {interviewer.availability}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon">
                                  <LucideCalendar className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <LucideMessageCircle className="h-4 w-4" />
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <LucideMoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>View Schedule</DropdownMenuItem>
                                    <DropdownMenuItem>Update Availability</DropdownMenuItem>
                                    <DropdownMenuItem>View Performance</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="text-sm text-slate-500">
                    Showing all {interviewers.length} interviewers
                  </div>
                  
                  <Button>
                    <LucidePlus className="mr-2 h-4 w-4" />
                    Add Interviewer
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Event Details Dialog */}
      <Dialog open={showEventDetails} onOpenChange={setShowEventDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Interview Details</DialogTitle>
            <DialogDescription>
              {selectedEvent?.type} with {selectedEvent?.candidate}
            </DialogDescription>
          </DialogHeader>
          
          {selectedEvent && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-slate-500">Candidate</h4>
                  <p className="font-medium">{selectedEvent.candidate}</p>
                  <p className="text-sm text-slate-500">{selectedEvent.position}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-slate-500">Status</h4>
                  <div className="mt-1">
                    <StatusBadge status={selectedEvent.status} />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-slate-500">Date & Time</h4>
                  <p>{format(date, 'MMMM d, yyyy')}</p>
                  <p className="text-sm text-slate-500">{selectedEvent.time}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-slate-500">Location</h4>
                  <p>{selectedEvent.location}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-slate-500">Interviewers</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedEvent.interviewers.map((interviewer, i) => (
                    <Badge key={i} variant="outline">
                      {interviewer}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-slate-500">Interview Notes</h4>
                <p className="text-sm bg-slate-50 dark:bg-slate-900 p-3 rounded-md mt-1">
                  {selectedEvent.notes || "No notes provided for this interview."}
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <div className="flex justify-between w-full">
              <div>
                <Button variant="destructive" size="sm">
                  <LucideX className="mr-2 h-4 w-4" />
                  Cancel Interview
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowEventDetails(false)}>
                  Close
                </Button>
                <Button>
                  <LucideCheck className="mr-2 h-4 w-4" />
                  Mark Complete
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Candidate Details Dialog */}
      <Dialog open={showCandidateDetails} onOpenChange={setShowCandidateDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Candidate Profile</DialogTitle>
            <DialogDescription>
              Detailed information about the candidate
            </DialogDescription>
          </DialogHeader>
          
          {selectedCandidate && (
            <div className="space-y-6 py-2">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedCandidate.avatar} alt={selectedCandidate.name} />
                  <AvatarFallback>{selectedCandidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{selectedCandidate.name}</h2>
                  <p className="text-slate-500">{selectedCandidate.position}</p>
                  
                  <div className="flex items-center gap-4 mt-2">
                    <Badge className={
                      selectedCandidate.status === "Offer" ? "bg-green-100 text-green-800" :
                      selectedCandidate.status === "HR Interview" ? "bg-blue-100 text-blue-800" :
                      selectedCandidate.status === "Technical Interview" ? "bg-purple-100 text-purple-800" :
                      selectedCandidate.status === "Final Interview" ? "bg-amber-100 text-amber-800" :
                      "bg-slate-100 text-slate-800"
                    }>
                      {selectedCandidate.status}
                    </Badge>
                    <span className="text-sm text-slate-500">Applied: {selectedCandidate.appliedDate}</span>
                  </div>
                </div>
                
                <div>
                  <Button>
                    <LucideCalendar className="mr-2 h-4 w-4" />
                    Schedule
                  </Button>
                </div>
              </div>
              
              <Tabs defaultValue="details">
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="interviews">Interviews</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="feedback">Feedback</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-slate-500">Email</h4>
                      <p>{selectedCandidate.email}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-500">Phone</h4>
                      <p>{selectedCandidate.phone}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-slate-500">Department</h4>
                      <p>{selectedCandidate.department}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-500">Current Stage</h4>
                      <p>{selectedCandidate.status}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-slate-500">Summary</h4>
                    <p className="text-sm bg-slate-50 dark:bg-slate-900 p-3 rounded-md mt-1">
                      {selectedCandidate.name} is a qualified candidate for the {selectedCandidate.position} role in the {selectedCandidate.department} department. They are currently in the {selectedCandidate.status} stage of the interview process.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="interviews" className="mt-4">
                  <div className="space-y-3">
                    {Object.values(events).flat().filter(event => event.candidate === selectedCandidate.name).map(event => (
                      <div key={event.id} className="flex items-center justify-between p-3 rounded-md bg-slate-100 dark:bg-slate-800">
                        <div>
                          <div className="font-medium">{event.type}</div>
                          <div className="text-sm text-slate-500">{format(date, 'MMMM d, yyyy')} • {event.time}</div>
                        </div>
                        <StatusBadge status={event.status} />
                      </div>
                    ))}
                    
                    {Object.values(events).flat().filter(event => event.candidate === selectedCandidate.name).length === 0 && (
                      <div className="text-center py-8 text-slate-500">
                        No interviews scheduled for this candidate.
                        <div className="mt-2">
                          <Button 
                            variant="outline"
                            onClick={() => {
                              setShowCandidateDetails(false)
                              setShowScheduleDialog(true)
                            }}
                          >
                            <LucidePlus className="mr-2 h-4 w-4" />
                            Schedule Interview
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="documents" className="mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-md p-4 flex items-center gap-3">
                      <div className="h-10 w-10 bg-slate-100 rounded-md flex items-center justify-center">
                        <LucideFileText className="h-5 w-5 text-slate-500" />
                      </div>
                      <div>
                        <div className="font-medium">Resume.pdf</div>
                        <div className="text-xs text-slate-500">Uploaded on {selectedCandidate.appliedDate}</div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4 flex items-center gap-3">
                      <div className="h-10 w-10 bg-slate-100 rounded-md flex items-center justify-center">
                        <LucideFileText className="h-5 w-5 text-slate-500" />
                      </div>
                      <div>
                        <div className="font-medium">Cover Letter.pdf</div>
                        <div className="text-xs text-slate-500">Uploaded on {selectedCandidate.appliedDate}</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="feedback" className="mt-4">
                  <div className="space-y-4">
                    <div className="border rounded-md p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>DL</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">David Lee</div>
                            <div className="text-xs text-slate-500">Technical Interview • 3 days ago</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-green-600 font-medium">Recommended</span>
                        </div>
                      </div>
                      <div className="mt-2 text-sm">
                        Strong technical skills with good problem-solving approach. Could improve on system design concepts, but overall a good candidate.
                      </div>
                    </div>
                    
                    {selectedCandidate.status === "HR Interview" || selectedCandidate.status === "Final Interview" || selectedCandidate.status === "Offer" ? (
                      <div className="border rounded-md p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>SW</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">Sarah Wilson</div>
                              <div className="text-xs text-slate-500">HR Interview • 1 day ago</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="text-green-600 font-medium">Recommended</span>
                          </div>
                        </div>
                        <div className="mt-2 text-sm">
                          Great cultural fit with excellent communication skills. Shows good alignment with company values and team dynamics.
                        </div>
                      </div>
                    ) : null}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
          
          <DialogFooter className="flex justify-between gap-2">
            <Select defaultValue={selectedCandidate?.status.toLowerCase().replace(' ', '-')}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Update Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="screening">Screening</SelectItem>
                <SelectItem value="technical-interview">Technical Interview</SelectItem>
                <SelectItem value="hr-interview">HR Interview</SelectItem>
                <SelectItem value="final-interview">Final Interview</SelectItem>
                <SelectItem value="offer">Offer</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowCandidateDetails(false)}>
                Close
              </Button>
              <Button>
                Save Changes
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}