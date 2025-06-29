import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  LucideGraduationCap, 
  LucideBriefcase, 
  LucideZap, 
  LucideShield, 
  LucideBarChart2, 
  LucideBot, 
  LucideCode, 
  LucideCpu, 
  LucideSparkles,
  LucideGithub,
  LucidePlay,
  LucideCheck,
  LucideX,
  LucideAlertTriangle,
  LucideGlobe,
  LucideUsers,
  LucideRocket,
  LucideStar,
  LucideAward,
  LucideArrowRight,
  LucideTrendingUp,
  LucideTarget,
  LucideLightbulb
} from "lucide-react"

function TypewriterEffect({ words }: { words: { text: string, className?: string }[] }) {
  return (
    <h1 className="text-6xl md:text-8xl font-bold mb-8 mx-auto leading-tight">
      {words.map((word, i) => (
        <span key={i} className={`${word.className || ""} inline-block animate-fade-in-up`} style={{ animationDelay: `${i * 0.2}s` }}>
          {word.text}{" "}
        </span>
      ))}
    </h1>
  )
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-gradient-to-r from-pink-400/30 to-red-400/30 rounded-full blur-3xl animate-pulse animation-delay-6000"></div>
      
      {/* Floating dots */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '3s' }}></div>
    </div>
  )
}

