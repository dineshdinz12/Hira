"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/lib/auth"
import {
  LucideHome,
  LucideUsers,
  LucideClipboardCheck,
  LucideBarChart,
  LucideCode,
  LucideFileText,
  LucideUserCheck,
  LucideCalendar,
  LucideSettings,
  LucideLogOut,
  LucideMenu,
  LucideX,
} from "lucide-react"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SidebarProps {
  className?: string
}

export function RecruiterSidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { logout } = useAuth()

  const routes = [
    {
      label: "Dashboard",
      icon: LucideHome,
      href: "/recruiter/dashboard",
      active: pathname === "/recruiter/dashboard",
    },
    {
      label: "Online Screening",
      icon: LucideClipboardCheck,
      href: "/recruiter/candidates",
      active: pathname === "/recruiter/candidates",
    },
    {
      label: "Evaluations",
      icon: LucideClipboardCheck,
      href: "/recruiter/evaluations",
      active: pathname === "/recruiter/evaluations",
    },
    {
      label: "Diversity Analytics",
      icon: LucideBarChart,
      href: "/recruiter/diversity",
      active: pathname === "/recruiter/diversity",
    },
    {
      label: "Interview Templates",
      icon: LucideFileText,
      href: "/recruiter/templates",
      active: pathname === "/recruiter/templates",
    },
    {
      label: "Employee Relations",
      icon: LucideUsers,
      href: "/recruiter/crm",
      active: pathname === "/recruiter/crm",
    },
    {
      label: "Schedule",
      icon: LucideCalendar,
      href: "/recruiter/schedule",
      active: pathname === "/recruiter/schedule",
    },
    {
      label: "Settings",
      icon: LucideSettings,
      href: "/recruiter/settings",
      active: pathname === "/recruiter/settings",
    },
  ]

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <LucideX size={18} /> : <LucideMenu size={18} />}
      </Button>

      <div
        className={cn("fixed inset-0 z-40 bg-black/50 md:hidden", isOpen ? "block" : "hidden")}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        <div className="p-6 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800">
          <div className="bg-purple-600 text-white p-2 rounded-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" fill="currentColor" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Hira</h1>
        </div>

        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <Link href="/recruiter/profile" onClick={() => setIsOpen(false)}>
              <div className="flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg p-2 transition-colors">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Taylor Williams" />
                  <AvatarFallback>TW</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">Taylor Williams</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Recruiter</div>
                </div>
              </div>
            </Link>
            <ThemeToggle />
          </div>
        </div>

        <div className="flex-1 overflow-auto py-4 px-3">
          <nav className="space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  route.active
                    ? "bg-purple-100 text-purple-900 dark:bg-purple-900/20 dark:text-purple-50"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800",
                )}
              >
                <route.icon size={18} />
                {route.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 p-4">
          <Button
            variant="ghost"
            className="w-full justify-start space-x-3"
            onClick={logout}
          >
            <LucideLogOut className="h-5 w-5" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </>
  )
}
