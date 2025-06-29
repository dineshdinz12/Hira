import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LucideEye, MicIcon as LucideMicrophone, LucideUser } from "lucide-react"

export function InterviewFeedback() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Feedback</CardTitle>
        <CardDescription>Analysis from your last interview session</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="speech">
          <TabsList className="mb-4">
            <TabsTrigger value="speech" className="flex items-center gap-2">
              <LucideMicrophone size={16} />
              <span>Speech</span>
            </TabsTrigger>
            <TabsTrigger value="visual" className="flex items-center gap-2">
              <LucideEye size={16} />
              <span>Visual</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <LucideUser size={16} />
              <span>Content</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="speech" className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Voice Confidence</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Your voice was clear and projected confidence during most of the interview. There was a slight drop in
                volume when discussing technical challenges.
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "75%" }}></div>
                </div>
                <span className="text-xs font-medium">75%</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Filler Words</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                You used "um" 12 times and "like" 8 times during the 30-minute interview. This is a 40% improvement from
                your previous session.
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "60%" }}></div>
                </div>
                <span className="text-xs font-medium">60%</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Speaking Pace</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Your speaking pace was well-balanced at 145 words per minute, which is within the ideal range for clear
                communication.
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }}></div>
                </div>
                <span className="text-xs font-medium">85%</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="visual" className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Eye Contact</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                You maintained eye contact with the camera 62% of the time. Try to increase this to 70-80% for better
                engagement.
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "62%" }}></div>
                </div>
                <span className="text-xs font-medium">62%</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Posture</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Your posture was upright and professional throughout the interview. This conveys confidence and
                attentiveness.
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "90%" }}></div>
                </div>
                <span className="text-xs font-medium">90%</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Gestures</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Your hand gestures were natural and helped emphasize key points. Avoid fidgeting with objects during
                future interviews.
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "75%" }}></div>
                </div>
                <span className="text-xs font-medium">75%</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Technical Accuracy</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Your explanations of React hooks and state management were technically accurate and well-articulated.
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }}></div>
                </div>
                <span className="text-xs font-medium">85%</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Question Comprehension</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                You understood most questions well, but asked for clarification twice. This is a good practice when
                needed.
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "80%" }}></div>
                </div>
                <span className="text-xs font-medium">80%</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">STAR Method Usage</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Your behavioral responses could better follow the STAR method (Situation, Task, Action, Result) for more
                structured answers.
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "65%" }}></div>
                </div>
                <span className="text-xs font-medium">65%</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
