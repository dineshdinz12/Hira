"use client"

import { RecruiterSidebar } from "@/components/recruiter/sidebar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  LucideCode, 
  LucideEye, 
  LucideMessageSquare, 
  LucideMonitor, 
  LucideTimer,
  LucideVideo,
  LucideMic,
  LucideShield,
  LucideBrain,
  LucideFileText,
  LucideAlertTriangle,
  LucideCheckCircle,
  LucideXCircle,
  LucideBarChart2,
  LucidePlay,
  LucideSend,
  LucideClock
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Editor from "@monaco-editor/react"
import { useToast } from "@/components/ui/use-toast"
import { questions, Question } from "./questions"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Mock data for demonstration
const mockCandidates = [
  { id: 1, name: "John Doe", role: "Senior Developer", score: 85, status: "active" },
  { id: 2, name: "Jane Smith", role: "Full Stack Developer", score: 92, status: "completed" },
  { id: 3, name: "Alex Johnson", role: "Backend Developer", score: 78, status: "scheduled" },
]

const mockQuestions = [
  {
    id: 1,
    type: "DSA",
    difficulty: "Medium",
    question: "Implement a LRU Cache",
    description: "Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get and put.",
    template: `class LRUCache {
  constructor(capacity) {
    // Initialize your data structure here
  }

  get(key) {
    // Implement get operation
  }

  put(key, value) {
    // Implement put operation
  }
}`,
    testCases: [
      { input: "cache = new LRUCache(2); cache.put(1, 1); cache.put(2, 2); cache.get(1);", output: "1" },
      { input: "cache.put(3, 3); cache.get(2);", output: "-1" }
    ]
  },
  {
    id: 2,
    type: "System Design",
    difficulty: "Hard",
    question: "Design a real-time chat system",
    description: "Design a scalable real-time chat system that can handle millions of concurrent users.",
    template: `class ChatSystem {
  constructor() {
    // Initialize your system here
  }

  sendMessage(userId, message) {
    // Implement message sending
  }

  getMessages(channelId) {
    // Implement message retrieval
  }
}`,
    testCases: [
      { input: "system = new ChatSystem(); system.sendMessage(1, 'Hello');", output: "Message sent" },
      { input: "system.getMessages('general');", output: "['Hello']" }
    ]
  }
]

// Add language options
const languageOptions = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
]

