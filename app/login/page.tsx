"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LucideGraduationCap, LucideBriefcase, LucideArrowLeft } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [defaultRole, setDefaultRole] = useState("student")

  useEffect(() => {
    const role = searchParams.get("role")
    if (role === "recruiter" || role === "student") {
      setDefaultRole(role)
    }
  }, [searchParams])

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/student/dashboard")
  }

  const handleRecruiterLogin = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/recruiter/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="flex items-center gap-2 mb-6 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <LucideArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        <Card>
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="bg-purple-600 text-white p-3 rounded-xl">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" fill="currentColor" />
                </svg>
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Welcome to Hira</CardTitle>
            <CardDescription className="text-center">Log in to access your personalized dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={defaultRole} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="student" className="flex items-center gap-2">
                  <LucideGraduationCap size={16} />
                  <span>Student</span>
                </TabsTrigger>
                <TabsTrigger value="recruiter" className="flex items-center gap-2">
                  <LucideBriefcase size={16} />
                  <span>Recruiter</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="student">
                <form onSubmit={handleStudentLogin}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="student-email">Email</Label>
                      <Input
                        id="student-email"
                        type="email"
                        placeholder="student@example.com"
                        defaultValue="student@example.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="student-password">Password</Label>
                        <Link
                          href="#"
                          className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Input id="student-password" type="password" defaultValue="student123" required />
                    </div>
                    <Button type="submit" className="w-full">
                      Login as Student
                    </Button>
                    <div className="text-sm text-center text-slate-500 dark:text-slate-400">
                      Demo credentials: student@example.com / student123
                    </div>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="recruiter">
                <form onSubmit={handleRecruiterLogin}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="recruiter-email">Email</Label>
                      <Input
                        id="recruiter-email"
                        type="email"
                        placeholder="recruiter@example.com"
                        defaultValue="recruiter@example.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="recruiter-password">Password</Label>
                        <Link
                          href="#"
                          className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Input id="recruiter-password" type="password" defaultValue="recruiter123" required />
                    </div>
                    <Button type="submit" className="w-full">
                      Login as Recruiter
                    </Button>
                    <div className="text-sm text-center text-slate-500 dark:text-slate-400">
                      Demo credentials: recruiter@example.com / recruiter123
                    </div>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-slate-500 dark:text-slate-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
              >
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
