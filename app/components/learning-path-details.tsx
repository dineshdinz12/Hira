import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LucideBookOpen, LucideCheck, LucideStar } from "lucide-react"

type Resource = {
  type: string
  title: string
  url: string
  completed?: boolean
}

type Subtopic = {
  name: string
  content: string
  completed: boolean
  resources: Resource[]
}

type Topic = {
  name: string
  completed: boolean
  subtopics: Subtopic[]
}

type Step = {
  name: string
  description: string
  completed: boolean
  topics: Topic[]
}

type LearningPath = {
  title: string
  description: string
  progress: number
  status: string
  current_module: string
  steps: Step[]
}

interface LearningPathDetailsProps {
  path: LearningPath
  onProgressUpdate: (progress: number) => void
}

export function LearningPathDetails({ path, onProgressUpdate }: LearningPathDetailsProps) {
  const calculateStepProgress = (step: Step) => {
    const totalResources = step.topics.reduce(
      (acc, topic) => acc + topic.subtopics.reduce((acc, subtopic) => acc + subtopic.resources.length, 0),
      0
    )
    const completedResources = step.topics.reduce(
      (acc, topic) =>
        acc +
        topic.subtopics.reduce(
          (acc, subtopic) => acc + subtopic.resources.filter((r) => r.completed).length,
          0
        ),
      0
    )
    return totalResources > 0 ? (completedResources / totalResources) * 100 : 0
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg">
          <LucideBookOpen size={24} className="text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{path.title}</h1>
          <p className="text-slate-600 dark:text-slate-400">{path.description}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1 text-sm">
            <span>Overall Progress</span>
            <span className="font-medium">{path.progress}%</span>
          </div>
          <Progress value={path.progress} className="h-2" />
        </div>

        <div className="space-y-4">
          {path.steps.map((step, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg">{step.name}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </div>
                  <Badge variant={step.completed ? "outline" : "default"}>
                    {step.completed ? "Completed" : "In Progress"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {step.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="space-y-2">
                      <h4 className="font-medium">{topic.name}</h4>
                      <div className="space-y-2">
                        {topic.subtopics.map((subtopic, subtopicIndex) => (
                          <div key={subtopicIndex} className="pl-4 border-l-2 border-slate-200 dark:border-slate-800">
                            <h5 className="font-medium text-sm">{subtopic.name}</h5>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                              {subtopic.content}
                            </p>
                            <div className="space-y-2">
                              {subtopic.resources.map((resource, resourceIndex) => (
                                <div
                                  key={resourceIndex}
                                  className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-900 rounded-lg"
                                >
                                  <div className="flex items-center gap-2">
                                    <LucideStar
                                      size={16}
                                      className={`${
                                        resource.completed
                                          ? "text-green-500"
                                          : "text-slate-400"
                                      }`}
                                    />
                                    <span className="text-sm">{resource.title}</span>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      // Handle resource completion
                                      const updatedPath = { ...path }
                                      updatedPath.steps[index].topics[topicIndex].subtopics[
                                        subtopicIndex
                                      ].resources[resourceIndex].completed = !resource.completed
                                      const newProgress = calculateStepProgress(updatedPath.steps[index])
                                      onProgressUpdate(newProgress)
                                    }}
                                  >
                                    {resource.completed ? (
                                      <LucideCheck size={16} className="text-green-500" />
                                    ) : (
                                      "Mark Complete"
                                    )}
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 