// Add this function before the CodingProctor component
const getRandomQuestions = (count: number) => {
  // Get all questions
  const allQuestions = [...questions]
  
  // Randomly select 2 questions
  const shuffled = allQuestions.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Update the Question interface
interface Question {
  id: number;
  type: string;
  difficulty: string;
  question: string;
  description: string;
  template: string;
  testCases: { input: string; output: string }[];
  followUpQuestions: {
    mcq: Array<{
      question: string;
      options: string[];
      correctAnswer: string;
    }>;
    tricky: Array<{
      question: string;
      correctAnswer: string;
    }>;
  };
}

export default function CodingProctor() {
  const [activeTab, setActiveTab] = useState("live")
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [code, setCode] = useState("")
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isTestStarted, setIsTestStarted] = useState(false)
  const [currentPhase, setCurrentPhase] = useState<'coding' | 'mcq' | 'concept' | 'tricky' | 'followup'>('coding')
  const [currentMcqIndex, setCurrentMcqIndex] = useState(0)
  const [currentConceptIndex, setCurrentConceptIndex] = useState(0)
  const [currentTrickyIndex, setCurrentTrickyIndex] = useState(0)
  const [mcqAnswers, setMcqAnswers] = useState<string[]>([])
  const [conceptAnswers, setConceptAnswers] = useState<string[]>([])
  const [trickyAnswers, setTrickyAnswers] = useState<string[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isFollowUpComplete, setIsFollowUpComplete] = useState(false)
  const videoRef = useRef(null)
  const recognitionRef = useRef(null)
  const { toast } = useToast()
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([])
  const [currentFollowUpIndex, setCurrentFollowUpIndex] = useState(0)
  const [followUpAnswers, setFollowUpAnswers] = useState<string[]>([])
  const [evaluationMetrics, setEvaluationMetrics] = useState({
    correctness: 0,
    timeComplexity: 0,
    spaceComplexity: 0,
    codeQuality: 0,
    feedback: ''
  })
  const [finalResults, setFinalResults] = useState({
    codingScore: 0,
    mcqScore: 0,
    conceptScore: 0,
    trickyScore: 0,
    totalScore: 0,
    questionDetails: []
  })
  const [showResults, setShowResults] = useState(false)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = 'en-US'

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('')
        setTranscript(transcript)
      }

      recognitionRef.current = recognition
    }
  }, [])

  // Update timer effect to handle all phases properly
  useEffect(() => {
    if (isTestStarted && timeLeft > 0) {
      // Clear any existing timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      // Start new timer
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
            // Auto-submit based on current phase
            if (currentPhase === 'mcq') {
              handleMcqSubmit();
            } else if (currentPhase === 'concept') {
              handleConceptSubmit();
            } else if (currentPhase === 'tricky') {
              handleTrickySubmit();
            } else if (currentPhase === 'coding') {
              handleSubmit();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTestStarted, timeLeft, currentPhase]);

  const startTest = () => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    
    // Reset all state variables
    setCurrentQuestionIndex(0)
    setCurrentMcqIndex(0)
    setCurrentTrickyIndex(0)
    setScore(0)
    setMcqAnswers([])
    setTrickyAnswers([])
    setTranscript('')
    setTimeLeft(20 * 60) // 20 minutes
    setCurrentPhase('coding')
    setIsFollowUpComplete(false)
    setEvaluationMetrics({
      correctness: 0,
      timeComplexity: 0,
      spaceComplexity: 0,
      codeQuality: 0,
      feedback: ''
    })
    setFinalResults({
      codingScore: 0,
      mcqScore: 0,
      conceptScore: 0,
      trickyScore: 0,
      totalScore: 0,
      questionDetails: []
    })
    
    // Select 2 random questions
    const randomQuestions = getRandomQuestions(2)
    setSelectedQuestions(randomQuestions)
    
    // Set first question
    if (randomQuestions.length > 0) {
      setCurrentQuestion(randomQuestions[0])
      setCode(randomQuestions[0].template || "")
    } else {
      toast({
        title: "Error",
        description: "No questions available. Please try again.",
        variant: "destructive",
      })
      return
    }
    
    setIsTestStarted(true)
  }

  const handleTimeUp = () => {
    if (currentPhase === 'coding') {
      handleSubmit();
    } else if (currentPhase === 'mcq') {
      handleMcqSubmit();
    } else if (currentPhase === 'concept') {
      handleConceptSubmit();
    } else if (currentPhase === 'tricky') {
      handleTrickySubmit();
    } else if (currentPhase === 'followup') {
      handleFollowUpSubmit();
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async () => {
    if (!currentQuestion) return;

    try {
      // Get evaluation from Gemini
      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an expert code evaluator. Evaluate the following code solution for the given question.

Question: ${currentQuestion.question}
Description: ${currentQuestion.description}
Expected Output: ${currentQuestion.testCases.map(tc => `Input: ${tc.input}, Output: ${tc.output}`).join('\n')}

Solution Code:
${code}

Evaluate if the solution is correct and provide a score out of 50.
Return the response in this exact format:
SCORE: [0-50]
FEEDBACK: [brief explanation of the solution]`
            }]
          }],
          generationConfig: {
            temperature: 0.2,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Gemini API Error:', data);
        throw new Error(`Failed to get evaluation from Gemini: ${data.error?.message || 'Unknown error'}`);
      }
      
      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error('Invalid response format from Gemini API');
      }

      const evaluationText = data.candidates[0].content.parts[0].text.trim();
      const scoreMatch = evaluationText.match(/SCORE: (\d+)/);
      const feedbackMatch = evaluationText.match(/FEEDBACK: (.*)/);

      if (!scoreMatch) {
        throw new Error('Could not parse score from Gemini response');
      }

      const totalScore = parseInt(scoreMatch[1]);
      const feedback = feedbackMatch?.[1] || 'No feedback provided';

      // Store the current question's scores
      const currentQuestionScores = {
        question: currentQuestion.question,
        codingScore: totalScore,
        mcqScore: 0,
        conceptScore: 0,
        trickyScore: 0,
        totalScore: totalScore,
        feedback: feedback
      };

      // Update evaluation metrics
      setEvaluationMetrics({
        correctness: totalScore,
        timeComplexity: 0,
        spaceComplexity: 0,
        codeQuality: 0,
        feedback
      });

      // Check if score is above threshold (25 out of 50)
      if (totalScore >= 25) {
        // Move to MCQ phase
        setCurrentPhase('mcq');
        setCurrentMcqIndex(0);
        setTimeLeft(10); // 10 seconds for first MCQ
        setTranscript(''); // Clear transcript for first MCQ
      } else {
        // Score is below threshold
        if (currentQuestionIndex < selectedQuestions.length - 1) {
          // Move to next question
          setCurrentQuestionIndex(prev => prev + 1);
          setCurrentQuestion(selectedQuestions[currentQuestionIndex + 1]);
          setCode(selectedQuestions[currentQuestionIndex + 1].template || "");
          setTimeLeft(20 * 60); // 20 minutes for next question
          setCurrentPhase('coding');
        } else {
          // End test and show results
          setFinalResults(prev => ({
            ...prev,
            questionDetails: [...prev.questionDetails, currentQuestionScores],
            totalScore: prev.totalScore + totalScore
          }));
          setShowResults(true);
          setIsTestStarted(false);
        }
      }

      toast({
        title: "Answer Submitted",
        description: `Score: ${totalScore}/50`,
      });
    } catch (error) {
      console.error('Error submitting answer:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit answer. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleMcqSubmit = () => {
    // If we're at the end of MCQs or no MCQs available, move to tricky questions
    if (currentMcqIndex >= 2 || !currentQuestion?.followUpQuestions?.mcq || currentQuestion.followUpQuestions.mcq.length <= currentMcqIndex) {
      // Calculate total MCQ score (30 points total)
      const totalMcqScore = mcqAnswers.reduce((total, answer, index) => {
        return total + (answer === currentQuestion?.followUpQuestions?.mcq?.[index]?.correctAnswer ? 10 : 0);
      }, 0);

      // Update final results with MCQ score
      setFinalResults(prev => ({
        ...prev,
        questionDetails: prev.questionDetails.map((detail, index) => {
          if (index === currentQuestionIndex) {
            return {
              ...detail,
              mcqScore: totalMcqScore
            };
          }
          return detail;
        })
      }));

      // Move to tricky questions
      setCurrentPhase('tricky');
      setCurrentTrickyIndex(0);
      setTimeLeft(30); // 30 seconds for first tricky question
      setTranscript(''); // Clear transcript for tricky question
      return;
    }

    const newAnswers = [...mcqAnswers];
    newAnswers[currentMcqIndex] = transcript;
    setMcqAnswers(newAnswers);

    // Evaluate MCQ answer using AI
    evaluateMcqAnswer(transcript, currentQuestion.followUpQuestions.mcq[currentMcqIndex].question)
      .then((score) => {
        setCurrentMcqIndex(prev => prev + 1);
        setTimeLeft(5); // 5 seconds for next MCQ
        setTranscript(''); // Clear transcript for next question
      })
      .catch(error => {
        console.error('Error evaluating MCQ answer:', error);
        toast({
          title: "Error",
          description: "Failed to evaluate answer. Please try again.",
          variant: "destructive",
        });
      });
  };

  const evaluateMcqAnswer = async (answer: string, question: string) => {
    if (!answer || !question) {
      console.error('Invalid answer or question');
      return 0;
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an expert evaluator. Evaluate the following MCQ answer.

Question: ${question}
Answer: ${answer}

Evaluate if the answer is correct and provide a score (0 or 10).
Return the response in this exact format:
SCORE: [0 or 10]
FEEDBACK: [brief explanation]`
            }]
          }],
          generationConfig: {
            temperature: 0.2,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Gemini API Error:', data);
        throw new Error(`Failed to get evaluation: ${data.error?.message || 'Unknown error'}`);
      }

      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error('Invalid response format from Gemini API');
      }

      const evaluationText = data.candidates[0].content.parts[0].text.trim();
      const scoreMatch = evaluationText.match(/SCORE: (\d+)/);
      const feedbackMatch = evaluationText.match(/FEEDBACK: (.*)/);

      if (!scoreMatch) {
        throw new Error('Could not parse score from Gemini response');
      }

      const score = parseInt(scoreMatch[1]);
      const feedback = feedbackMatch?.[1] || 'No feedback provided';

      // Update evaluation metrics with feedback
      setEvaluationMetrics(prev => ({
        ...prev,
        feedback: feedback
      }));
      
      return score;
    } catch (error) {
      console.error('Error evaluating MCQ answer:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to evaluate answer. Please try again.",
        variant: "destructive",
      });
      return 0;
    }
  };

  const handleConceptSubmit = () => {
    const newAnswers = [...conceptAnswers];
    newAnswers[currentConceptIndex] = transcript;
    setConceptAnswers(newAnswers);

    // Evaluate concept answer using AI
    evaluateConceptAnswer(transcript, currentQuestion?.followUpQuestions.concept[currentConceptIndex].question)
      .then((score) => {
        // Update final results with concept score
        setFinalResults(prev => ({
          ...prev,
          questionDetails: prev.questionDetails.map((detail, index) => {
            if (index === currentQuestionIndex) {
              return {
                ...detail,
                conceptScore: score
              };
            }
            return detail;
          })
        }));

        setCurrentPhase('tricky');
        setTimeLeft(30); // 30 seconds for tricky question
        setTranscript(''); // Clear transcript for tricky question
      });
  };

  const evaluateConceptAnswer = async (answer: string, question: string) => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an expert evaluator. Evaluate the following concept question answer.

