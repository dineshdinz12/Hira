import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LucideAlertTriangle, LucideClock } from "lucide-react"

interface MCQQuestion {
  question: string
  options: string[]
  correctAnswer: number
}

interface MCQInterviewProps {
  questions: MCQQuestion[]
  onComplete: (score: number, cheatingScore: number) => void
}

export function MCQInterview({ questions, onComplete }: MCQInterviewProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [cheatingScore, setCheatingScore] = useState(0)
  const [isInterviewActive, setIsInterviewActive] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [tabSwitchCount, setTabSwitchCount] = useState(0)
  const [questionTimer, setQuestionTimer] = useState(60) // 1 minute per question
  const { toast } = useToast()

  // Add state for video stream
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle fullscreen
  const enterFullscreen = useCallback(async () => {
    try {
      const element = document.documentElement
      if (element.requestFullscreen) {
        await element.requestFullscreen()
      } else if ((element as any).webkitRequestFullscreen) {
        await (element as any).webkitRequestFullscreen()
      } else if ((element as any).msRequestFullscreen) {
        await (element as any).msRequestFullscreen()
      }
      setIsFullscreen(true)
    } catch (error) {
      console.error('Error entering fullscreen:', error)
    }
  }, [])

  const exitFullscreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen()
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen()
    }
    setIsFullscreen(false)
  }, [])

  // Handle visibility change (tab switching)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isInterviewActive) {
        setTabSwitchCount(prev => prev + 1)
        toast({
          title: "Warning",
          description: "Switching tabs is not allowed during the interview!",
          variant: "destructive",
        })
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [isInterviewActive, toast])

  // Prevent copy-paste
  useEffect(() => {
    if (isInterviewActive) {
      const preventCopyPaste = (e: ClipboardEvent) => {
        e.preventDefault()
        toast({
          title: "Warning",
          description: "Copy-paste is disabled during the interview!",
          variant: "destructive",
        })
      }

      document.addEventListener("copy", preventCopyPaste)
      document.addEventListener("paste", preventCopyPaste)
      return () => {
        document.removeEventListener("copy", preventCopyPaste)
        document.removeEventListener("paste", preventCopyPaste)
      }
    }
  }, [isInterviewActive, toast])

  // Function to start cheating detection
  const startCheatingDetection = useCallback(async () => {
    try {
      // Get video stream
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoStream(stream);

      // Create video element
      const video = document.createElement('video');
      video.srcObject = stream;
      video.autoplay = true;
      video.playsInline = true;
      setVideoElement(video);

      // Wait for video to be ready
      await new Promise((resolve) => {
        video.onloadedmetadata = () => {
          video.play();
          resolve(null);
        };
      });

      // Start processing frames
      const processFrame = async () => {
        if (!video || !isInterviewActive || !isFullscreen) return;

        try {
          setIsProcessing(true);

          // Create canvas and draw video frame
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          ctx.drawImage(video, 0, 0);
          const frame = canvas.toDataURL('image/jpeg');

          // Send frame to backend
          const response = await fetch('http://localhost:5000/process-frame', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ frame }),
          });

          const data = await response.json();

          if (data.status === 'success') {
            // Update cheating score
            setCheatingScore(data.score);

            // Check for high risk
            if (data.risk_level === 'HIGH RISK') {
              toast({
                title: "Warning",
                description: "Suspicious behavior detected!",
                variant: "destructive",
              });
            }

            // Check for multiple faces
            if (data.metrics.multiple_faces) {
              toast({
                title: "Warning",
                description: "Multiple faces detected!",
                variant: "destructive",
              });
            }
          } else {
            console.error('Error processing frame:', data.message);
          }
        } catch (error) {
          console.error('Error sending frame:', error);
        } finally {
          setIsProcessing(false);
        }
      };

      // Process frames every 500ms
      const interval = setInterval(processFrame, 500);

      // Cleanup function
      return () => {
        clearInterval(interval);
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        if (video) {
          video.srcObject = null;
        }
      };
    } catch (error) {
      console.error('Error starting video:', error);
      toast({
        title: "Error",
        description: "Failed to access camera. Please ensure camera permissions are granted.",
        variant: "destructive",
      });
    }
  }, [isInterviewActive, isFullscreen]);

  // Start cheating detection when interview starts
  useEffect(() => {
    if (isInterviewActive && isFullscreen) {
      const cleanup = startCheatingDetection();
      return () => {
        cleanup?.then(cleanupFn => cleanupFn?.());
      };
    }
  }, [isInterviewActive, isFullscreen, startCheatingDetection]);

  // Handle question timer
  useEffect(() => {
    if (isInterviewActive && questionTimer > 0) {
      const timer = setInterval(() => {
        setQuestionTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer)
            handleNext() // Auto-advance to next question
            return 60 // Reset timer for next question
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isInterviewActive, questionTimer])

  const handleStartInterview = async () => {
    await enterFullscreen()
    setIsInterviewActive(true)
    setQuestionTimer(60)
    toast({
      title: "Interview Started",
      description: "Please ensure you are in a well-lit area and your face is visible to the camera.",
    })
  }

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNext = async () => {
    if (selectedAnswer === null) {
      toast({
        title: "Error",
        description: "Please select an answer before proceeding",
        variant: "destructive",
      })
      return
    }

    // Check if answer is correct
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    // Move to next question or end interview
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setQuestionTimer(60) // Reset timer for next question
    } else {
      // End interview
      setIsInterviewActive(false)
      exitFullscreen()
      // Calculate normalized score (0-1)
      const normalizedScore = score / questions.length
      onComplete(normalizedScore, cheatingScore)
    }
  }

  if (!isInterviewActive) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>MCQ Interview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            This interview consists of {questions.length} multiple choice questions. Each question has a 1-minute time limit.
            The interview will be monitored for academic integrity.
          </p>
          <Button onClick={handleStartInterview}>Start Interview</Button>
        </CardContent>
      </Card>
    )
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <Card className="fixed inset-0 z-50 bg-white dark:bg-slate-950">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Question {currentQuestion + 1} of {questions.length}</CardTitle>
          <div className="flex items-center gap-2">
            <LucideClock className="h-4 w-4" />
            <span className={`font-medium ${questionTimer <= 10 ? "text-red-500" : ""}`}>
              {questionTimer}s
            </span>
          </div>
        </div>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">{questions[currentQuestion].question}</h3>
            <RadioGroup value={selectedAnswer?.toString()} onValueChange={(value) => handleAnswer(parseInt(value))}>
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-slate-500">
              Current Score: {score}/{currentQuestion + 1}
            </div>
            <Button onClick={handleNext}>
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>

          {cheatingScore > 0.7 && (
            <Alert variant="destructive">
              <LucideAlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Multiple suspicious behaviors detected. This may affect your final score.
              </AlertDescription>
            </Alert>
          )}

          {tabSwitchCount > 0 && (
            <Alert variant="destructive">
              <LucideAlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Tab switching detected {tabSwitchCount} time{tabSwitchCount > 1 ? 's' : ''}. This will be recorded.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 