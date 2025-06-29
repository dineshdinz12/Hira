"use client"

import { RecruiterSidebar } from "@/components/recruiter/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  LucideAlertCircle,
  LucideCalendar,
  LucideCheckCircle2,
  LucideClock,
  LucideMail,
  LucideMapPin,
  LucideMessageSquare,
  LucideMonitor,
  LucidePhone,
  LucidePlay,
  LucideUser,
  LucideVideo,
  LucideDownload,
  LucideFileText,
  LucideChevronDown,
  LucideMoreVertical,
} from "lucide-react"
import { MultimodalEvaluation } from "@/components/recruiter/multimodal-evaluation"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Candidate = {
  id: number
  name: string
  email: string
  phone: string
  role: string
  status: "Technical Screening" | "Coding Assessment" | "Behavioral Round" | "Final Round"
  stage: "Pending HR Review" | "AI Evaluation in Progress" | "AI Assessment Complete" | "Scheduling Final Round"
  scores: {
    technicalKnowledge: number
    problemSolving: number
    codeQuality: number
    systemDesign: number
    overall: number
  }
  stages: {
    name: string
    status: "Completed" | "In Progress" | "Pending"
    completedBy: "AI" | "HR"
    result: "Passed" | "Failed" | "Scheduled" | "Pending"
  }[]
  interviewType?: "online" | "offline"
  interviewDetails?: {
    date?: string
    time?: string
    location?: string
    meetingLink?: string
  }
}

const initialCandidates: Candidate[] = [
  {
    id: 1,
    name: "Jamie Smith",
    email: "jamie.smith@example.com",
    phone: "+1 (555) 123-4567",
    role: "Frontend Developer",
    status: "Behavioral Round",
    stage: "Pending HR Review",
    scores: {
      technicalKnowledge: 85,
      problemSolving: 78,
      codeQuality: 82,
      systemDesign: 80,
      overall: 81
    },
    stages: [
      {
        name: "Technical Screening",
        status: "Completed",
        completedBy: "AI",
        result: "Passed"
      },
      {
        name: "Coding Assessment",
        status: "Completed",
        completedBy: "AI",
        result: "Passed"
      },
      {
        name: "Behavioral Interview",
        status: "Pending",
        completedBy: "HR",
        result: "Scheduled"
      }
    ]
  },
  {
    id: 2,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 987-6543",
    role: "Backend Developer",
    status: "Technical Screening",
    stage: "AI Evaluation in Progress",
    scores: {
      technicalKnowledge: 78,
      problemSolving: 82,
      codeQuality: 75,
      systemDesign: 85,
      overall: 80
    },
    stages: [
      {
        name: "Technical Screening",
        status: "In Progress",
        completedBy: "AI",
        result: "Pending"
      }
    ]
  },
  {
    id: 3,
    name: "Taylor Williams",
    email: "taylor.williams@example.com",
    phone: "+1 (555) 456-7890",
    role: "Full-Stack Developer",
    status: "Final Round",
    stage: "Scheduling Final Round",
    scores: {
      technicalKnowledge: 90,
      problemSolving: 88,
      codeQuality: 92,
      systemDesign: 85,
      overall: 89
    },
    stages: [
      {
        name: "Technical Screening",
        status: "Completed",
        completedBy: "AI",
        result: "Passed"
      },
      {
        name: "Coding Assessment",
        status: "Completed",
        completedBy: "AI",
        result: "Passed"
      },
      {
        name: "Behavioral Interview",
        status: "Completed",
        completedBy: "HR",
        result: "Passed"
      }
    ]
  }
]

