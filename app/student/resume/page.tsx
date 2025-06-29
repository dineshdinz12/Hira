"use client"

import { StudentSidebar } from "@/components/student/sidebar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useState, useRef } from "react"
import {
  LucideFileText, 
  LucideCheckCircle, 
  LucideAlertCircle,
  LucideDownload,
  LucideFileUp,
  LucideUpload
} from "lucide-react"

interface ResumeSection {
  title: string;
  content: string;
  score: number;
  isEditing?: boolean;
}

interface ATSAnalysis {
  overallScore: number;
  keywordMatch: number;
  formatScore: number;
  contentScore: number;
  missingKeywords: string[];
  suggestions: string[];
}

const GEMINI_API_KEY = ""
const GEMINI_API_URL = ""

export default function ResumeBuilder() {
  const [jobDescription, setJobDescription] = useState("")
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [resumeContent, setResumeContent] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showOutline, setShowOutline] = useState(false)
  const [resumeSections, setResumeSections] = useState<ResumeSection[]>([])
  const [atsAnalysis, setAtsAnalysis] = useState<ATSAnalysis>({
    overallScore: 0,
    keywordMatch: 0,
    formatScore: 0,
    contentScore: 0,
    missingKeywords: [],
    suggestions: []
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const [editedSections, setEditedSections] = useState<ResumeSection[]>([])

  const handleFileUpload = async (file: File) => {
    try {
      const text = await file.text()
      setResumeFile(file)
      setResumeContent(text)
      toast({
        title: "Success",
        description: "Resume uploaded successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to read file. Please try again.",
        variant: "destructive"
      })
    }
  }

  const generateResumeOutline = async () => {
    if (!jobDescription.trim() || !resumeContent.trim()) {
      toast({
        title: "Error",
        description: "Please upload a resume and enter job description.",
        variant: "destructive"
      })
      return
    }

    setIsAnalyzing(true)
    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Analyze this job description and current resume to create an optimized resume outline. First, thoroughly analyze the current resume content, then create an outline that preserves and enhances the existing content. Return ONLY a valid JSON object without any markdown formatting or additional text:

Job Description:
${jobDescription}

Current Resume Content:
${resumeContent}

Instructions:
1. First, analyze the current resume structure and content:
   - Identify all existing sections and their content
   - Extract all achievements, skills, and experiences
   - Note the candidate's career level and background
   - Preserve the original writing style and tone
   - Keep all specific details, numbers, and metrics

2. Then, compare with job requirements:
   - Match existing skills and experiences with job requirements
   - Identify which existing content is most relevant
   - Note which existing achievements align with job needs
   - Find gaps between current resume and job requirements

3. Create an optimized outline that:
   - Uses the existing resume structure as a base
   - Preserves all relevant existing content
   - Suggests enhancements for existing sections
   - Adds only necessary new sections
   - Maintains the candidate's actual experience

4. Calculate ATS scores based on:
   - How well existing content matches job requirements
   - Current format and structure
   - Content relevance and completeness
   - Potential for optimization

The JSON should have this exact structure:
{
  "sections": [
    {
      "title": "Section Title (matching existing resume sections)",
      "content": "Detailed outline that preserves existing content while suggesting enhancements",
      "score": 0-100
    }
  ],
  "atsAnalysis": {
    "overallScore": 0-100,
    "keywordMatch": 0-100,
    "formatScore": 0-100,
    "contentScore": 0-100,
    "missingKeywords": ["keyword1", "keyword2"],
    "suggestions": ["suggestion1", "suggestion2"]
  }
}

Important: The outline should primarily use and enhance the existing resume content. Only suggest new sections if they are absolutely necessary for the job requirements.`
            }]
          }]
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate outline')
      }

      const data = await response.json()
      let analysisText = data.candidates[0].content.parts[0].text
      analysisText = analysisText.replace(/```json\n?|\n?```/g, '').trim()
      
      const analysis = JSON.parse(analysisText)
      
      // Ensure minimum scores based on content presence
      const hasContent = resumeContent.trim().length > 0
      const minScore = hasContent ? 40 : 0 // Minimum score if content exists
      
      // Adjust scores to be more realistic
      const adjustedAnalysis = {
        ...analysis,
        atsAnalysis: {
          ...analysis.atsAnalysis,
          overallScore: Math.max(analysis.atsAnalysis.overallScore, minScore),
          keywordMatch: Math.max(analysis.atsAnalysis.keywordMatch, minScore),
          formatScore: Math.max(analysis.atsAnalysis.formatScore, minScore),
          contentScore: Math.max(analysis.atsAnalysis.contentScore, minScore)
        }
      }
      
      setResumeSections(adjustedAnalysis.sections)
      setAtsAnalysis(adjustedAnalysis.atsAnalysis)
      setShowOutline(true)

      toast({
        title: "Outline Generated",
        description: "Review the personalized resume outline and confirm to generate content.",
      })
    } catch (error) {
      console.error('Error generating outline:', error)
      toast({
        title: "Error",
        description: "Failed to generate outline. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const generateResumeContent = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate ATS-friendly content for this resume outline based on the job description and current resume. First, thoroughly analyze the current resume content, then enhance it while maintaining authenticity. Return ONLY a valid JSON object without any markdown formatting or additional text:

Job Description:
${jobDescription}

Current Resume Content:
${resumeContent}

Resume Outline:
${JSON.stringify(resumeSections, null, 2)}

Instructions:
1. First, analyze the current resume content in detail:
   - Extract and preserve all existing content
   - Keep all specific achievements, numbers, and metrics
   - Maintain the original writing style and tone
   - Preserve unique details and accomplishments
   - Keep the candidate's actual experience level

2. Then, enhance the content while maintaining authenticity:
   - Use the existing content as the primary source
   - Optimize wording for ATS without changing facts
   - Add relevant keywords naturally within existing content
   - Keep all authentic achievements and experiences
   - Maintain the candidate's voice and style

3. For each section:
   - Start with the existing content from the current resume
   - Enhance it with ATS-friendly language
   - Add missing but relevant information only if necessary
   - Keep all specific details and metrics
   - Preserve the original structure and flow

4. Calculate final ATS scores based on:
   - How well the enhanced content matches job requirements
   - Improved format while maintaining authenticity
   - Content relevance and completeness
   - Overall ATS compatibility

The JSON should have this exact structure:
{
  "sections": [
    {
      "title": "Section Title",
      "content": "Enhanced content based primarily on existing resume content",
      "score": 0-100
    }
  ],
  "atsAnalysis": {
    "overallScore": 0-100,
    "keywordMatch": 0-100,
    "formatScore": 0-100,
    "contentScore": 0-100,
    "missingKeywords": [],
    "suggestions": []
  }
}

Important: The generated content should be based primarily on the existing resume content, with minimal additions. Only add new content if it's absolutely necessary for the job requirements.`
            }]
          }]
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate content')
      }

      const data = await response.json()
      let contentText = data.candidates[0].content.parts[0].text
      contentText = contentText.replace(/```json\n?|\n?```/g, '').trim()
      
      const content = JSON.parse(contentText)
      setResumeSections(content.sections)
      setAtsAnalysis(content.atsAnalysis)
      setShowOutline(false)

      toast({
        title: "Content Generated",
        description: "Your ATS-friendly resume content has been generated.",
      })
    } catch (error) {
      console.error('Error generating content:', error)
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadResume = () => {
    // Create a formatted text version of the resume
    const resumeText = resumeSections
      .map(section => `${section.title}\n${'-'.repeat(section.title.length)}\n${section.content}\n`)
      .join('\n')

    // Create and download the file
    const blob = new Blob([resumeText], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ats-optimized-resume.txt'
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)

    toast({
      title: "Download Started",
      description: "Your resume has been downloaded.",
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const handleSectionEdit = (index: number, newContent: string) => {
    const updatedSections = [...resumeSections]
    updatedSections[index] = {
      ...updatedSections[index],
      content: newContent
    }
    setResumeSections(updatedSections)
  }

  const toggleSectionEdit = (index: number) => {
    const updatedSections = [...resumeSections]
    updatedSections[index] = {
      ...updatedSections[index],
      isEditing: !updatedSections[index].isEditing
    }
    setResumeSections(updatedSections)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <StudentSidebar />

      <main className="md:pl-64 pt-16 md:pt-0">
        <div className="container mx-auto p-6">
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">ATS Resume Builder</h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Create an ATS-optimized resume that matches your target job
                </p>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Input Details</CardTitle>
                  <CardDescription>Upload your resume and enter target job description</CardDescription>
                </CardHeader>
                <CardContent>
                      <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Current Resume</Label>
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                          accept=".pdf,.doc,.docx,.txt"
                          className="hidden"
                        />
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full"
                        >
                          <LucideUpload className="mr-2 h-4 w-4" />
                          {resumeFile ? resumeFile.name : "Upload Resume"}
                            </Button>
                        {resumeFile && (
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            <LucideCheckCircle className="h-4 w-4 mr-1" />
                            Uploaded
                          </Badge>
                        )}
                          </div>
                        </div>

                    <div className="space-y-2">
                      <Label>Job Description</Label>
                      <Textarea
                        placeholder="Paste the job description here..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        className="min-h-[200px]"
                      />
                        </div>

                    <Button 
                      onClick={generateResumeOutline}
                      disabled={isAnalyzing || !jobDescription.trim() || !resumeContent.trim()}
                      className="w-full"
                    >
                      {isAnalyzing ? "Generating Outline..." : "Generate Resume Outline"}
                            </Button>
                          </div>
                </CardContent>
              </Card>

              {showOutline && (
                <Card>
                  <CardHeader>
                    <CardTitle>Resume Outline</CardTitle>
                    <CardDescription>Review the outline before generating content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {resumeSections.map((section, index) => (
                        <div key={index} className="space-y-2">
                          <h3 className="font-semibold">{section.title}</h3>
                          <p className="text-slate-600 dark:text-slate-400">{section.content}</p>
                        </div>
                      ))}

                      <Button 
                        onClick={generateResumeContent}
                        disabled={isGenerating}
                        className="w-full"
                      >
                        {isGenerating ? "Generating Content..." : "Generate Resume Content"}
                            </Button>
                          </div>
                  </CardContent>
                </Card>
              )}

              {!showOutline && resumeSections.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Generated Resume</CardTitle>
                    <CardDescription>Your ATS-optimized resume content (click on any section to edit)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {resumeSections.map((section, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{section.title}</h3>
                            <div className="flex items-center gap-2">
                              <Badge className={getScoreColor(section.score)}>
                                Score: {section.score}%
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleSectionEdit(index)}
                                className="h-8 px-2"
                              >
                                {section.isEditing ? "Done" : "Edit"}
                              </Button>
                            </div>
                          </div>
                          {section.isEditing ? (
                            <Textarea
                              value={section.content}
                              onChange={(e) => handleSectionEdit(index, e.target.value)}
                              className="min-h-[150px] font-mono text-sm"
                            />
                          ) : (
                            <p className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                              {section.content}
                            </p>
                          )}
                        </div>
                      ))}

                      <div className="flex gap-4">
                        <Button 
                          onClick={downloadResume}
                          className="flex-1"
                        >
                          <LucideDownload className="mr-2 h-4 w-4" />
                          Download Resume
                        </Button>
                        <Button 
                          onClick={generateResumeContent}
                                  variant="outline"
                          className="flex-1"
                        >
                          <LucideFileText className="mr-2 h-4 w-4" />
                          Regenerate Content
                        </Button>
                        </div>
                      </div>
                </CardContent>
              </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>ATS Score</CardTitle>
                  <CardDescription>Overall resume optimization score</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-purple-600 mb-2">
                        {atsAnalysis.overallScore}%
                      </div>
                      <Progress value={atsAnalysis.overallScore} className="h-2" />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label>Keyword Match</Label>
                        <Progress value={atsAnalysis.keywordMatch} className="h-2" />
                        <div className="text-sm text-slate-500 mt-1">
                          {atsAnalysis.keywordMatch}% match with job requirements
                        </div>
                      </div>

                      <div>
                        <Label>Format Score</Label>
                        <Progress value={atsAnalysis.formatScore} className="h-2" />
                        <div className="text-sm text-slate-500 mt-1">
                          {atsAnalysis.formatScore}% ATS-friendly format
                    </div>
                      </div>

                      <div>
                        <Label>Content Score</Label>
                        <Progress value={atsAnalysis.contentScore} className="h-2" />
                        <div className="text-sm text-slate-500 mt-1">
                          {atsAnalysis.contentScore}% relevant content
                        </div>
                      </div>
                    </div>

                    {atsAnalysis.missingKeywords.length > 0 && (
                      <div className="mt-4">
                        <Label>Missing Keywords</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {atsAnalysis.missingKeywords.map((keyword, index) => (
                            <Badge key={index} variant="outline" className="text-red-600">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {atsAnalysis.suggestions.length > 0 && (
                      <div className="mt-4">
                        <Label>Optimization Tips</Label>
                        <ul className="mt-2 space-y-2">
                          {atsAnalysis.suggestions.map((suggestion, index) => (
                            <li key={index} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                              <LucideAlertCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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
