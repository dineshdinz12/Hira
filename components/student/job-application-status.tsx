import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LucideCheck, LucideClipboardCheck, LucideDollarSign, LucideFileText, LucideUser, LucideX } from "lucide-react"

type ApplicationStatus = "applied" | "screening" | "assessment" | "interview" | "offer" | "rejected"

interface JobApplicationStatusProps {
  status: ApplicationStatus
}

export function JobApplicationStatus({ status }: JobApplicationStatusProps) {
  const steps = [
    { id: "applied", label: "Applied", icon: LucideFileText },
    { id: "screening", label: "Screening", icon: LucideClipboardCheck },
    { id: "assessment", label: "Assessment", icon: LucideClipboardCheck },
    { id: "interview", label: "Interview", icon: LucideUser },
    { id: "offer", label: "Offer", icon: LucideDollarSign },
  ]

  // Find the current step index
  const currentStepIndex = steps.findIndex((step) => step.id === status)

  // Calculate progress percentage
  const progressPercentage = status === "rejected" ? 100 : Math.round(((currentStepIndex + 1) / steps.length) * 100)

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium">Application Status</span>
        {status === "rejected" ? (
          <Badge
            variant="outline"
            className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
          >
            Not Selected
          </Badge>
        ) : (
          <span className="text-slate-600 dark:text-slate-400">{steps[currentStepIndex]?.label}</span>
        )}
      </div>

      <div className="relative">
        <Progress
          value={progressPercentage}
          className={`h-1.5 ${status === "rejected" ? "bg-red-200 dark:bg-red-900/30" : ""}`}
        >
          {status === "rejected" && <div className="h-full bg-red-600 rounded-full" style={{ width: "100%" }}></div>}
        </Progress>

        <div className="flex justify-between mt-1">
          {steps.map((step, index) => {
            const StepIcon = step.icon
            const isActive = index <= currentStepIndex && status !== "rejected"
            const isRejected = status === "rejected"

            return (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    isRejected
                      ? "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                      : isActive
                        ? "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600"
                  }`}
                >
                  {isRejected && index === steps.length - 1 ? (
                    <LucideX size={12} />
                  ) : isActive && index === currentStepIndex ? (
                    <StepIcon size={12} />
                  ) : isActive ? (
                    <LucideCheck size={12} />
                  ) : (
                    <StepIcon size={12} />
                  )}
                </div>
                <span
                  className={`text-xs mt-1 ${
                    isRejected
                      ? index === steps.length - 1
                        ? "text-red-600 dark:text-red-400"
                        : "text-slate-400 dark:text-slate-600"
                      : isActive
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-slate-400 dark:text-slate-600"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
