"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LucideAlertCircle, LucideCode, LucideClock, LucideFileText } from "lucide-react"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { MCQInterview } from "@/components/student/mcq-interview"
import { InterviewResultsModal } from "@/components/student/interview-results-modal"

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyDXOwVz5WJQoL8dXv-f9IkZDN8Qha_w9Io")

interface SecondRoundInterviewProps {
  isOpen: boolean
  onClose: () => void
  company: string
  role: string
}

interface ResumeAnalysis {
  skills: string[]
  experience: string[]
  projects: string[]
}

interface CodingProblem {
  title: string
  description: string
  testCases: string[]
  timeLimit: number
}

interface MCQQuestion {
  question: string
  options: string[]
  correctAnswer: number
}

export function SecondRoundInterview({ isOpen, onClose, company, role }: SecondRoundInterviewProps) {
  const [resume, setResume] = useState<File | null>(null)
  const [resumeAnalysis, setResumeAnalysis] = useState<ResumeAnalysis | null>(null)
  const [codingProblem, setCodingProblem] = useState<CodingProblem | null>(null)
  const [code, setCode] = useState("")
  const [showCodingProblem, setShowCodingProblem] = useState(false)
  const [showMCQ, setShowMCQ] = useState(false)
  const [mcqQuestions, setMcqQuestions] = useState<MCQQuestion[]>([])
  const [showResults, setShowResults] = useState(false)
  const [interviewResults, setInterviewResults] = useState<{
    codeScore: number
    mcqScore: number
    finalScore: number
    isQualified: boolean
    feedback: string
  } | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined)
  const [answers, setAnswers] = useState<number[]>([])

  useEffect(() => {
    if (timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && showCodingProblem) {
      handleSubmitCode()
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [timeLeft, showCodingProblem])

  const analyzeResume = async (file: File) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
      const fileContent = await file.text()
      
      const prompt = `Analyze this resume and extract the following information in JSON format:
{
  "skills": ["skill1", "skill2", ...],
  "experience": ["exp1", "exp2", ...],
  "projects": ["project1", "project2", ...]
}
Focus on technical skills, programming languages, frameworks, and relevant experience.`
      
      const result = await model.generateContent(prompt + "\n\nResume:\n" + fileContent)
      const responseText = result.response.text()
      
      // Clean the response text to ensure it's valid JSON
      const cleanJson = responseText
        .replace(/```json\n?/, '') // Remove opening markdown
        .replace(/```\n?/, '')     // Remove closing markdown
        .trim()                    // Remove extra whitespace
      
      const analysis = JSON.parse(cleanJson)
      setResumeAnalysis(analysis)
      generateCodingProblem(analysis)
    } catch (error) {
      console.error("Error analyzing resume:", error)
      if (error instanceof Error) {
        console.error("Raw response:", error.message)
      }
    }
  }

  const generateCodingProblem = async (analysis: ResumeAnalysis) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
      
      const prompt = `Based on the candidate's skills and experience:
${JSON.stringify(analysis, null, 2)}

Generate a coding problem that tests their data structures and algorithms knowledge. Return a JSON object with this structure:
{
  "title": "Problem title",
  "description": "Detailed problem description",
  "testCases": ["test case 1", "test case 2", ...],
  "timeLimit": 45
}
Make the problem challenging but appropriate for their skill level.`
      
      const result = await model.generateContent(prompt)
      const problem = JSON.parse(result.response.text())
      setCodingProblem(problem)
      setTimeLeft(problem.timeLimit * 60)
      setShowCodingProblem(true)
    } catch (error) {
      console.error("Error generating coding problem:", error)
    }
  }

  const handleSubmitCode = async () => {
    if (!codingProblem) return

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
      
      // Evaluate code
      const evaluationPrompt = `Evaluate this code solution for the problem:
${codingProblem.description}

Code:
${code}

Test cases:
${codingProblem.testCases.join("\n")}

Return a JSON object with this structure:
{
  "score": 0.85, // Score between 0 and 1
  "feedback": "Detailed feedback on the solution"
}`
      
      const evaluationResult = await model.generateContent(evaluationPrompt)
      const evaluation = JSON.parse(evaluationResult.response.text())
      
      // Generate follow-up MCQs with better prompting
      const mcqPrompt = `Based on the candidate's code solution and the problem context:
${code}

Generate 5 diverse multiple-choice questions that test:
1. Time and space complexity understanding
2. Edge cases and error handling
3. Alternative approaches and optimizations
4. Data structure and algorithm concepts used
5. Best practices and code quality

Return a JSON array with this structure:
[
  {
    "question": "Question text",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "explanation": "Detailed explanation of the correct answer"
  }
]
Make questions challenging but fair, and ensure explanations are educational.`
      
      const mcqResult = await model.generateContent(mcqPrompt)
      const questions = JSON.parse(mcqResult.response.text())
      setMcqQuestions(questions)
      setShowCodingProblem(false)
      setShowMCQ(true)
    } catch (error) {
      console.error("Error evaluating code:", error)
    }
  }

  const handleMCQComplete = async (mcqScore: number) => {
    if (!interviewResults) return

    // Calculate final score (60% code, 40% MCQ)
    const finalScore = (interviewResults.codeScore * 0.6) + (mcqScore * 0.4)
    const isQualified = finalScore >= 0.7

    // Generate AI feedback
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
    const feedbackPrompt = `Generate constructive feedback for a candidate with these scores:
- Code Score: ${interviewResults.codeScore * 100}%
- MCQ Score: ${mcqScore * 100}%
- Final Score: ${finalScore * 100}%

Focus on:
1. Technical strengths and areas for improvement
2. Problem-solving approach
3. Code quality and efficiency
4. Knowledge of data structures and algorithms
5. Specific recommendations for improvement

Keep the feedback professional, constructive, and actionable.`
    
    const feedbackResult = await model.generateContent(feedbackPrompt)
    const feedback = feedbackResult.response.text()

    setInterviewResults({
      ...interviewResults,
      mcqScore,
      finalScore,
      isQualified,
      feedback
    })
    setShowMCQ(false)
    setShowResults(true)
  }

  const handleCloseResults = () => {
    setShowResults(false)
    onClose()
  }

  // Add security features
  useEffect(() => {
    if (showMCQ) {
      // Enter fullscreen
      const enterFullscreen = async () => {
        try {
          const element = document.documentElement
          if (element.requestFullscreen) {
            await element.requestFullscreen()
          }
        } catch (error) {
          console.error("Error entering fullscreen:", error)
        }
      }
      enterFullscreen()

      // Prevent tab switching
      const handleVisibilityChange = () => {
        if (document.hidden) {
          alert("Warning: Switching tabs is not allowed during the interview!")
        }
      }
      document.addEventListener("visibilitychange", handleVisibilityChange)

      // Prevent copy-paste
      const preventCopyPaste = (e: ClipboardEvent) => {
        e.preventDefault()
        alert("Copy-paste is disabled during the interview!")
      }
      document.addEventListener("copy", preventCopyPaste)
      document.addEventListener("paste", preventCopyPaste)

      // Cleanup
      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange)
        document.removeEventListener("copy", preventCopyPaste)
        document.removeEventListener("paste", preventCopyPaste)
      }
    }
  }, [showMCQ])

  // Add per-question timer
  const [questionTimer, setQuestionTimer] = useState(60) // 1 minute per question
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  useEffect(() => {
    if (showMCQ && currentQuestionIndex < mcqQuestions.length) {
      const timer = setInterval(() => {
        setQuestionTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            // Auto-advance to next question
            if (currentQuestionIndex < mcqQuestions.length - 1) {
              setCurrentQuestionIndex((prev) => prev + 1)
              setQuestionTimer(60)
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [showMCQ, currentQuestionIndex, mcqQuestions.length])

  // Modify the MCQ display to show timer and current question
  const renderMCQ = () => {
    if (!showMCQ || !mcqQuestions.length) return null

    const currentQuestion = mcqQuestions[currentQuestionIndex]

    const handleAnswer = (selectedIndex: number) => {
      const newAnswers = [...answers]
      newAnswers[currentQuestionIndex] = selectedIndex
      setAnswers(newAnswers)

      if (currentQuestionIndex < mcqQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1)
        setQuestionTimer(60)
      }
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            Question {currentQuestionIndex + 1} of {mcqQuestions.length}
          </h3>
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">Time Remaining:</div>
            <div className={`text-lg font-bold ${questionTimer <= 10 ? "text-red-500" : ""}`}>
              {questionTimer}s
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-lg">{currentQuestion.question}</p>
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`w-full p-4 text-left border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 ${
                  answers[currentQuestionIndex] === index ? "bg-slate-100 dark:bg-slate-800" : ""
                }`}
                onClick={() => handleAnswer(index)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {currentQuestionIndex === mcqQuestions.length - 1 && (
          <Button
            className="w-full"
            onClick={() => {
              // Calculate score based on correct answers
              const score = mcqQuestions.reduce((acc, question, index) => {
                return acc + (answers[index] === question.correctAnswer ? 1 : 0)
              }, 0) / mcqQuestions.length
              
              handleMCQComplete(score)
            }}
          >
            Submit Answers
          </Button>
        )}
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Second Round Interview - {company}</DialogTitle>
        </DialogHeader>

        {!resumeAnalysis && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resume">Upload Resume</Label>
              <Input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    setResume(file)
                    analyzeResume(file)
                  }
                }}
              />
            </div>
          </div>
        )}

        {showCodingProblem && codingProblem && (
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{codingProblem.title}</h3>
                <div className="flex items-center gap-2">
                  <LucideClock className="h-4 w-4" />
                  <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                </div>
              </div>
              <div className="prose dark:prose-invert">
                <p>{codingProblem.description}</p>
                <h4>Test Cases:</h4>
                <ul>
                  {codingProblem.testCases.map((testCase, index) => (
                    <li key={index}>{testCase}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Code Editor</h3>
                <Button onClick={handleSubmitCode}>Submit</Button>
              </div>
              <textarea
                className="w-full h-[calc(100%-4rem)] p-4 font-mono text-sm bg-slate-950 text-slate-50 rounded-lg"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Write your solution here..."
              />
            </div>
          </div>
        )}

        {showMCQ && renderMCQ()}

        {showResults && interviewResults && (
          <InterviewResultsModal
            isOpen={showResults}
            onClose={handleCloseResults}
            mcqScore={interviewResults.mcqScore}
            cheatingScore={0}
            finalScore={interviewResults.finalScore}
            isQualified={interviewResults.isQualified}
          />
        )}
      </DialogContent>
    </Dialog>
  )
} 