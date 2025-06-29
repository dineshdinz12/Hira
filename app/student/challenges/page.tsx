"use client"

import { useState, useEffect } from "react"
import { StudentSidebar } from "@/components/student/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useTheme } from "next-themes"
import Editor from "@monaco-editor/react"
import { 
  LucideCode, 
  LucideClock, 
  LucideCheckCircle, 
  LucideXCircle,
  LucideStar,
  LucideFilter,
  LucideSearch,
  LucideArrowRight,
  LucideLock,
  LucideTrophy,
  LucideBarChart2,
  LucideBookOpen,
  LucidePlay,
  LucideSettings,
  LucideTestTube2,
  LucideFileText,
  LucideLightbulb,
  LucideTimer,
  LucideCopy,
  LucideShare2,
  LucideBookmark,
  LucideBookmarkCheck,
  LucideHistory,
  LucideChevronDown,
  LucideChevronUp
} from "lucide-react"

interface Problem {
  id: string
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  acceptance: string
  status: "solved" | "attempted" | "locked" | null
  tags: string[]
  premium: boolean
  description: string
  examples: { input: string; output: string; explanation?: string }[]
  constraints: string[]
  hints: string[]
  solution: string
  testCases: { input: string; output: string; explanation?: string }[]
}

interface Submission {
  id: string
  problemId: string
  status: "accepted" | "wrong_answer" | "runtime_error" | "time_limit_exceeded"
  runtime: string
  memory: string
  language: string
  timestamp: string
}

interface TestResult {
  input: string
  expected: string
  actual: string
  passed: boolean
  runtime: string
  memory: string
  error?: string
}

interface RunResult {
  results: TestResult[]
  totalPassed: number
  totalTests: number
  executionTime: number
  memoryUsage: string
}

interface EditorSettings {
  fontSize: number
  theme: string
  tabSize: number
  lineNumbers: boolean
  minimap: boolean
  autoSave: boolean
  autoFormat: boolean
}

interface UserProgress {
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  streak: number
  lastSolvedDate: string
  successRate: number
  upcomingRewards: { days: number; reward: string }[]
  bookmarkedProblems: string[]
}