export default function Home() {
  const hackathonName = "ETE"
  
  const words = [
    { text: "Hira" },
    { text: "–", className: "text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text" },
    { text: "AI-Driven" },
    { text: "Career", className: "text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text" },
    { text: "Launchpad" }
  ]

  const stats = [
    { value: "300M+", label: "Students", icon: <LucideGraduationCap className="h-6 w-6" />, color: "from-purple-500 to-pink-500" },
    { value: "10M+", label: "Recruiters", icon: <LucideBriefcase className="h-6 w-6" />, color: "from-blue-500 to-cyan-500" },
    { value: "$200B+", label: "Market", icon: <LucideGlobe className="h-6 w-6" />, color: "from-green-500 to-emerald-500" },
    { value: "92%", label: "Bias Reduction", icon: <LucideShield className="h-6 w-6" />, color: "from-orange-500 to-red-500" }
  ]

  const features = {
    students: [
      "Resume Analyzer with ATS score",
      "Auto-Fix & Rewrite for score >90",
      "AI-Crafted Cover Letters",
      "Interactive Resume Insights",
      "Mock Technical AI Interviews"
    ],
    recruiters: [
      "CV + Interview Dashboard",
      "Live Candidate Leaderboard",
      "99% Accurate Malpractice Detection",
      "Bias-Free Scoring",
      "LLM-powered Evaluation"
    ]
  }

  const uspItems = [
    {
      feature: "Resume Rewrite using Ollama AI",
      hira: true,
      others: false,
      othersText: "Static suggestions only"
    },
    {
      feature: "Cover Letter Generation",
      hira: true,
      others: false,
      othersText: "Template-based"
    },
    {
      feature: "ATS Score + Fix Combo",
      hira: true,
      others: false,
      othersText: "Manual feedback"
    },
    {
      feature: "AI Technical HR (Video + IDE)",
      hira: true,
      others: false,
      othersText: "Only code + camera"
    },
    {
      feature: "Full Recruiter Dashboard",
      hira: true,
      others: false,
      othersText: "Scattered features"
    },
    {
      feature: "EdTech + HRTech Unified",
      hira: true,
      others: false,
      othersText: "Only one domain focus"
    }
  ]

  const metrics = [
    { value: "100%", label: "Resume Optimization", icon: <LucideCheck className="h-6 w-6 text-green-500" /> },
    { value: "+38%", label: "ATS Score Boost", icon: <LucideTrendingUp className="h-6 w-6 text-blue-500" /> },
    { value: "99%", label: "Cheat Detection", icon: <LucideShield className="h-6 w-6 text-purple-500" /> },
    { value: "96%", label: "Candidate Satisfaction", icon: <LucideStar className="h-6 w-6 text-yellow-500" /> }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/30 dark:from-slate-950 dark:via-purple-950/30 dark:to-indigo-950/30 overflow-hidden relative">
      <FloatingParticles />

      {/* Header */}
      <header className="container relative mx-auto py-8 px-4 z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 group">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-xl shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300 transform group-hover:scale-105">
              <LucideBot size={28} className="animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Hira</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-slate-700 dark:text-slate-300 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/50 transition-all duration-300">
                Log in
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105">
                <LucideSparkles className="mr-2 h-4 w-4" />
                Try Demo
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container relative mx-auto px-4 py-16 z-10">
        <section className="text-center mb-24">
          <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-full text-sm font-medium text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            <LucideZap className="h-4 w-4 animate-pulse" />
            The Ultimate AI-Driven Career Launchpad & Hiring Suite
          </div>
          
          <TypewriterEffect words={words} />
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            A full-stack, Ollama-powered platform merging <span className="font-semibold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">EdTech</span> + <span className="font-semibold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">HRTech</span> to transform job readiness and corporate hiring in one seamless workflow.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-20">
            <Link href="/login">
              <Button size="lg" className="gap-3 shadow-xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-6">
                <LucideGraduationCap size={24} />
                Student Portal
                <span className="ml-2 px-3 py-1 text-sm bg-white/20 text-white rounded-full backdrop-blur-sm">AI Coach</span>
                <LucideArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="gap-3 border-2 border-purple-600 text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-950/50 transition-all duration-300 transform hover:scale-105 text-lg px-8 py-6">
                <LucideBriefcase size={24} />
                Recruiter Tools
                <span className="ml-2 px-3 py-1 text-sm bg-purple-100 text-purple-600 rounded-full">Live Demo</span>
                <LucideArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`w-20 h-20 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110 mx-auto`}>
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Problem Section */}
        <section className="mb-32">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-900 dark:text-white">
            <span className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">Problems</span> We're Solving
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="relative overflow-hidden group border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 p-4 rounded-xl shadow-lg">
                    <LucideX className="text-white" size={28} />
                  </div>
                  <CardTitle className="text-xl">ATS Failures</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                  Resumes don't pass ATS bots due to keyword mismatches and poor formatting.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden group border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 rounded-xl shadow-lg">
                    <LucideAlertTriangle className="text-white" size={28} />
                  </div>
                  <CardTitle className="text-xl">Candidate Prep Gap</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                  Lack of tailored preparation and real-time interview experience.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden group border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-xl shadow-lg">
                    <LucideUsers className="text-white" size={28} />
                  </div>
                  <CardTitle className="text-xl">Recruiter Struggles</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                  Bias, cheating, and inefficiency in candidate shortlisting.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-32">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-900 dark:text-white">
            <span className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">Hira</span> Feature Stack
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            {/* Student Features */}
            <Card className="relative overflow-hidden group border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-xl">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                    <LucideGraduationCap size={28} />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Student Portal</CardTitle>
                    <CardDescription className="text-purple-100">All-in-One Job Preparation</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <ul className="space-y-6">
                  {features.students.map((feature, index) => (
                    <li key={index} className="flex items-start gap-4 group/item">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full mt-1 shadow-lg">
                        <LucideCheck className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 text-lg group-hover/item:text-purple-600 dark:group-hover/item:text-purple-400 transition-colors">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Recruiter Features */}
            <Card className="relative overflow-hidden group border-0 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-xl">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                    <LucideBriefcase size={28} />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Recruiter Suite</CardTitle>
                    <CardDescription className="text-blue-100">End-to-End Hiring Workflow</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <ul className="space-y-6">
                  {features.recruiters.map((feature, index) => (
                    <li key={index} className="flex items-start gap-4 group/item">
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-full mt-1 shadow-lg">
                        <LucideCheck className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 text-lg group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced USP Comparison */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">
              Why <span className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">Hira</span> Stands Out
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl">
                <thead>
                  <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                    <th className="text-left py-6 px-8 text-slate-700 dark:text-slate-300 font-semibold text-lg">Feature</th>
                    <th className="text-center py-6 px-8 text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-semibold text-lg">Hira</th>
                    <th className="text-center py-6 px-8 text-slate-700 dark:text-slate-300 font-semibold text-lg">Competitors</th>
                  </tr>
                </thead>
                <tbody>
                  {uspItems.map((item, index) => (
                    <tr key={index} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="py-6 px-8 text-slate-700 dark:text-slate-300 text-lg">{item.feature}</td>
                      <td className="text-center py-6 px-8">
                        {item.hira ? (
                          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg">
                            <LucideCheck className="h-6 w-6 text-white" />
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg">
                            <LucideX className="h-6 w-6 text-white" />
                          </div>
                        )}
                      </td>
                      <td className="text-center py-6 px-8 text-slate-500 dark:text-slate-400 text-lg">
                        {item.othersText}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Enhanced Key Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <Card key={index} className="text-center p-8 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-2xl">
                    {metric.icon}
                  </div>
                </div>
                <h4 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">{metric.value}</h4>
                <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">{metric.label}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Enhanced Business Model */}
        <section className="mb-32 bg-gradient-to-br from-slate-100 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900/30 dark:to-pink-900/30 rounded-3xl p-12 border border-slate-200 dark:border-slate-800 shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-900 dark:text-white">
            <span className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">Scalable</span> Business Model
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 shadow-lg">
                  <LucideBriefcase className="text-white" size={24} />
                </div>
                <CardTitle className="text-xl">B2B SaaS</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                  Recruiters & EdTech companies subscribe monthly/annually for hiring suite & analytics
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 shadow-lg">
                  <LucideUsers className="text-white" size={24} />
                </div>
                <CardTitle className="text-xl">B2C Freemium</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                  Free resume scoring + 1 mock interview. Premium unlocks unlimited features
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 shadow-lg">
                  <LucideGraduationCap className="text-white" size={24} />
                </div>
                <CardTitle className="text-xl">Institutional Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                  Bulk licenses for colleges/job portals with custom branding
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 shadow-lg">
                  <LucideSparkles className="text-white" size={24} />
                </div>
                <CardTitle className="text-xl">Affiliate Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                  AI resume templates, career coaching tools, and referral programs
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Enhanced Why We'll Win */}
        <section className="mb-32">
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
            <div className="relative z-10 max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
                <LucideAward className="h-5 w-5" />
                Our Competitive Edge
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Why <span className="text-yellow-300">Hira</span> Will Dominate
              </h2>
              <p className="text-xl mb-12 text-purple-100 leading-relaxed max-w-4xl mx-auto">
                Hira doesn't just help students land interviews — it prepares, corrects, challenges, evaluates, and elevates them. For recruiters, it removes the guesswork, bias, and manual screening burden.
              </p>
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <LucideRocket className="h-10 w-10 mb-6 text-yellow-300" />
                  <h3 className="font-bold text-xl mb-4">Ollama-Powered</h3>
                  <p className="text-purple-100 text-lg leading-relaxed">
                    Leveraging cutting-edge AI for dynamic resume optimization and evaluation
                  </p>
                </div>
                <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <LucideShield className="h-10 w-10 mb-6 text-yellow-300" />
                  <h3 className="font-bold text-xl mb-4">Bias-Free</h3>
                  <p className="text-purple-100 text-lg leading-relaxed">
                    92% reduction in demographic bias through adversarial AI
                  </p>
                </div>
                <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <LucideCode className="h-10 w-10 mb-6 text-yellow-300" />
                  <h3 className="font-bold text-xl mb-4">Full-Stack</h3>
                  <p className="text-purple-100 text-lg leading-relaxed">
                    First unified platform combining EdTech and HRTech capabilities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Demo Section */}
        <section className="mb-32 bg-gradient-to-br from-slate-100 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900/30 dark:to-pink-900/30 rounded-3xl p-12 border border-slate-200 dark:border-slate-800 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-slate-900 dark:text-white">
                See <span className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">Hira</span> in Action
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
                Experience how our AI evaluates technical interviews in real-time with multimodal analysis.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link href="/login">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl text-lg px-8 py-6 gap-3 transition-all duration-300 transform hover:scale-105">
                    <LucidePlay className="h-5 w-5" />
                    Live Interactive Demo
                    <LucideArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="border-2 border-slate-300 dark:border-slate-700 text-lg px-8 py-6 gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 transform hover:scale-105">
                    <LucideTarget className="h-5 w-5" />
                    Technical Deep Dive
                    <LucideArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative aspect-video bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700 rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-600 shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse shadow-xl">
                    <LucidePlay className="text-white ml-1" size={32} />
                  </div>
                  <span className="text-lg font-semibold text-slate-700 dark:text-slate-300">AI Interview Demo</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced CTA */}
      <div className="relative bg-gradient-to-r from-purple-900 via-pink-900 to-indigo-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat"></div>
        </div>
        <div className="container relative mx-auto px-4 text-center z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Hiring?</h2>
          <p className="text-xl md:text-2xl text-purple-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join our beta program to experience the future of AI-driven recruitment and career preparation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/login">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-slate-100 gap-3 shadow-2xl text-lg px-10 py-6 transition-all duration-300 transform hover:scale-105 font-semibold">
                <LucideSparkles className="h-5 w-5" />
                Get Beta Access
                <LucideArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-slate-900 border-2 border-yellow-400 hover:border-yellow-500 gap-3 text-lg px-10 py-6 transition-all duration-300 transform hover:scale-105 font-semibold shadow-2xl">
                <LucideBriefcase className="h-5 w-5" />
                Partner With Us
                <LucideArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-8 md:mb-0">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-xl shadow-lg">
                <LucideBot size={28} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Hira</h1>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              <Link href="/login" className="text-lg text-slate-600 dark:text-slate-400 hover:text-purple-600 transition-colors font-medium">Privacy</Link>
              <Link href="/login" className="text-lg text-slate-600 dark:text-slate-400 hover:text-purple-600 transition-colors font-medium">Terms</Link>
              <Link href="/login" className="text-lg text-slate-600 dark:text-slate-400 hover:text-purple-600 transition-colors font-medium">API Docs</Link>
              <Link href="/login" className="text-lg text-slate-600 dark:text-slate-400 hover:text-purple-600 transition-colors font-medium flex items-center gap-2">
                <LucideGithub className="h-5 w-5" />
                GitHub
              </Link>
            </div>
          </div>
          <div className="mt-12 text-center text-lg text-slate-600 dark:text-slate-400 font-medium">
            © {new Date().getFullYear()} Hira | Built for {hackathonName} Hackathon
          </div>
        </div>
      </footer>
    </div>
  )
}