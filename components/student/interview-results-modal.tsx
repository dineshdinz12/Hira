import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle } from "lucide-react"

interface InterviewResultsModalProps {
  isOpen: boolean
  onClose: () => void
  mcqScore: number
  cheatingScore: number
  finalScore: number
  isQualified: boolean
}

export function InterviewResultsModal({
  isOpen,
  onClose,
  mcqScore,
  cheatingScore,
  finalScore,
  isQualified,
}: InterviewResultsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Interview Results</DialogTitle>
          <DialogDescription>
            Your performance in the aptitude test
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">MCQ Score</span>
              <span className="text-sm text-slate-500">{(mcqScore * 100).toFixed(1)}%</span>
            </div>
            <Progress value={mcqScore * 100} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Integrity Score</span>
              <span className="text-sm text-slate-500">{((1 - cheatingScore) * 100).toFixed(1)}%</span>
            </div>
            <Progress value={(1 - cheatingScore) * 100} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Final Score</span>
              <span className="text-sm text-slate-500">{(finalScore * 100).toFixed(1)}%</span>
            </div>
            <Progress value={finalScore * 100} className="h-2" />
          </div>

          <div className="flex items-center gap-2 p-4 rounded-lg bg-slate-50 dark:bg-slate-900">
            {isQualified ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-green-500">
                  Congratulations! You have qualified for the next round.
                </span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-red-500" />
                <span className="text-sm font-medium text-red-500">
                  You did not qualify for the next round. Keep practicing!
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 