export default function Evaluations() {
  const { toast } = useToast()
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates)
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(candidates[0])
  const [isSchedulingFinalRound, setIsSchedulingFinalRound] = useState(false)
  const [interviewType, setInterviewType] = useState<"online" | "offline">("online")
  const [interviewDetails, setInterviewDetails] = useState({
    date: "",
    time: "",
    location: "",
    meetingLink: ""
  })

  const handleCandidateSelect = (candidate: Candidate) => {
    setSelectedCandidate(candidate)
    setIsSchedulingFinalRound(false)
  }

  const scheduleBehavioralRound = () => {
    toast({
      title: "Behavioral Round Scheduled",
      description: `An interview has been scheduled with ${selectedCandidate.name}`,
    })
  }

  const viewTechnicalAssessment = () => {
    toast({
      title: "Technical Assessment",
      description: `Opening technical assessment for ${selectedCandidate.name}`,
    })
  }

  const downloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: `Full report for ${selectedCandidate.name} has been downloaded`,
    })
  }

  const scheduleFinalRound = () => {
    setIsSchedulingFinalRound(true)
  }

  const confirmFinalRound = () => {
    const updatedCandidates = candidates.map(candidate => {
      if (candidate.id === selectedCandidate.id) {
        return {
          ...candidate,
          interviewType,
          interviewDetails,
          status: "Final Round",
          stage: "Pending HR Review"
        }
      }
      return candidate
    })

    setCandidates(updatedCandidates)
    setSelectedCandidate(updatedCandidates.find(c => c.id === selectedCandidate.id)!)
    setIsSchedulingFinalRound(false)

    toast({
      title: "Final Round Scheduled",
      description: `Final round details have been saved for ${selectedCandidate.name}`,
    })
  }

  const updateCandidateStatus = (newStatus: Candidate["status"]) => {
    const updatedCandidates = candidates.map(candidate => {
      if (candidate.id === selectedCandidate.id) {
        return {
          ...candidate,
          status: newStatus
        }
      }
      return candidate
    })

    setCandidates(updatedCandidates)
    setSelectedCandidate(updatedCandidates.find(c => c.id === selectedCandidate.id)!)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <RecruiterSidebar />

      <main className="md:pl-64 pt-16 md:pt-0">
        <div className="container mx-auto p-6">
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Interview Evaluations</h1>
                <p className="text-slate-600 dark:text-slate-400">AI-powered interview assessment and results</p>
              </div>
              <div>
                {selectedCandidate.status === "Behavioral Round" && (
                  <Button className="gap-2" onClick={scheduleBehavioralRound}>
                    <LucidePlay size={16} />
                    <span>Schedule Behavioral Round</span>
                  </Button>
                )}
                {selectedCandidate.status === "Final Round" && (
                  <Button className="gap-2" onClick={scheduleFinalRound}>
                    <LucideCalendar size={16} />
                    <span>Schedule Final Round</span>
                  </Button>
                )}
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Current Evaluation</CardTitle>
                  <CardDescription>{selectedCandidate.name} - {selectedCandidate.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Candidate Contact Info */}
                    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <LucideMail size={16} className="text-slate-500" />
                          <span className="text-sm">{selectedCandidate.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <LucidePhone size={16} className="text-slate-500" />
                          <span className="text-sm">{selectedCandidate.phone}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <LucideMail size={14} />
                          <span>Email</span>
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <LucidePhone size={14} />
                          <span>Call</span>
                        </Button>
                      </div>
                    </div>

                    {/* Interview Stages */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-900 dark:text-white">Interview Stages</h3>
                      <div className="space-y-3">
                        {selectedCandidate.stages.map((stage, index) => (
                          <div 
                            key={index}
                            className={`flex items-center gap-3 p-3 ${
                              stage.status === "Completed" 
                                ? "bg-green-50 dark:bg-green-900/20" 
                                : stage.status === "In Progress"
                                ? "bg-blue-50 dark:bg-blue-900/20"
                                : "bg-slate-50 dark:bg-slate-900"
                            } rounded-lg`}
                          >
                            {stage.status === "Completed" ? (
                              <LucideCheckCircle2 className="text-green-600" size={20} />
                            ) : stage.status === "In Progress" ? (
                              <LucideClock className="text-blue-600" size={20} />
                            ) : (
                              <LucideClock className="text-slate-400" size={20} />
                            )}
                            <div className="flex-1">
                              <div className="font-medium">{stage.name}</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                {stage.status} by {stage.completedBy}
                              </div>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={`${
                                stage.result === "Passed"
                                  ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                                  : stage.result === "Failed"
                                  ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
                                  : "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                              }`}
                            >
                              {stage.result}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Assessment Results */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-900 dark:text-white">AI Assessment Results</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-sm font-medium">Technical Knowledge</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <LucideMessageSquare size={16} className="text-purple-600" />
                                <span className="text-sm">Score</span>
                              </div>
                              <Badge
                                variant="outline"
                                className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                              >
                                {selectedCandidate.scores.technicalKnowledge}/100
                              </Badge>
                            </div>
                            <Progress 
                              value={selectedCandidate.scores.technicalKnowledge} 
                              className="h-2 mt-2" 
                            />
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-sm font-medium">Problem Solving</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <LucideMessageSquare size={16} className="text-purple-600" />
                                <span className="text-sm">Score</span>
                              </div>
                              <Badge
                                variant="outline"
                                className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                              >
                                {selectedCandidate.scores.problemSolving}/100
                              </Badge>
                            </div>
                            <Progress 
                              value={selectedCandidate.scores.problemSolving} 
                              className="h-2 mt-2" 
                            />
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-sm font-medium">Code Quality</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <LucideMessageSquare size={16} className="text-purple-600" />
                                <span className="text-sm">Score</span>
                              </div>
                              <Badge
                                variant="outline"
                                className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                              >
                                {selectedCandidate.scores.codeQuality}/100
                              </Badge>
                            </div>
                            <Progress 
                              value={selectedCandidate.scores.codeQuality} 
                              className="h-2 mt-2" 
                            />
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-sm font-medium">System Design</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <LucideMessageSquare size={16} className="text-purple-600" />
                                <span className="text-sm">Score</span>
                              </div>
                              <Badge
                                variant="outline"
                                className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                              >
                                {selectedCandidate.scores.systemDesign}/100
                              </Badge>
                            </div>
                            <Progress 
                              value={selectedCandidate.scores.systemDesign} 
                              className="h-2 mt-2" 
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {selectedCandidate.status === "Behavioral Round" && (
                      <Alert className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                        <LucideAlertCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        <AlertDescription className="text-purple-700 dark:text-purple-400">
                          Behavioral interview scheduled for March 15, 2024. Please prepare questions focusing on team collaboration and leadership experience.
                        </AlertDescription>
                      </Alert>
                    )}

                    {selectedCandidate.interviewType && (
                      <Alert className={
                        selectedCandidate.interviewType === "online" 
                          ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                          : "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                      }>
                        <div className="flex items-start gap-3">
                          {selectedCandidate.interviewType === "online" ? (
                            <LucideMonitor className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                          ) : (
                            <LucideMapPin className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5" />
                          )}
                          <div>
                            <AlertTitle className="font-medium">
                              Final Round - {selectedCandidate.interviewType === "online" ? "Online" : "Onsite"}
                            </AlertTitle>
                            <AlertDescription className="text-slate-700 dark:text-slate-400">
                              {selectedCandidate.interviewType === "online" ? (
                                <>
                                  <p>Meeting Link: {selectedCandidate.interviewDetails?.meetingLink || "Not specified"}</p>
                                  <p>Date: {selectedCandidate.interviewDetails?.date || "Not specified"} at {selectedCandidate.interviewDetails?.time || "Not specified"}</p>
                                </>
                              ) : (
                                <>
                                  <p>Location: {selectedCandidate.interviewDetails?.location || "Not specified"}</p>
                                  <p>Date: {selectedCandidate.interviewDetails?.date || "Not specified"} at {selectedCandidate.interviewDetails?.time || "Not specified"}</p>
                                </>
                              )}
                            </AlertDescription>
                          </div>
                        </div>
                      </Alert>
                    )}

                    {isSchedulingFinalRound && (
                      <Card className="border-purple-200 dark:border-purple-800">
                        <CardHeader>
                          <CardTitle>Schedule Final Round</CardTitle>
                          <CardDescription>Select interview type and provide details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Interview Type</label>
                            <div className="flex gap-2">
                              <Button
                                variant={interviewType === "online" ? "default" : "outline"}
                                className="flex-1 gap-2"
                                onClick={() => setInterviewType("online")}
                              >
                                <LucideMonitor size={16} />
                                Online
                              </Button>
                              <Button
                                variant={interviewType === "offline" ? "default" : "outline"}
                                className="flex-1 gap-2"
                                onClick={() => setInterviewType("offline")}
                              >
                                <LucideMapPin size={16} />
                                Onsite
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Date</label>
                            <Input 
                              type="date" 
                              value={interviewDetails.date}
                              onChange={(e) => setInterviewDetails({...interviewDetails, date: e.target.value})}
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Time</label>
                            <Input 
                              type="time" 
                              value={interviewDetails.time}
                              onChange={(e) => setInterviewDetails({...interviewDetails, time: e.target.value})}
                            />
                          </div>

                          {interviewType === "online" ? (
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Meeting Link</label>
                              <Input 
                                placeholder="https://meet.google.com/abc-xyz" 
                                value={interviewDetails.meetingLink}
                                onChange={(e) => setInterviewDetails({...interviewDetails, meetingLink: e.target.value})}
                              />
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Location</label>
                              <Input 
                                placeholder="Office address" 
                                value={interviewDetails.location}
                                onChange={(e) => setInterviewDetails({...interviewDetails, location: e.target.value})}
                              />
                            </div>
                          )}

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Additional Notes</label>
                            <Textarea placeholder="Any special instructions for the candidate" />
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setIsSchedulingFinalRound(false)}>
                            Cancel
                          </Button>
                          <Button onClick={confirmFinalRound}>
                            Schedule Final Round
                          </Button>
                        </CardFooter>
                      </Card>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-3">
                  <Button className="w-full sm:w-auto gap-2" onClick={viewTechnicalAssessment}>
                    <LucidePlay size={16} />
                    <span>View Technical Assessment</span>
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto gap-2" onClick={downloadReport}>
                    <LucideDownload size={16} />
                    <span>Download Full Report</span>
                  </Button>
                </CardFooter>
              </Card>

              <MultimodalEvaluation />
            </div>

            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Interview Pipeline</CardTitle>
                  <CardDescription>Current stage and status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {candidates.map((candidate) => (
                    <div 
                      key={candidate.id}
                      className={`space-y-2 cursor-pointer p-2 rounded-lg transition-colors ${
                        selectedCandidate.id === candidate.id 
                          ? "bg-purple-50 dark:bg-purple-900/20" 
                          : "hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                      onClick={() => handleCandidateSelect(candidate)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-purple-100 dark:bg-purple-900/20 p-1.5 rounded">
                            <LucideUser size={16} className="text-purple-600 dark:text-purple-400" />
                          </div>
                          <span>{candidate.name}</span>
                        </div>
                        <Badge variant={selectedCandidate.id === candidate.id ? "default" : "outline"}>
                          {candidate.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {candidate.role} • {candidate.stage}
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Candidates
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Candidate Evaluation</CardTitle>
                  <CardDescription>Overall assessment and next steps</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Overall Score</span>
                      <span className="text-lg font-bold text-purple-600">
                        {selectedCandidate.scores.overall}/100
                      </span>
                    </div>
                    <Progress 
                      value={selectedCandidate.scores.overall} 
                      className="h-2 mt-2" 
                    />
                    <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                      {selectedCandidate.scores.overall >= 80 
                        ? "Strong candidate - Ready for next round" 
                        : selectedCandidate.scores.overall >= 60
                        ? "Potential candidate - Needs review"
                        : "Not recommended - Below threshold"}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Recommended Action</h3>
                    {selectedCandidate.status === "Technical Screening" && (
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full" onClick={() => updateCandidateStatus("Coding Assessment")}>
                          Move to Coding Assessment
                        </Button>
                        <Button variant="outline" className="w-full" onClick={() => updateCandidateStatus("Behavioral Round")}>
                          Fast-track to Behavioral Round
                        </Button>
                      </div>
                    )}
                    {selectedCandidate.status === "Coding Assessment" && (
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full" onClick={() => updateCandidateStatus("Behavioral Round")}>
                          Move to Behavioral Round
                        </Button>
                      </div>
                    )}
                    {selectedCandidate.status === "Behavioral Round" && (
                      <div className="space-y-2">
                        <Button className="w-full" onClick={scheduleFinalRound}>
                          Schedule Final Round
                        </Button>
                        <Button variant="outline" className="w-full">
                          Request Additional Interviews
                        </Button>
                      </div>
                    )}
                    {selectedCandidate.status === "Final Round" && (
                      <div className="space-y-2">
                        <Button className="w-full">
                          Complete Hiring Process
                        </Button>
                        <Button variant="outline" className="w-full">
                          Request Additional Interviews
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Evaluation Documents</h3>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" className="justify-start gap-2">
                        <LucideFileText size={16} />
                        Technical Evaluation
                      </Button>
                      <Button variant="outline" className="justify-start gap-2">
                        <LucideFileText size={16} />
                        Behavioral Notes
                      </Button>
                      <Button variant="outline" className="justify-start gap-2">
                        <LucideFileText size={16} />
                        Full Candidate Report
                      </Button>
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