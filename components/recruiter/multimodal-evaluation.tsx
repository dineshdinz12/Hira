import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LucideCode, MicIcon as LucideMicrophone, LucideUser } from "lucide-react"

export function MultimodalEvaluation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Analysis</CardTitle>
        <CardDescription>Multimodal evaluation results</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="speech">
          <TabsList className="mb-4">
            <TabsTrigger value="speech" className="flex items-center gap-2">
              <LucideMicrophone size={16} />
              <span>Speech</span>
            </TabsTrigger>
            <TabsTrigger value="technical" className="flex items-center gap-2">
              <LucideCode size={16} />
              <span>Technical</span>
            </TabsTrigger>
            <TabsTrigger value="behavioral" className="flex items-center gap-2">
              <LucideUser size={16} />
              <span>Behavioral</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="speech" className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Voice Confidence</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                The candidate spoke clearly and confidently throughout the interview. Voice modulation was appropriate
                and engaging.
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "90%" }}></div>
                </div>
                <span className="text-xs font-medium">90%</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Speech Clarity</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Excellent articulation with minimal filler words. Technical terms were pronounced correctly and
                explained clearly.
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }}></div>
                </div>
                <span className="text-xs font-medium">85%</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Sentiment Analysis</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Positive sentiment detected throughout the interview. The candidate showed enthusiasm when discussing
                previous projects.
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "88%" }}></div>
                </div>
                <span className="text-xs font-medium">88%</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="technical" className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">React Knowledge</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Strong understanding of React hooks, state management, and component lifecycle. Correctly explained
                virtual DOM concepts.
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "92%" }}></div>
                </div>
                <span className="text-xs font-medium">92%</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">JavaScript Proficiency</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Demonstrated solid understanding of JavaScript fundamentals, closures, and async patterns. Some
                hesitation on more advanced topics.
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }}></div>
                </div>
                <span className="text-xs font-medium">85%</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Problem Solving</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Good approach to breaking down complex problems. Could improve on optimization techniques for algorithm
                questions.
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "78%" }}></div>
                </div>
                <span className="text-xs font-medium">78%</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="behavioral" className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Teamwork Examples</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Provided concrete examples of collaboration and conflict resolution. Demonstrated clear understanding of
                team dynamics.
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "90%" }}></div>
                </div>
                <span className="text-xs font-medium">90%</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Leadership Potential</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Showed initiative in previous roles and mentored junior developers. Has potential for future leadership
                positions.
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }}></div>
                </div>
                <span className="text-xs font-medium">85%</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Cultural Alignment</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Values align well with company culture. Emphasized continuous learning and collaborative
                problem-solving.
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "92%" }}></div>
                </div>
                <span className="text-xs font-medium">92%</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