Question: ${question}
Answer: ${answer}

Evaluate the answer and provide a score out of 10.
Return the response in this exact format:
SCORE: [0-10]
FEEDBACK: [brief explanation]`
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get evaluation');
      }

      const data = await response.json();
      const evaluationText = data.candidates[0].content.parts[0].text.trim();
      const score = parseInt(evaluationText.match(/SCORE: (\d+)/)?.[1] || '0');
      
      return score;
    } catch (error) {
      console.error('Error evaluating concept answer:', error);
      return 0;
    }
  };

  const handleTrickySubmit = () => {
    // If we're at the end of tricky questions, move to next question or show results
    if (currentTrickyIndex >= 1 || !currentQuestion?.followUpQuestions?.tricky || currentQuestion.followUpQuestions.tricky.length <= currentTrickyIndex) {
      // Calculate total tricky score (20 points total)
      const totalTrickyScore = trickyAnswers.reduce((total, answer, index) => {
        return total + (answer === currentQuestion?.followUpQuestions?.tricky?.[index]?.correctAnswer ? 10 : 0);
      }, 0);

      // Update final results with tricky score
      setFinalResults(prev => ({
        ...prev,
        questionDetails: prev.questionDetails.map((detail, index) => {
          if (index === currentQuestionIndex) {
            return {
              ...detail,
              trickyScore: totalTrickyScore,
              totalScore: detail.codingScore + detail.mcqScore + totalTrickyScore
            };
          }
          return detail;
        })
      }));

      // Move to next question or show results
      if (currentQuestionIndex < selectedQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setCurrentQuestion(selectedQuestions[currentQuestionIndex + 1]);
        setCode(selectedQuestions[currentQuestionIndex + 1].template || "");
        setTimeLeft(20 * 60); // 20 minutes for next question
        setCurrentPhase('coding');
        setScore(0);
        setMcqAnswers([]);
        setTrickyAnswers([]);
        setCurrentTrickyIndex(0);
      } else {
        setShowResults(true);
        setIsTestStarted(false);
      }
      return;
    }

    // Handle current tricky question
    if (!currentQuestion?.followUpQuestions?.tricky?.[currentTrickyIndex]) {
      // If no more tricky questions, move to next question or show results
      if (currentQuestionIndex < selectedQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setCurrentQuestion(selectedQuestions[currentQuestionIndex + 1]);
        setCode(selectedQuestions[currentQuestionIndex + 1].template || "");
        setTimeLeft(20 * 60); // 20 minutes for next question
        setCurrentPhase('coding');
        setScore(0);
        setMcqAnswers([]);
        setTrickyAnswers([]);
        setCurrentTrickyIndex(0);
      } else {
        setShowResults(true);
        setIsTestStarted(false);
      }
      return;
    }

    const newAnswers = [...trickyAnswers];
    newAnswers[currentTrickyIndex] = transcript;
    setTrickyAnswers(newAnswers);

    // Evaluate tricky answer using AI
    evaluateTrickyAnswer(transcript, currentQuestion.followUpQuestions.tricky[currentTrickyIndex].question)
      .then((score) => {
        setCurrentTrickyIndex(prev => prev + 1);
        setTimeLeft(30); // 30 seconds for next tricky question
        setTranscript(''); // Clear transcript for next question
      })
      .catch(error => {
        console.error('Error evaluating tricky answer:', error);
        toast({
          title: "Error",
          description: "Failed to evaluate answer. Please try again.",
          variant: "destructive",
        });
      });
  };

  const evaluateTrickyAnswer = async (answer: string, question: string) => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an expert evaluator. Evaluate the following tricky question answer.

Question: ${question}
Answer: ${answer}

Evaluate the answer and provide a score out of 10.
Return the response in this exact format:
SCORE: [0-10]
FEEDBACK: [brief explanation]`
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get evaluation');
      }

      const data = await response.json();
      const evaluationText = data.candidates[0].content.parts[0].text.trim();
      const score = parseInt(evaluationText.match(/SCORE: (\d+)/)?.[1] || '0');
      
      return score;
    } catch (error) {
      console.error('Error evaluating tricky answer:', error);
      return 0;
    }
  };

  const handleFollowUpSubmit = () => {
    const newAnswers = [...followUpAnswers]
    newAnswers[currentFollowUpIndex] = transcript
    setFollowUpAnswers(newAnswers)

    if (currentFollowUpIndex < 4) { // 5 follow-up questions (0-4)
      setCurrentFollowUpIndex(prev => prev + 1)
      setTimeLeft(60) // 1 minute for next follow-up question
    } else {
      // Calculate final score for this question
      const followUpScore = followUpAnswers.reduce((score, answer, index) => {
        return score + (answer === currentQuestion?.followUpQuestions[currentFollowUpIndex].correctAnswer ? 20 : 0)
      }, 0)

      const finalScore = (score + followUpScore) / 2

      toast({
        title: "Question Score",
        description: `Final Score for this question: ${finalScore.toFixed(2)}%`,
      })

      // Move to next question after a short delay
      setTimeout(() => {
        const nextIndex = currentQuestionIndex + 1
        if (nextIndex < selectedQuestions.length) {
          setCurrentQuestionIndex(nextIndex)
          setCurrentQuestion(selectedQuestions[nextIndex])
          setTimeLeft(20 * 60) // 20 minutes for next question
          setCode(selectedQuestions[nextIndex].template || "")
          setCurrentPhase('coding')
          setScore(0)
          setFollowUpAnswers([])
          setCurrentFollowUpIndex(0)
        } else {
          setIsTestStarted(false)
          toast({
            title: "Test Completed",
            description: "You have completed all questions.",
          })
        }
      }, 2000)
    }
  }

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop()
    } else {
      recognitionRef.current?.start()
    }
    setIsRecording(!isRecording)
  }

  // Start camera when component mounts
  useEffect(() => {
    if (isCameraActive) {
      startCamera()
    }
    return () => {
      stopCamera()
    }
  }, [isCameraActive])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      toast({
        title: "Camera Error",
        description: "Could not access camera. Please check permissions.",
        variant: "destructive"
      })
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks()
      tracks.forEach(track => track.stop())
      videoRef.current.srcObject = null
    }
  }

  const handleCodeChange = (value: string | undefined) => {
    setCode(value || "")
  }

  const calculateSimilarity = (code1, code2) => {
    // Simple implementation of Levenshtein distance
    const m = code1.length
    const n = code2.length
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0))

    for (let i = 0; i <= m; i++) dp[i][0] = i
    for (let j = 0; j <= n; j++) dp[0][j] = j

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (code1[i - 1] === code2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1]
        } else {
          dp[i][j] = Math.min(
            dp[i - 1][j - 1] + 1,
            dp[i - 1][j] + 1,
            dp[i][j - 1] + 1
          )
        }
      }
    }

    const maxLength = Math.max(m, n)
    return ((maxLength - dp[m][n]) / maxLength) * 100
  }

  const EvaluationCard = () => (
    <Card>
      <CardHeader>
        <CardTitle>Evaluation</CardTitle>
        <CardDescription>Detailed solution analysis</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Overall Score</Label>
          <div className="text-2xl font-bold text-purple-600">{score.toFixed(2)}%</div>
          <Progress value={score} />
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Correctness</Label>
              <Progress value={evaluationMetrics.correctness} />
              <div className="text-sm text-slate-500">{evaluationMetrics.correctness}/40</div>
            </div>
            <div className="space-y-2">
              <Label>Time Complexity</Label>
              <Progress value={evaluationMetrics.timeComplexity} />
              <div className="text-sm text-slate-500">{evaluationMetrics.timeComplexity}/20</div>
            </div>
            <div className="space-y-2">
              <Label>Space Complexity</Label>
              <Progress value={evaluationMetrics.spaceComplexity} />
              <div className="text-sm text-slate-500">{evaluationMetrics.spaceComplexity}/20</div>
            </div>
            <div className="space-y-2">
              <Label>Code Quality</Label>
              <Progress value={evaluationMetrics.codeQuality} />
              <div className="text-sm text-slate-500">{evaluationMetrics.codeQuality}/20</div>
            </div>
          </div>
        </div>

        {evaluationMetrics.feedback && (
          <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <Label className="mb-2">Feedback</Label>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {evaluationMetrics.feedback}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const ResultsPage = () => {
    const calculateTotalScore = () => {
      if (finalResults.questionDetails.length === 0) return 0;
      
      // Calculate total score for each question
      const questionScores = finalResults.questionDetails.map(detail => {
        // Each question has:
        // - Coding score (50 points)
        // - MCQ score (30 points total - 10 points each)
        // - Tricky score (20 points total - 10 points each)
        const totalQuestionScore = detail.codingScore + detail.mcqScore + detail.trickyScore;
        return totalQuestionScore;
      });

      // Calculate average score across all questions
      const totalScore = questionScores.reduce((sum, score) => sum + score, 0) / questionScores.length;
      return totalScore;
    };

    const calculateQuestionTotal = (detail) => {
      // Each question has a maximum of 100 points:
      // - Coding: 50 points
      // - MCQ: 30 points
      // - Tricky: 20 points
      const total = detail.codingScore + detail.mcqScore + detail.trickyScore;
      return total;
    };

    return (
      <div className="fixed inset-0 bg-slate-50 dark:bg-slate-950 z-50 overflow-y-auto">
        <div className="container mx-auto p-6">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl">Assessment Results</CardTitle>
              <CardDescription>Detailed evaluation of the candidate's performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Overall Score</h3>
                    <div className="text-5xl font-bold text-purple-600">
                      {calculateTotalScore().toFixed(2)}%
                    </div>
                  </div>
                  <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Questions Completed</h3>
                    <div className="text-5xl font-bold text-purple-600">
                      {finalResults.questionDetails.length}
                    </div>
                  </div>
                </div>

                {finalResults.questionDetails.map((detail, index) => (
                  <Card key={index} className="border-2">
                    <CardHeader>
                      <CardTitle className="text-2xl">Question {index + 1}</CardTitle>
                      <CardDescription className="text-lg">{detail.question}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-lg">Coding Score</Label>
                            <Progress value={detail.codingScore} className="h-4" />
                            <div className="text-xl font-semibold text-purple-600 mt-2">{detail.codingScore}%</div>
                          </div>
                          <div>
                            <Label className="text-lg">MCQ Score</Label>
                            <Progress value={detail.mcqScore} className="h-4" />
                            <div className="text-xl font-semibold text-purple-600 mt-2">{detail.mcqScore}%</div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-lg">Tricky Score</Label>
                            <Progress value={detail.trickyScore} className="h-4" />
                            <div className="text-xl font-semibold text-purple-600 mt-2">{detail.trickyScore}%</div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 p-6 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          Question Total: {calculateQuestionTotal(detail)}%
                        </div>
                        {detail.feedback && (
                          <div className="mt-4">
                            <Label className="text-lg">Feedback</Label>
                            <p className="mt-2 text-slate-600 dark:text-slate-400">
                              {detail.feedback}
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="flex justify-center mt-8">
                  <Button 
                    onClick={() => {
                      setShowResults(false);
                      startTest();
                    }}
                    className="px-8 py-6 text-lg"
                  >
                    Start New Assessment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // Add NextButton component
  const NextButton = () => (
    <Button 
      onClick={() => {
        if (currentPhase === 'mcq') {
          handleMcqSubmit();
        } else if (currentPhase === 'concept') {
          handleConceptSubmit();
        } else if (currentPhase === 'tricky') {
          handleTrickySubmit();
        }
      }}
      className="mt-4"
    >
      Next Question
    </Button>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <RecruiterSidebar />

      <main className="md:pl-64 pt-16 md:pt-0">
        <div className="container mx-auto p-6">
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">AI Technical Interview Proctor</h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Real-time AI-powered technical assessment and evaluation
                </p>
              </div>
              <div className="flex gap-2">
                {!isTestStarted ? (
                  <Button onClick={startTest}>
                    <LucidePlay className="mr-2 h-4 w-4" />
                    Start Test
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" onClick={() => setIsCameraActive(!isCameraActive)}>
                      <LucideVideo className="mr-2 h-4 w-4" />
                      {isCameraActive ? "Stop Camera" : "Start Camera"}
                    </Button>
                    <Button onClick={handleSubmit}>
                      <LucideSend className="mr-2 h-4 w-4" />
                      Submit Solution
                    </Button>
                  </>
                )}
              </div>
            </div>
          </header>

          {isTestStarted && (
            <div className="mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <LucideClock className="h-5 w-5 text-red-500" />
                      <span className="text-lg font-semibold">
                        Time Left: {formatTime(timeLeft)}
                      </span>
                    </div>
                    <Badge variant={currentPhase === 'coding' ? 'default' : currentPhase === 'mcq' ? 'secondary' : currentPhase === 'concept' ? 'destructive' : 'default'}>
                      {currentPhase.toUpperCase()}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {currentPhase === 'coding' && currentQuestion && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>Problem Statement</CardTitle>
                      <CardDescription>{currentQuestion.type} - {currentQuestion.difficulty}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <h3 className="font-semibold">{currentQuestion.question}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {currentQuestion.description}
                        </p>
                        <div className="space-y-2">
                          <Label>Test Cases:</Label>
                          {currentQuestion.testCases.map((testCase, index) => (
                            <div key={index} className="p-2 bg-slate-100 dark:bg-slate-800 rounded">
                              <p className="text-sm font-mono">Input: {testCase.input}</p>
                              <p className="text-sm font-mono">Output: {testCase.output}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="h-[600px]">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Code Editor</CardTitle>
                          <CardDescription>Write your solution here</CardDescription>
                        </div>
                        <Select
                          value={selectedLanguage}
                          onValueChange={setSelectedLanguage}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            {languageOptions.map(lang => (
                              <SelectItem key={lang.value} value={lang.value}>
                                {lang.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardHeader>
                    <CardContent className="h-[500px]">
                      <Editor
                        height="100%"
                        language={selectedLanguage}
                        theme="vs-dark"
                        value={code}
                        onChange={handleCodeChange}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          wordWrap: "on",
                          automaticLayout: true,
                          tabSize: 2,
                          scrollBeyondLastLine: false,
                          lineNumbers: "on",
                          renderWhitespace: "selection",
                          formatOnPaste: true,
                          formatOnType: true,
                          suggestOnTriggerCharacters: true,
                          quickSuggestions: true,
                          parameterHints: { enabled: true },
                          snippetSuggestions: "inline",
                          wordBasedSuggestions: true,
                          suggest: {
                            preview: true,
                            showMethods: true,
                            showFunctions: true,
                            showConstructors: true,
                            showFields: true,
                            showVariables: true,
                            showClasses: true,
                            showStructs: true,
                            showInterfaces: true,
                            showModules: true,
                            showProperties: true,
                            showEvents: true,
                            showOperators: true,
                            showUnits: true,
                            showValues: true,
                            showConstants: true,
                            showEnums: true,
                            showEnumMembers: true,
                            showKeywords: true,
                            showWords: true,
                            showColors: true,
                            showFiles: true,
                            showReferences: true,
                            showFolders: true,
                            showTypeParameters: true,
                            showSnippets: true
                          }
                        }}
                      />
                    </CardContent>
                  </Card>
                </>
              )}

              {currentPhase === 'mcq' && currentQuestion && (
                <Card>
                  <CardHeader>
                    <CardTitle>Multiple Choice Question {currentMcqIndex + 1}/3</CardTitle>
                    <div className="flex items-center gap-2">
                      <LucideClock className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium">
                        Time Left: {formatTime(timeLeft)}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentQuestion.followUpQuestions?.mcq && currentQuestion.followUpQuestions.mcq.length > currentMcqIndex ? (
                        <>
                          <p className="text-lg">
                            {currentQuestion.followUpQuestions.mcq[currentMcqIndex].question}
                          </p>
                          <RadioGroup
                            value={transcript}
                            onValueChange={setTranscript}
                            className="space-y-2"
                          >
                            {currentQuestion.followUpQuestions.mcq[currentMcqIndex].options.map((option, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <RadioGroupItem value={option} id={`option-${index}`} />
                                <Label htmlFor={`option-${index}`}>{option}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-red-500">No more MCQ questions available</p>
                          <Button 
                            onClick={() => {
                              setCurrentPhase('tricky');
                              setCurrentTrickyIndex(0);
                              setTimeLeft(30);
                              setTranscript('');
                            }}
                            className="mt-4"
                          >
                            Continue to Tricky Questions
                          </Button>
                        </div>
                      )}
                      <NextButton />
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentPhase === 'tricky' && currentQuestion && (
                <Card>
                  <CardHeader>
                    <CardTitle>Tricky Logic Question {currentTrickyIndex + 1}/2</CardTitle>
                    <div className="flex items-center gap-2">
                      <LucideClock className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium">
                        Time Left: {formatTime(timeLeft)}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentQuestion.followUpQuestions?.tricky && currentQuestion.followUpQuestions.tricky.length > currentTrickyIndex ? (
                        <>
                          <p className="text-lg">
                            {currentQuestion.followUpQuestions.tricky[currentTrickyIndex].question}
                          </p>
                          <div className="space-y-2">
                            <Button
                              variant={isRecording ? "destructive" : "default"}
                              onClick={toggleRecording}
                            >
                              <LucideMic className="mr-2 h-4 w-4" />
                              {isRecording ? "Stop Recording" : "Start Recording"}
                            </Button>
                            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded">
                              <p className="text-sm">{transcript || "Your answer will appear here..."}</p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-red-500">No more tricky questions available</p>
                          <Button 
                            onClick={() => {
                              if (currentQuestionIndex < selectedQuestions.length - 1) {
                                setCurrentQuestionIndex(prev => prev + 1);
                                setCurrentQuestion(selectedQuestions[currentQuestionIndex + 1]);
                                setCode(selectedQuestions[currentQuestionIndex + 1].template || "");
                                setTimeLeft(20 * 60);
                                setCurrentPhase('coding');
                                setScore(0);
                                setMcqAnswers([]);
                                setTrickyAnswers([]);
                                setCurrentTrickyIndex(0);
                              } else {
                                setShowResults(true);
                                setIsTestStarted(false);
                              }
                            }}
                            className="mt-4"
                          >
                            {currentQuestionIndex < selectedQuestions.length - 1 ? "Continue to Next Question" : "View Results"}
                          </Button>
                        </div>
                      )}
                      <NextButton />
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentPhase === 'followup' && currentQuestion && (
                <Card>
                  <CardHeader>
                    <CardTitle>Follow-up Question {currentFollowUpIndex + 1}/5</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-lg">{currentQuestion.followUpQuestions[currentFollowUpIndex].question}</p>
                      <div className="space-y-2">
                        <Button
                          variant={isRecording ? "destructive" : "default"}
                          onClick={toggleRecording}
                        >
                          <LucideMic className="mr-2 h-4 w-4" />
                          {isRecording ? "Stop Recording" : "Start Recording"}
                        </Button>
                        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded">
                          <p className="text-sm">{transcript || "Your answer will appear here..."}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Live Camera Feed</CardTitle>
                  <CardDescription>Candidate monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Evaluation</CardTitle>
                  <CardDescription>Solution analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Similarity Score</Label>
                    <div className="text-2xl font-bold text-purple-600">{score.toFixed(2)}%</div>
                    <Progress value={score} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Code Quality Metrics</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded">
                        <div className="text-sm font-medium">Time Complexity</div>
                        <div className="text-xs text-slate-500">O(n)</div>
                      </div>
                      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded">
                        <div className="text-sm font-medium">Space Complexity</div>
                        <div className="text-xs text-slate-500">O(1)</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Monitor</CardTitle>
                  <CardDescription>Real-time malpractice detection</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <LucideShield className="h-4 w-4" />
                      <span className="text-sm font-medium">Browser Lock</span>
                      <Badge variant="outline" className="ml-auto">Active</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <LucideMic className="h-4 w-4" />
                      <span className="text-sm font-medium">Voice Monitoring</span>
                      <Badge variant="outline" className="ml-auto">Active</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <LucideVideo className="h-4 w-4" />
                      <span className="text-sm font-medium">Motion Detection</span>
                      <Badge variant="outline" className="ml-auto">Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {showResults && <ResultsPage />}
    </div>
  )
}
