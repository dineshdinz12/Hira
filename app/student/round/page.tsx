"use client"

import { StudentSidebar } from "@/components/student/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { MCQInterview } from "@/components/student/mcq-interview"
import { InterviewResultsModal } from "@/components/student/interview-results-modal"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { useToast } from "@/components/ui/use-toast"
import { LucideClock, LucideCheckCircle2, LucideAlertCircle, LucideArrowRight } from "lucide-react"

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyDXOwVz5WJQoL8dXv-f9IkZDN8Qha_w9Io")

interface MCQQuestion {
  question: string
  options: string[]
  correctAnswer: number
}

export default function MCQAssessment() {
  const [showInterview, setShowInterview] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [interviewResults, setInterviewResults] = useState<{
    mcqScore: number
    cheatingScore: number
    finalScore: number
    isQualified: boolean
  } | null>(null)
  const [questions, setQuestions] = useState<MCQQuestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const generateQuestions = async () => {
    try {
      setIsLoading(true)
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
      
      const prompt = `Generate 5 multiple choice questions for a frontend developer interview. 
      The questions should test aptitude, logical reasoning, and problem-solving skills.
      Return ONLY a JSON array with this exact structure:
      [
        {
          "question": "Question text here",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": 0
        }
      ]
      Make sure:
      1. Questions are clear and unambiguous
      2. All options are plausible
      3. There is exactly one correct answer
      4. correctAnswer is a number between 0-3
      5. Questions are challenging but fair
      6. No markdown formatting in the response
      
      Focus on:
      - Logical reasoning
      - Problem-solving
      - Numerical ability
      - Pattern recognition
      - Critical thinking`

      const result = await model.generateContent(prompt)
      const responseText = result.response.text()
      
      // Clean the response text to ensure it's valid JSON
      const cleanJson = responseText
        .replace(/```json\n?/, '') // Remove opening markdown
        .replace(/```\n?/, '')     // Remove closing markdown
        .trim()                    // Remove extra whitespace
      
      const generatedQuestions = JSON.parse(cleanJson)
      
      // Validate the generated questions
      if (!Array.isArray(generatedQuestions) || generatedQuestions.length !== 5) {
        throw new Error("Invalid question format")
      }
      
      // Validate each question
      generatedQuestions.forEach((q, index) => {
        if (!q.question || !Array.isArray(q.options) || q.options.length !== 4 || 
            typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer > 3) {
          throw new Error(`Invalid question format at index ${index}`)
        }
      })
      
      setQuestions(generatedQuestions)
      setShowInterview(true)
    } catch (error) {
      console.error("Error generating questions:", error)
      toast({
        title: "Error",
        description: "Failed to generate assessment questions. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleStartAssessment = async () => {
    await generateQuestions()
  }

  const handleAssessmentComplete = async (mcqScore: number, cheatingScore: number) => {
    // Calculate final score (70% MCQ, 30% cheating score)
    const finalScore = (mcqScore * 0.7) + ((1 - cheatingScore) * 0.3)
    
    // Determine if candidate moves to next round (threshold: 0.7 or 70%)
    const isQualified = finalScore >= 0.7

    // Set interview results
    setInterviewResults({
      mcqScore,
      cheatingScore,
      finalScore,
      isQualified
    })

    // Show results modal
    setShowInterview(false)
    setShowResults(true)
  }

  const handleCloseResults = () => {
    setShowResults(false)
    setInterviewResults(null)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <StudentSidebar />

      <main className="md:pl-64 pt-16 md:pt-0">
        <div className="container mx-auto p-6">
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">MCQ Assessment</h1>
                <p className="text-slate-600 dark:text-slate-400">Complete the MCQ assessment to proceed to the next round</p>
              </div>
            </div>
          </header>

          {!showInterview && !showResults && (
            <Card className="max-w-2xl mx-auto border border-slate-200 dark:border-slate-800 shadow-sm">
              <CardHeader className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                <CardTitle className="text-xl text-slate-900 dark:text-white">Start MCQ Assessment</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">You will have 15 minutes to complete 5 multiple-choice questions</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded-full">
                          <LucideClock className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                        </div>
                        <h3 className="font-medium text-slate-900 dark:text-white">Time Limit</h3>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">15 minutes to complete all questions</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded-full">
                          <LucideCheckCircle2 className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                        </div>
                        <h3 className="font-medium text-slate-900 dark:text-white">Questions</h3>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">5 multiple-choice questions to answer</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded-full">
                        <LucideAlertCircle className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                      </div>
                      <h3 className="font-medium text-slate-900 dark:text-white">Important Instructions</h3>
                    </div>
                    <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                      <li className="flex items-start gap-2">
                        <span className="text-slate-500 dark:text-slate-500">•</span>
                        <span>You will have 15 minutes to complete the assessment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-500 dark:text-slate-500">•</span>
                        <span>There are 5 multiple-choice questions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-500 dark:text-slate-500">•</span>
                        <span>Each question has 4 options</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-500 dark:text-slate-500">•</span>
                        <span>Select the best answer for each question</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-500 dark:text-slate-500">•</span>
                        <span>You cannot go back to previous questions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-500 dark:text-slate-500">•</span>
                        <span>Ensure you have a stable internet connection</span>
                      </li>
                    </ul>
                  </div>

                  <Button 
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 text-base font-medium"
                    onClick={handleStartAssessment}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        <span>Preparing Assessment...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>Start Assessment</span>
                        <LucideArrowRight className="h-5 w-5" />
                      </div>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {showInterview && questions.length > 0 && (
            <div className="mb-8">
              <MCQInterview
                questions={questions}
                onComplete={handleAssessmentComplete}
              />
            </div>
          )}

          {interviewResults && (
            <InterviewResultsModal
              isOpen={showResults}
              onClose={handleCloseResults}
              mcqScore={interviewResults.mcqScore}
              cheatingScore={interviewResults.cheatingScore}
              finalScore={interviewResults.finalScore}
              isQualified={interviewResults.isQualified}
            />
          )}
        </div>
      </main>
    </div>
  )
}
