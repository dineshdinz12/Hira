import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LucideCrown } from "lucide-react"

export function ChallengeLeaderboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Challenge Leaderboard</CardTitle>
        <CardDescription>Top performers in coding challenges</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly">
          <TabsList className="mb-4">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="alltime">All Time</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10 border-2 border-amber-500">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user1" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1 bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      1
                    </div>
                  </div>
                  <div>
                    <div className="font-medium flex items-center gap-1">
                      Jane Doe
                      <LucideCrown size={14} className="text-amber-500" />
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Completed 18 challenges</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-amber-600 dark:text-amber-400">1240</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">points</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10 border-2 border-slate-400">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user2" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1 bg-slate-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      2
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">John Smith</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Completed 16 challenges</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-700 dark:text-slate-300">1180</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">points</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10 border-2 border-slate-400">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user3" />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1 bg-slate-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      3
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Alex Johnson</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Completed 15 challenges</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-700 dark:text-slate-300">1050</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">points</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10 border-2 border-purple-400">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@you" />
                      <AvatarFallback>YO</AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1 bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      8
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">You</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Completed 12 challenges</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-purple-600 dark:text-purple-400">820</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">points</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="monthly">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10 border-2 border-amber-500">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user1" />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1 bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      1
                    </div>
                  </div>
                  <div>
                    <div className="font-medium flex items-center gap-1">
                      Alex Johnson
                      <LucideCrown size={14} className="text-amber-500" />
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Completed 42 challenges</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-amber-600 dark:text-amber-400">3240</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">points</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10 border-2 border-slate-400">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user2" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1 bg-slate-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      2
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Jane Doe</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Completed 38 challenges</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-700 dark:text-slate-300">2980</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">points</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10 border-2 border-purple-400">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@you" />
                      <AvatarFallback>YO</AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1 bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      3
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">You</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Completed 35 challenges</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-purple-600 dark:text-purple-400">2750</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">points</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="alltime">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10 border-2 border-amber-500">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user1" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1 bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      1
                    </div>
                  </div>
                  <div>
                    <div className="font-medium flex items-center gap-1">
                      John Smith
                      <LucideCrown size={14} className="text-amber-500" />
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Completed 215 challenges</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-amber-600 dark:text-amber-400">15,240</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">points</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10 border-2 border-slate-400">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user2" />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1 bg-slate-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      2
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Alex Johnson</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Completed 198 challenges</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-700 dark:text-slate-300">14,320</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">points</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10 border-2 border-slate-400">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user3" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1 bg-slate-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      3
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Jane Doe</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Completed 187 challenges</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-700 dark:text-slate-300">13,580</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">points</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10 border-2 border-purple-400">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@you" />
                      <AvatarFallback>YO</AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1 bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      12
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">You</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Completed 98 challenges</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-purple-600 dark:text-purple-400">7,820</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">points</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
