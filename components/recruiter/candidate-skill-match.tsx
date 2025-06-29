"use client"

import { Progress } from "@/components/ui/progress"

interface CandidateSkillMatchProps {
  match: number
}

export function CandidateSkillMatch({ match }: CandidateSkillMatchProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Skill Match</span>
        <span className="font-medium">{match}%</span>
      </div>
      <Progress
        value={match}
        className="h-2"
        indicatorClassName={match > 85 ? "bg-green-600" : match > 75 ? "bg-amber-500" : "bg-slate-500"}
      />
      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>Required Skills</span>
        <span>Nice-to-have Skills</span>
      </div>
    </div>
  )
}