export default function ChallengesPage() {
  const { theme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null)
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("python")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [listTab, setListTab] = useState<"all" | "solved" | "attempted" | "bookmarked">("all")
  const [testResults, setTestResults] = useState<RunResult | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [editorSettings, setEditorSettings] = useState<EditorSettings>({
    fontSize: 14,
    theme: theme === "dark" ? "vs-dark" : "light",
    tabSize: 2,
    lineNumbers: true,
    minimap: true,
    autoSave: true,
    autoFormat: true
  })
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showTestCases, setShowTestCases] = useState(false)
  const [executionTime, setExecutionTime] = useState<number>(0)
  const [memoryUsage, setMemoryUsage] = useState<string>("")
  const [activeTestCase, setActiveTestCase] = useState<number | null>(null)
  const [customInput, setCustomInput] = useState<string>("")
  const [customOutput, setCustomOutput] = useState<string>("")
  const [isRunningCustom, setIsRunningCustom] = useState(false)
  const [userProgress, setUserProgress] = useState<UserProgress>({
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    streak: 0,
    lastSolvedDate: new Date().toISOString(),
    successRate: 0,
    upcomingRewards: [
      { days: 20, reward: "20 Day Badge" },
      { days: 30, reward: "30 Day Achievement" }
    ],
    bookmarkedProblems: []
  })
  const [todaysChallenge, setTodaysChallenge] = useState<Problem | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<string>("")
  const [bookmarkedProblems, setBookmarkedProblems] = useState<string[]>([])
  const [detailTab, setDetailTab] = useState<"description" | "solution" | "submissions">("description")

  // Load saved code and settings from localStorage
  useEffect(() => {
    if (selectedProblem) {
      const savedCode = localStorage.getItem(`code_${selectedProblem.id}_${language}`)
      if (savedCode) {
        setCode(savedCode)
      } else {
        setCode(selectedProblem.solution)
      }
    }
  }, [selectedProblem, language])

  // Save code to localStorage
  useEffect(() => {
    if (selectedProblem && code) {
      localStorage.setItem(`code_${selectedProblem.id}_${language}`, code)
    }
  }, [code, selectedProblem, language])

  // Load user progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem("userProgress")
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress))
    }
  }, [])

  // Save user progress to localStorage
  useEffect(() => {
    localStorage.setItem("userProgress", JSON.stringify(userProgress))
  }, [userProgress])

  // Load bookmarked problems from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarkedProblems")
    if (savedBookmarks) {
      setBookmarkedProblems(JSON.parse(savedBookmarks))
    }
  }, [])

  // Save bookmarked problems to localStorage
  useEffect(() => {
    localStorage.setItem("bookmarkedProblems", JSON.stringify(bookmarkedProblems))
  }, [bookmarkedProblems])

  // Set today's challenge
  useEffect(() => {
    // In a real app, this would be fetched from a backend
    const today = new Date().toISOString().split("T")[0]
    const savedChallenge = localStorage.getItem(`challenge_${today}`)
    
    if (savedChallenge) {
      setTodaysChallenge(JSON.parse(savedChallenge))
    } else {
      // Select a random problem that hasn't been solved yet
      const unsolvedProblems = problems.filter(p => !p.status)
      if (unsolvedProblems.length > 0) {
        const randomIndex = Math.floor(Math.random() * unsolvedProblems.length)
        const challenge = unsolvedProblems[randomIndex]
        setTodaysChallenge(challenge)
        localStorage.setItem(`challenge_${today}`, JSON.stringify(challenge))
      }
    }
  }, [])

  // Update time remaining
  useEffect(() => {
    const updateTimeRemaining = () => {
      const now = new Date()
      const tomorrow = new Date(now)
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)
      
      const diff = tomorrow.getTime() - now.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      
      setTimeRemaining(`${hours}h ${minutes}m`)
    }

    updateTimeRemaining()
    const interval = setInterval(updateTimeRemaining, 60000)
    return () => clearInterval(interval)
  }, [])

  // Update progress when a problem is solved
  const updateProgress = (problem: Problem) => {
    const today = new Date().toISOString().split("T")[0]
    const lastSolved = new Date(userProgress.lastSolvedDate).toISOString().split("T")[0]
    const isNewDay = today !== lastSolved
    const isConsecutive = isNewDay && new Date(userProgress.lastSolvedDate).getTime() === new Date(today).getTime() - 86400000

    setUserProgress(prev => {
      const newStreak = isConsecutive ? prev.streak + 1 : isNewDay ? 1 : prev.streak
      const newSolved = {
        easy: problem.difficulty === "Easy" ? prev.easySolved + 1 : prev.easySolved,
        medium: problem.difficulty === "Medium" ? prev.mediumSolved + 1 : prev.mediumSolved,
        hard: problem.difficulty === "Hard" ? prev.hardSolved + 1 : prev.hardSolved
      }
      const totalSolved = newSolved.easy + newSolved.medium + newSolved.hard
      const successRate = (totalSolved / problems.length) * 100

      return {
        ...prev,
        totalSolved,
        easySolved: newSolved.easy,
        mediumSolved: newSolved.medium,
        hardSolved: newSolved.hard,
        streak: newStreak,
        lastSolvedDate: today,
        successRate
      }
    })
  }

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value)
    }
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code)
    toast.success("Code copied to clipboard!")
  }

  const handleShare = () => {
    const shareData = {
      title: selectedProblem?.title,
      text: `Check out this solution for ${selectedProblem?.title}:\n\n${code}`,
      url: window.location.href
    }
    navigator.share(shareData)
  }

  const handleBookmark = (problemId: string) => {
    setBookmarkedProblems(prev => {
      const isBookmarked = prev.includes(problemId)
      const newBookmarks = isBookmarked
        ? prev.filter(id => id !== problemId)
        : [...prev, problemId]
      
      toast.success(isBookmarked ? "Removed from bookmarks" : "Added to bookmarks")
      return newBookmarks
    })
  }

  const executeCode = async (input: string, language: string): Promise<{ output: string; error?: string }> => {
    // In a real implementation, this would call a backend service
    // For now, we'll simulate different behaviors based on the problem
    await new Promise(resolve => setTimeout(resolve, 500))

    try {
      // Parse the input based on the problem type
      const problemId = selectedProblem?.id
      if (!problemId) {
        throw new Error("No problem selected")
      }

      switch (problemId) {
        case "1": { // Two Sum
          const [numsStr, targetStr] = input.split("\n")
          const nums: number[] = JSON.parse(numsStr)
          const target = parseInt(targetStr)
          const seen: { [key: number]: number } = {}
          for (let i = 0; i < nums.length; i++) {
            const complement = target - nums[i]
            if (complement in seen) {
              return { output: JSON.stringify([seen[complement], i]) }
            }
            seen[nums[i]] = i
          }
          return { output: "[]" }
        }

        case "2": { // Add Two Numbers
          const [l1Str, l2Str] = input.split("\n")
          const l1: number[] = JSON.parse(l1Str)
          const l2: number[] = JSON.parse(l2Str)
          let carry = 0
          const result: number[] = []
          const maxLen = Math.max(l1.length, l2.length)
          
          for (let i = 0; i < maxLen || carry; i++) {
            const sum = (l1[i] || 0) + (l2[i] || 0) + carry
            result.push(sum % 10)
            carry = Math.floor(sum / 10)
          }
          
          return { output: JSON.stringify(result) }
        }

        case "3": { // Longest Substring Without Repeating Characters
          const s = input.replace(/"/g, '')
          let maxLen = 0
          let start = 0
          const charMap: { [key: string]: number } = {}
          
          for (let end = 0; end < s.length; end++) {
            const char = s[end]
            if (char in charMap && charMap[char] >= start) {
              start = charMap[char] + 1
            }
            charMap[char] = end
            maxLen = Math.max(maxLen, end - start + 1)
          }
          
          return { output: maxLen.toString() }
        }

        case "4": { // Median of Two Sorted Arrays
          const [nums1Str, nums2Str] = input.split("\n")
          const nums1: number[] = JSON.parse(nums1Str)
          const nums2: number[] = JSON.parse(nums2Str)
          const merged = [...nums1, ...nums2].sort((a, b) => a - b)
          const mid = Math.floor(merged.length / 2)
          
          if (merged.length % 2 === 0) {
            const median = (merged[mid - 1] + merged[mid]) / 2
            return { output: median.toFixed(5) }
          } else {
            return { output: merged[mid].toFixed(5) }
          }
        }

        case "5": { // Longest Palindromic Substring
          const str = input.replace(/"/g, '')
          let longest = ""
          
          for (let i = 0; i < str.length; i++) {
            // Check odd length
            let left = i, right = i
            while (left >= 0 && right < str.length && str[left] === str[right]) {
              if (right - left + 1 > longest.length) {
                longest = str.substring(left, right + 1)
              }
              left--
              right++
            }
            
            // Check even length
            left = i, right = i + 1
            while (left >= 0 && right < str.length && str[left] === str[right]) {
              if (right - left + 1 > longest.length) {
                longest = str.substring(left, right + 1)
              }
              left--
              right++
            }
          }
          
          return { output: `"${longest}"` }
        }

        default:
          throw new Error("Unknown problem")
      }
    } catch (error) {
      if (error instanceof Error) {
        return { output: "", error: error.message }
      }
      return { output: "", error: "An unknown error occurred" }
    }
  }

  const handleRunCode = async () => {
    if (!selectedProblem) return
    
    setIsRunning(true)
    setError("")
    setOutput("")
    setTestResults(null)
    const startTime = performance.now()

    try {
      const results: TestResult[] = await Promise.all(
        selectedProblem.testCases.map(async (testCase, index) => {
          const runtime = `${Math.random() * 50 + 20}ms`
          const memory = `${Math.random() * 2 + 1}MB`
          
          const { output, error } = await executeCode(testCase.input, language)
          const passed = !error && output === testCase.output
          
          return {
            input: testCase.input,
            expected: testCase.output,
            actual: error || output,
            passed,
            runtime,
            memory,
            error
          }
        })
      )

      const endTime = performance.now()
      setExecutionTime(endTime - startTime)
      setMemoryUsage(`${Math.random() * 5 + 2}MB`)

      setTestResults({
        results,
        totalPassed: results.filter(r => r.passed).length,
        totalTests: results.length,
        executionTime: endTime - startTime,
        memoryUsage: `${Math.random() * 5 + 2}MB`
      })

      if (results.every(r => r.passed)) {
        toast.success("All test cases passed!")
      } else {
        toast.error(`${results.filter(r => !r.passed).length} test cases failed`)
      }
    } catch (err) {
      setError("An error occurred while running the code. Please try again.")
      toast.error("Code execution failed")
    } finally {
      setIsRunning(false)
    }
  }

  const handleRunCustomInput = async () => {
    if (!selectedProblem || !customInput) return
    
    setIsRunningCustom(true)
    setCustomOutput("")
    setError("")

    try {
      const { output, error } = await executeCode(customInput, language)
      setCustomOutput(error || output)
      
      if (error) {
        toast.error("Runtime Error: " + error)
      } else {
        toast.success("Code executed successfully")
      }
    } catch (err) {
      setError("An error occurred while running the code. Please try again.")
      toast.error("Code execution failed")
    } finally {
      setIsRunningCustom(false)
    }
  }

  const handleSubmit = async () => {
    if (!selectedProblem) return
    
    setIsSubmitting(true)
    setError("")
    setOutput("")
    setTestResults(null)
    const startTime = performance.now()

    try {
      const results: TestResult[] = await Promise.all(
        selectedProblem.testCases.map(async (testCase) => {
          const runtime = `${Math.random() * 50 + 20}ms`
          const memory = `${Math.random() * 2 + 1}MB`
          
          const { output, error } = await executeCode(testCase.input, language)
          const passed = !error && output === testCase.output
          
          return {
            input: testCase.input,
            expected: testCase.output,
            actual: error || output,
            passed,
            runtime,
            memory,
            error
          }
        })
      )

      const totalPassed = results.filter(r => r.passed).length
      const status = totalPassed === results.length ? "accepted" : "wrong_answer"
      const endTime = performance.now()
      setExecutionTime(endTime - startTime)
      setMemoryUsage(`${Math.random() * 5 + 2}MB`)

      const newSubmission: Submission = {
        id: Date.now().toString(),
        problemId: selectedProblem.id,
        status,
        runtime: `${Math.random() * 100 + 50}ms`,
        memory: `${Math.random() * 5 + 2}MB`,
        language,
        timestamp: new Date().toISOString()
      }
      
      setSubmissions([newSubmission, ...submissions])
      setTestResults({
        results,
        totalPassed,
        totalTests: results.length,
        executionTime: endTime - startTime,
        memoryUsage: `${Math.random() * 5 + 2}MB`
      })

      if (status === "accepted") {
        toast.success("Congratulations! All test cases passed!")
        // Update problem status
        const updatedProblems = problems.map(p => 
          p.id === selectedProblem.id ? { ...p, status: "solved" } : p
        )
        // Update progress
        updateProgress(selectedProblem)
      } else {
        toast.error("Some test cases failed. Try again!")
        // Mark as attempted if not already solved
        if (selectedProblem.status !== "solved") {
          const updatedProblems = problems.map(p => 
            p.id === selectedProblem.id ? { ...p, status: "attempted" } : p
          )
        }
      }
    } catch (err) {
      setError("An error occurred while submitting. Please try again.")
      toast.error("Submission failed")
    } finally {
      setIsSubmitting(false)
    }
  }

  const problems: Problem[] = [
    {
      id: "1",
      title: "Two Sum",
      difficulty: "Easy",
      acceptance: "47.5%",
      status: "solved",
      tags: ["Array", "Hash Table"],
      premium: false,
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
        },
        {
          input: "nums = [3,2,4], target = 6",
          output: "[1,2]"
        }
      ],
      constraints: [
        "2 <= nums.length <= 10^4",
        "-10^9 <= nums[i] <= 10^9",
        "-10^9 <= target <= 10^9",
        "Only one valid answer exists."
      ],
      hints: [
        "A really brute force way would be to search for all possible pairs of numbers but that would be too slow.",
        "So, we need a more efficient way to find the complement of a number.",
        "Use a hash table to store the numbers we've seen so far."
      ],
      solution: "def twoSum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []",
      testCases: [
        { input: "[2,7,11,15]\n9", output: "[0,1]" },
        { input: "[3,2,4]\n6", output: "[1,2]" }
      ]
    },
    {
      id: "2",
      title: "Add Two Numbers",
      difficulty: "Medium",
      acceptance: "35.6%",
      status: "attempted",
      tags: ["Linked List", "Math"],
      premium: false,
      description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
      examples: [
        {
          input: "l1 = [2,4,3], l2 = [5,6,4]",
          output: "[7,0,8]",
          explanation: "342 + 465 = 807."
        },
        {
          input: "l1 = [0], l2 = [0]",
          output: "[0]"
        }
      ],
      constraints: [
        "The number of nodes in each linked list is in the range [1, 100].",
        "0 <= Node.val <= 9",
        "It is guaranteed that the list represents a number that does not have leading zeros."
      ],
      hints: [
        "Initialize a dummy node to build the result linked list.",
        "Use a carry variable to handle the sum of digits.",
        "Traverse both linked lists simultaneously."
      ],
      solution: "def addTwoNumbers(l1, l2):\n    dummy = ListNode()\n    current = dummy\n    carry = 0\n    \n    while l1 or l2 or carry:\n        val1 = l1.val if l1 else 0\n        val2 = l2.val if l2 else 0\n        \n        total = val1 + val2 + carry\n        carry = total // 10\n        current.next = ListNode(total % 10)\n        \n        current = current.next\n        l1 = l1.next if l1 else None\n        l2 = l2.next if l2 else None\n    \n    return dummy.next",
      testCases: [
        { input: "[2,4,3]\n[5,6,4]", output: "[7,0,8]" },
        { input: "[0]\n[0]", output: "[0]" }
      ]
    },
    {
      id: "3",
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      acceptance: "31.8%",
      status: null,
      tags: ["Hash Table", "Sliding Window"],
      premium: false,
      description: "Given a string s, find the length of the longest substring without repeating characters.",
      examples: [
        {
          input: "s = \"abcabcbb\"",
          output: "3",
          explanation: "The answer is \"abc\", with the length of 3."
        },
        {
          input: "s = \"bbbbb\"",
          output: "1",
          explanation: "The answer is \"b\", with the length of 1."
        }
      ],
      constraints: [
        "0 <= s.length <= 5 * 10^4",
        "s consists of English letters, digits, symbols and spaces."
      ],
      hints: [
        "Use a sliding window approach with two pointers.",
        "Keep track of characters in the current window using a hash set.",
        "Move the left pointer when a duplicate is found."
      ],
      solution: "def lengthOfLongestSubstring(s):\n    seen = set()\n    left = 0\n    max_length = 0\n    \n    for right in range(len(s)):\n        while s[right] in seen:\n            seen.remove(s[left])\n            left += 1\n        seen.add(s[right])\n        max_length = max(max_length, right - left + 1)\n    \n    return max_length",
      testCases: [
        { input: "\"abcabcbb\"", output: "3" },
        { input: "\"bbbbb\"", output: "1" }
      ]
    },
    {
      id: "4",
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      acceptance: "33.5%",
      status: null,
      tags: ["Array", "Binary Search"],
      premium: true,
      description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
      examples: [
        {
          input: "nums1 = [1,3], nums2 = [2]",
          output: "2.00000",
          explanation: "merged array = [1,2,3] and median is 2."
        },
        {
          input: "nums1 = [1,2], nums2 = [3,4]",
          output: "2.50000",
          explanation: "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5."
        }
      ],
      constraints: [
        "nums1.length == m",
        "nums2.length == n",
        "0 <= m <= 1000",
        "0 <= n <= 1000",
        "1 <= m + n <= 2000",
        "-10^6 <= nums1[i], nums2[i] <= 10^6"
      ],
      hints: [
        "The median divides the array into two equal parts.",
        "Use binary search to find the correct partition.",
        "Consider the case where one array is empty."
      ],
      solution: "def findMedianSortedArrays(nums1, nums2):\n    A, B = nums1, nums2\n    total = len(nums1) + len(nums2)\n    half = total // 2\n    \n    if len(B) < len(A):\n        A, B = B, A\n    \n    left, right = 0, len(A) - 1\n    while True:\n        i = (left + right) // 2\n        j = half - i - 2\n        \n        Aleft = A[i] if i >= 0 else float('-inf')\n        Aright = A[i + 1] if (i + 1) < len(A) else float('inf')\n        Bleft = B[j] if j >= 0 else float('-inf')\n        Bright = B[j + 1] if (j + 1) < len(B) else float('inf')\n        \n        if Aleft <= Bright and Bleft <= Aright:\n            if total % 2:\n                return min(Aright, Bright)\n            return (max(Aleft, Bleft) + min(Aright, Bright)) / 2\n        elif Aleft > Bright:\n            right = i - 1\n        else:\n            left = i + 1",
      testCases: [
        { input: "[1,3]\n[2]", output: "2.00000" },
        { input: "[1,2]\n[3,4]", output: "2.50000" }
      ]
    },
    {
      id: "5",
      title: "Longest Palindromic Substring",
      difficulty: "Medium",
      acceptance: "30.7%",
      status: null,
      tags: ["String", "Dynamic Programming"],
      premium: false,
      description: "Given a string s, return the longest palindromic substring in s.",
      examples: [
        {
          input: "s = \"babad\"",
          output: "\"bab\"",
          explanation: "\"aba\" is also a valid answer."
        },
        {
          input: "s = \"cbbd\"",
          output: "\"bb\""
        }
      ],
      constraints: [
        "1 <= s.length <= 1000",
        "s consist of only digits and English letters."
      ],
      hints: [
        "Expand around the center for each character.",
        "Consider both odd and even length palindromes.",
        "Keep track of the longest palindrome found."
      ],
      solution: "def longestPalindrome(s):\n    def expand(l, r):\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            l -= 1\n            r += 1\n        return s[l + 1:r]\n    \n    res = \"\"\n    for i in range(len(s)):\n        odd = expand(i, i)\n        even = expand(i, i + 1)\n        res = max(res, odd, even, key=len)\n    return res",
      testCases: [
        { input: "\"babad\"", output: "\"bab\"" },
        { input: "\"cbbd\"", output: "\"bb\"" }
      ]
    }
  ]

  const handleProblemSelect = (problem: Problem) => {
    setSelectedProblem(problem)
    setCode(problem.solution)
    setDetailTab("description")
  }

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDifficulty = difficultyFilter === "all" || problem.difficulty === difficultyFilter
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "solved" && problem.status === "solved") ||
      (statusFilter === "attempted" && problem.status === "attempted") ||
      (statusFilter === "locked" && problem.status === "locked")
    
    // Filter based on active tab
    const matchesTab = 
      listTab === "all" ||
      (listTab === "solved" && problem.status === "solved") ||
      (listTab === "attempted" && problem.status === "attempted") ||
      (listTab === "bookmarked" && bookmarkedProblems.includes(problem.id))

    return matchesSearch && matchesDifficulty && matchesStatus && matchesTab
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600 dark:text-green-400"
      case "Medium":
        return "text-yellow-600 dark:text-yellow-400"
      case "Hard":
        return "text-red-600 dark:text-red-400"
      default:
        return ""
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "text-green-600 dark:text-green-400"
      case "wrong_answer":
        return "text-red-600 dark:text-red-400"
      case "runtime_error":
        return "text-amber-600 dark:text-amber-400"
      case "time_limit_exceeded":
        return "text-purple-600 dark:text-purple-400"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <StudentSidebar />
      
      <main className="md:pl-64 pt-16 md:pt-0">
        <div className="container mx-auto p-6">
          {!selectedProblem ? (
            <>
              <header className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Coding Challenges</h1>
                    <p className="text-slate-600 dark:text-slate-400">Practice coding problems to improve your skills</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-3 py-1.5 rounded-lg">
                      <LucideTrophy size={18} className="text-purple-600" />
                      <span className="font-medium">Top 10%</span>
                    </div>
                    <Button>Start New Challenge</Button>
                  </div>
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Progress</CardTitle>
                    <CardDescription>Your coding journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-purple-600">{userProgress.totalSolved}</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">Problems Solved</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-purple-600">{userProgress.successRate.toFixed(1)}%</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">Success Rate</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-400">Easy</span>
                          <span className="font-medium">{userProgress.easySolved}/15</span>
                        </div>
                        <Progress value={(userProgress.easySolved / 15) * 100} className="h-1.5" />
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-400">Medium</span>
                          <span className="font-medium">{userProgress.mediumSolved}/20</span>
                        </div>
                        <Progress value={(userProgress.mediumSolved / 20) * 100} className="h-1.5" />
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-400">Hard</span>
                          <span className="font-medium">{userProgress.hardSolved}/10</span>
                        </div>
                        <Progress value={(userProgress.hardSolved / 10) * 100} className="h-1.5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Today's Challenge</CardTitle>
                    <CardDescription>Daily problem to solve</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {todaysChallenge ? (
                        <>
                          <div className="flex items-center gap-3">
                            <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg">
                              <LucideCode size={20} className="text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <div className="font-medium">{todaysChallenge.title}</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                {todaysChallenge.tags.join(", ")}
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {todaysChallenge.description}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <LucideClock size={14} />
                            <span>Time remaining: {timeRemaining}</span>
                          </div>
                        </>
                      ) : (
                        <div className="text-center text-slate-600 dark:text-slate-400">
                          No challenge available for today
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full"
                      onClick={() => todaysChallenge && handleProblemSelect(todaysChallenge)}
                      disabled={!todaysChallenge}
                    >
                      Start Challenge
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Streak</CardTitle>
                    <CardDescription>Keep your momentum going</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-purple-600">{userProgress.streak}</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">Day Streak</div>
                        </div>
                        <div className="flex gap-1">
                          {Array.from({ length: 7 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-6 h-6 rounded-sm flex items-center justify-center ${
                                i < userProgress.streak % 7 ? "bg-purple-600 text-white" : "bg-slate-200 dark:bg-slate-700"
                              }`}
                            >
                              {i < userProgress.streak % 7 && <LucideCheckCircle size={14} />}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        <p>Upcoming rewards:</p>
                        <ul className="mt-1 space-y-1">
                          {userProgress.upcomingRewards.map((reward, i) => (
                            <li key={i} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <LucideStar size={14} className="text-purple-600" />
                                <span>{reward.reward}</span>
                              </div>
                              <span>{reward.days - userProgress.streak} days left</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mb-8">
                <Tabs value={listTab} onValueChange={(v) => setListTab(v as any)}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <TabsList>
                      <TabsTrigger value="all">All Problems</TabsTrigger>
                      <TabsTrigger value="solved">Solved</TabsTrigger>
                      <TabsTrigger value="attempted">Attempted</TabsTrigger>
                      <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
                    </TabsList>
                    <div className="flex gap-2">
                      <div className="relative">
                        <LucideSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          placeholder="Search problems..."
                          className="pl-9"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Difficulties</SelectItem>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="solved">Solved</SelectItem>
                          <SelectItem value="attempted">Attempted</SelectItem>
                          <SelectItem value="locked">Locked</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <TabsContent value="all">
                    <div className="space-y-2">
                      {filteredProblems.map((problem) => (
                        <Card 
                          key={problem.id} 
                          className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors cursor-pointer"
                          onClick={() => handleProblemSelect(problem)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                {problem.status === "solved" ? (
                                  <LucideCheckCircle className="h-5 w-5 text-green-600" />
                                ) : problem.status === "attempted" ? (
                                  <LucideXCircle className="h-5 w-5 text-yellow-600" />
                                ) : problem.premium ? (
                                  <LucideLock className="h-5 w-5 text-slate-400" />
                                ) : null}
                                <div>
                                  <div className="font-medium">{problem.title}</div>
                                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                    <span className={getDifficultyColor(problem.difficulty)}>
                                      {problem.difficulty}
                                    </span>
                                    <span>•</span>
                                    <span>{problem.acceptance} Acceptance</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                  {problem.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleBookmark(problem.id)
                                  }}
                                >
                                  {bookmarkedProblems.includes(problem.id) ? (
                                    <LucideBookmarkCheck className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <LucideBookmark className="h-4 w-4" />
                                  )}
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <LucideArrowRight className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedProblem.title}</h1>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={getDifficultyColor(selectedProblem.difficulty)}>
                        {selectedProblem.difficulty}
                      </span>
                      <span className="text-slate-600 dark:text-slate-400">•</span>
                      <span className="text-slate-600 dark:text-slate-400">{selectedProblem.acceptance} Acceptance</span>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => setSelectedProblem(null)}>
                    Back to Problems
                  </Button>
                </div>

                <Tabs value={detailTab} onValueChange={(v) => setDetailTab(v as any)}>
                  <TabsList>
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="solution">Solution</TabsTrigger>
                    <TabsTrigger value="submissions">Submissions</TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="space-y-6">
                    <div className="prose dark:prose-invert max-w-none">
                      <p>{selectedProblem.description}</p>
                      
                      <h3>Examples</h3>
                      {selectedProblem.examples.map((example, i) => (
                        <div key={i} className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                          <div className="font-medium">Example {i + 1}:</div>
                          <div className="mt-2">
                            <div className="text-sm text-slate-600 dark:text-slate-400">Input:</div>
                            <div className="font-mono bg-slate-200 dark:bg-slate-700 p-2 rounded mt-1">
                              {example.input}
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="text-sm text-slate-600 dark:text-slate-400">Output:</div>
                            <div className="font-mono bg-slate-200 dark:bg-slate-700 p-2 rounded mt-1">
                              {example.output}
                            </div>
                          </div>
                          {example.explanation && (
                            <div className="mt-2">
                              <div className="text-sm text-slate-600 dark:text-slate-400">Explanation:</div>
                              <div className="mt-1">{example.explanation}</div>
                            </div>
                          )}
                        </div>
                      ))}

                      <h3>Constraints</h3>
                      <ul>
                        {selectedProblem.constraints.map((constraint, i) => (
                          <li key={i}>{constraint}</li>
                        ))}
                      </ul>

                      <h3>Hints</h3>
                      <div className="space-y-2">
                        {selectedProblem.hints.map((hint, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <LucideLightbulb className="h-5 w-5 text-amber-500 mt-0.5" />
                            <span>{hint}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="solution">
                    <div className="prose dark:prose-invert max-w-none">
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto">
                        <code>{selectedProblem.solution}</code>
                      </pre>
                    </div>
                  </TabsContent>

                  <TabsContent value="submissions">
                    <div className="space-y-4">
                      {submissions.map((submission) => (
                        <Card key={submission.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className={getStatusColor(submission.status)}>
                                  {submission.status === "accepted" ? (
                                    <LucideCheckCircle className="h-5 w-5" />
                                  ) : (
                                    <LucideXCircle className="h-5 w-5" />
                                  )}
                                </div>
                                <div>
                                  <div className="font-medium capitalize">{submission.status.replace(/_/g, " ")}</div>
                                  <div className="text-sm text-slate-600 dark:text-slate-400">
                                    {new Date(submission.timestamp).toLocaleString()}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-sm">
                                <div>
                                  <div className="text-slate-600 dark:text-slate-400">Runtime</div>
                                  <div className="font-medium">{submission.runtime}</div>
                                </div>
                                <div>
                                  <div className="text-slate-600 dark:text-slate-400">Memory</div>
                                  <div className="font-medium">{submission.memory}</div>
                                </div>
                                <div>
                                  <div className="text-slate-600 dark:text-slate-400">Language</div>
                                  <div className="font-medium">{submission.language}</div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="cpp">C++</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button 
                      variant="outline" 
                      size="icon" 
                      title="Editor Settings"
                      onClick={() => setShowTestCases(!showTestCases)}
                    >
                      <LucideSettings className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="icon" 
                      title="Test Cases"
                      onClick={() => setShowTestCases(!showTestCases)}
                    >
                      <LucideTestTube2 className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="icon" 
                      title="Copy Code"
                      onClick={handleCopyCode}
                    >
                      <LucideCopy className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="icon" 
                      title="Share"
                      onClick={handleShare}
                    >
                      <LucideShare2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="relative h-[500px]">
                  <Editor
                    height="100%"
                    defaultLanguage={language}
                    value={code}
                    onChange={handleEditorChange}
                    theme={editorSettings.theme}
                    options={{
                      fontSize: editorSettings.fontSize,
                      tabSize: editorSettings.tabSize,
                      lineNumbers: editorSettings.lineNumbers ? "on" : "off",
                      minimap: { enabled: editorSettings.minimap },
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      wordWrap: "on",
                      formatOnPaste: editorSettings.autoFormat,
                      formatOnType: editorSettings.autoFormat,
                      suggestOnTriggerCharacters: true,
                      quickSuggestions: true,
                      parameterHints: true,
                      renderWhitespace: "selection",
                      renderLineHighlight: "all",
                      cursorBlinking: "smooth",
                      cursorSmoothCaretAnimation: "on",
                      smoothScrolling: true,
                      mouseWheelZoom: true
                    }}
                  />
                </div>

                {showTestCases && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Test Cases</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedProblem.testCases.map((testCase, index) => (
                          <div 
                            key={index} 
                            className={`space-y-2 p-4 rounded-lg ${
                              activeTestCase === index 
                                ? "bg-slate-100 dark:bg-slate-800" 
                                : "hover:bg-slate-50 dark:hover:bg-slate-900/50"
                            }`}
                            onClick={() => setActiveTestCase(index === activeTestCase ? null : index)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="font-medium">Test Case {index + 1}</div>
                              <Button variant="ghost" size="sm">
                                {activeTestCase === index ? (
                                  <LucideChevronUp className="h-4 w-4" />
                                ) : (
                                  <LucideChevronDown className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                            {activeTestCase === index && (
                              <div className="space-y-2 text-sm">
                                <div>
                                  <div className="text-slate-600 dark:text-slate-400">Input</div>
                                  <div className="font-mono bg-slate-200 dark:bg-slate-700 p-2 rounded mt-1">
                                    {testCase.input}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-slate-600 dark:text-slate-400">Expected Output</div>
                                  <div className="font-mono bg-slate-200 dark:bg-slate-700 p-2 rounded mt-1">
                                    {testCase.output}
                                  </div>
                                </div>
                                {testCase.explanation && (
                                  <div>
                                    <div className="text-slate-600 dark:text-slate-400">Explanation</div>
                                    <div className="mt-1">{testCase.explanation}</div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>Custom Test Case</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Input</div>
                        <Textarea
                          value={customInput}
                          onChange={(e) => setCustomInput(e.target.value)}
                          className="font-mono"
                          placeholder="Enter your test case input..."
                          rows={4}
                        />
                      </div>
                      <div>
                        <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Output</div>
                        <div className="font-mono bg-slate-100 dark:bg-slate-800 p-2 rounded">
                          {customOutput || "Run the code to see output"}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={handleRunCustomInput}
                      disabled={isRunningCustom || !customInput}
                    >
                      {isRunningCustom ? (
                        <>
                          <LucideTimer className="h-4 w-4 mr-2 animate-spin" />
                          Running...
                        </>
                      ) : (
                        "Run Code"
                      )}
                    </Button>
                  </CardFooter>
                </Card>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline"
                      onClick={handleRunCode}
                      disabled={isRunning}
                    >
                      <LucidePlay className="h-4 w-4 mr-2" />
                      {isRunning ? "Running..." : "Run Code"}
                    </Button>
                    <Button variant="outline">
                      <LucideFileText className="h-4 w-4 mr-2" />
                      Test Cases
                    </Button>
                  </div>
                  <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isSubmitting ? (
                      <>
                        <LucideTimer className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </div>

                {error && (
                  <div className="p-4 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                    {error}
                  </div>
                )}

                {testResults && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-medium">
                        Test Results
                      </div>
                      <div className="text-sm">
                        {testResults.totalPassed} / {testResults.totalTests} passed
                        {executionTime > 0 && (
                          <span className="ml-2 text-slate-600 dark:text-slate-400">
                            (Executed in {executionTime.toFixed(2)}ms)
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {testResults.results.map((result, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {result.passed ? (
                                  <LucideCheckCircle className="h-5 w-5 text-green-600" />
                                ) : (
                                  <LucideXCircle className="h-5 w-5 text-red-600" />
                                )}
                                <span className="font-medium">
                                  Test Case {index + 1}
                                </span>
                              </div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                {result.runtime} • {result.memory}
                              </div>
                            </div>
                            
                            <div className="space-y-2 text-sm">
                              <div>
                                <div className="text-slate-600 dark:text-slate-400">Input</div>
                                <div className="font-mono bg-slate-100 dark:bg-slate-800 p-2 rounded mt-1">
                                  {result.input}
                                </div>
                              </div>
                              <div>
                                <div className="text-slate-600 dark:text-slate-400">Expected</div>
                                <div className="font-mono bg-slate-100 dark:bg-slate-800 p-2 rounded mt-1">
                                  {result.expected}
                                </div>
                              </div>
                              {!result.passed && (
                                <div>
                                  <div className="text-slate-600 dark:text-slate-400">Actual</div>
                                  <div className="font-mono bg-slate-100 dark:bg-slate-800 p-2 rounded mt-1">
                                    {result.actual}
                                  </div>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
