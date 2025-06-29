"use client"

import { RecruiterSidebar } from "@/components/recruiter/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import {
  LucideArrowRight,
  LucideCheck,
  LucideClipboard,
  LucideCopy,
  LucideEdit,
  LucideFileText,
  LucideFilter,
  LucidePlus,
  LucideSearch,
  LucideShare2,
  LucideStar,
  LucideTrash,
  LucideChevronRight,
  LucideChevronLeft,
} from "lucide-react"
import React from 'react'
import { InterviewTemplate } from "../../components/recruiter/interview-template"

type TemplateType = 'email' | 'assessment' | 'interview' | 'feedback'

interface Question {
  id: string;
  text: string;
  type: 'multiple_choice' | 'open_ended' | 'technical' | 'behavioral';
  options?: string[];
}

interface EvaluationCriteria {
  criteria: string[];
  scoring: {
    min: number;
    max: number;
    description: string;
  };
}

interface Section {
  title: string;
  duration: string;
  questions: Question[];
  evaluation_criteria: EvaluationCriteria;
}

interface TemplateContent {
  sections: Section[];
  metadata: {
    total_duration: string;
    required_skills: string[];
    difficulty_level: string;
    evaluation_methodology: string;
  };
}

interface Template {
  id: string;
  title: string;
  description: string;
  content: string | TemplateContent;
  type: TemplateType;
  category: string;
  createdBy: string;
  usedCount: number;
  rating: number;
  isFavorite: boolean;
}

const tabValues: TemplateType[] = ['email', 'assessment', 'interview', 'feedback'];

function TemplateDisplay({ template }: { template: Template }) {
  if (typeof template.content === 'string') {
    return (
      <div className="whitespace-pre-line">
        {template.content}
      </div>
    );
  }

  return <InterviewTemplate content={template.content} />;
}

export default function TemplatesPage() {
  const [activeTab, setActiveTab] = useState<TemplateType>('email')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('recent')
  const [isLoading, setIsLoading] = useState(true)
  const [templates, setTemplates] = useState<Template[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false)
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationRequirements, setGenerationRequirements] = useState('')
  const [generationCategory, setGenerationCategory] = useState('Standard')
  const [generationType, setGenerationType] = useState<TemplateType>('email')
  const [generationError, setGenerationError] = useState<string | null>(null)
  const [newTemplate, setNewTemplate] = useState<Partial<Template>>({
    type: 'email',
    title: '',
    description: '',
    content: '',
    category: 'Standard',
    createdBy: 'Current User',
    usedCount: 0,
    rating: 0,
    isFavorite: false
  })

  // Load templates on component mount
  useEffect(() => {
    loadTemplates()
  }, [])

  const loadTemplates = async () => {
    setIsLoading(true)
    try {
      // TODO: Replace with actual API call
      setTemplates([])
    } catch (error) {
      toast.error('Failed to load templates')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateTemplate = async () => {
    if (!generationRequirements) {
      toast.error('Please provide requirements for template generation')
      return
    }

    setIsGenerating(true)
    setGenerationError(null)
    try {
      const response = await fetch('/api/templates/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: generationType,
          requirements: generationRequirements,
          category: generationCategory
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate template')
      }

      if (!data.template || !data.template.title || !data.template.content) {
        throw new Error('Invalid template response from server')
      }

      // Add the new template to the list
      setTemplates(prev => [data.template, ...prev])
      
      // Reset form and close dialog
      setIsGenerateDialogOpen(false)
      setGenerationRequirements('')
      setGenerationCategory('Standard')
      setGenerationType('email')
      
      // Show success message
      toast.success('Template generated successfully', {
        description: `Created "${data.template.title}"`
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate template'
      setGenerationError(errorMessage)
      toast.error('Failed to generate template', {
        description: errorMessage
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCreateTemplate = async () => {
    if (!newTemplate.title || !newTemplate.content) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      // TODO: Replace with actual API call
      const newId = Date.now().toString()
      const template: Template = {
        id: newId,
        ...newTemplate as Omit<Template, 'id'>
      }
      setTemplates(prev => [...prev, template])
      setIsCreateDialogOpen(false)
      setNewTemplate({
        type: activeTab,
        title: '',
        description: '',
        content: '',
        category: 'Standard',
        createdBy: 'Current User',
        usedCount: 0,
        rating: 0,
        isFavorite: false
      })
      toast.success('Template created successfully')
    } catch (error) {
      toast.error('Failed to create template')
    }
  }

  const handleEditTemplate = (template: Template) => {
    setNewTemplate(template)
    setIsCreateDialogOpen(true)
  }

  const handleDeleteTemplate = async () => {
    if (!templateToDelete) return
    try {
      // TODO: Replace with actual API call
      setTemplates(prev => prev.filter(t => t.id !== templateToDelete))
      setIsDeleteDialogOpen(false)
      setTemplateToDelete(null)
      toast.success('Template deleted successfully')
    } catch (error) {
      toast.error('Failed to delete template')
    }
  }

  const handleCopyTemplate = (content: string | TemplateContent) => {
    const contentString = typeof content === 'string' 
      ? content 
      : JSON.stringify(content, null, 2);
    navigator.clipboard.writeText(contentString);
    toast.success('Template copied to clipboard');
  };

  const toggleFavorite = async (id: string) => {
    try {
      // TODO: Replace with actual API call
      setTemplates(prev => prev.map(t => 
        t.id === id ? { ...t, isFavorite: !t.isFavorite } : t
      ))
      toast.success('Template updated')
    } catch (error) {
      toast.error('Failed to update template')
    }
  }

  const handleShareTemplate = async () => {
    try {
      // TODO: Replace with actual API call
      toast.success('Template shared successfully')
      setIsShareDialogOpen(false)
    } catch (error) {
      toast.error('Failed to share template')
    }
  }

  const handleTabChange = (value: string) => {
    if (value === 'email' || value === 'assessment' || value === 'interview' || value === 'feedback') {
      setActiveTab(value as TemplateType)
    }
  }

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = template.type === activeTab
    return matchesSearch && matchesType
  })

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetical':
        return a.title.localeCompare(b.title)
      case 'created':
        return b.usedCount - a.usedCount
      case 'recent':
      default:
        return b.usedCount - a.usedCount
    }
  })

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <RecruiterSidebar />

      <main className="md:pl-64 pt-16 md:pt-0">
        <div className="container mx-auto p-6">
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Templates Library</h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Manage your email, assessment, and interview templates
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => setIsShareDialogOpen(true)}
                >
                  <LucideShare2 size={16} />
                  <span>Share Templates</span>
                </Button>
                <Button 
                  variant="outline"
                  className="gap-2"
                  onClick={() => {
                    setGenerationType(activeTab)
                    setIsGenerateDialogOpen(true)
                  }}
                >
                  <LucideFileText size={16} />
                  <span>Generate with AI</span>
                </Button>
                <Button 
                  className="gap-2"
                  onClick={() => {
                    setNewTemplate({...newTemplate, type: activeTab})
                    setIsCreateDialogOpen(true)
                  }}
                >
                  <LucidePlus size={16} />
                  <span>Create Template</span>
                </Button>
              </div>
            </div>
          </header>

          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <LucideSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
                <Input
                  type="search"
                  placeholder="Search templates..."
                  className="w-full bg-white dark:bg-slate-900 pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Button variant="outline" size="sm" className="gap-1">
                  <LucideFilter size={14} />
                  <span>Filter</span>
                </Button>
                <select 
                  className="h-9 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1 text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recent">Recently Used</option>
                  <option value="alphabetical">Alphabetical</option>
                  <option value="created">Date Created</option>
                </select>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="mb-6">
              <TabsTrigger value="email">Email Templates</TabsTrigger>
              <TabsTrigger value="assessment">Assessment Templates</TabsTrigger>
              <TabsTrigger value="interview">Interview Templates</TabsTrigger>
              <TabsTrigger value="feedback">Feedback Templates</TabsTrigger>
            </TabsList>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : (
              <>
                {tabValues.map((tabValue) => (
                  <TabsContent key={tabValue} value={tabValue}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {sortedTemplates.filter(t => t.type === tabValue).map(template => (
                        <Card key={template.id}>
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <CardTitle>{template.title}</CardTitle>
                                <CardDescription>{template.description}</CardDescription>
                              </div>
                              <Badge>{template.category}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="text-sm">
                            <TemplateDisplay template={template} />
                            <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 mt-4">
                              <div className="flex items-center gap-2">
                                <span>Created by: {template.createdBy}</span>
                                <span>•</span>
                                <span>Used {template.usedCount} times</span>
                              </div>
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <LucideStar
                                    key={star}
                                    className={`h-3 w-3 ${star <= template.rating ? 'fill-yellow-400 text-yellow-400' : ''}`}
                                  />
                                ))}
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between pt-0">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="gap-1"
                              onClick={() => toggleFavorite(template.id)}
                            >
                              <LucideStar 
                                size={14} 
                                className={template.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}
                              />
                              <span>Favorite</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="gap-1"
                              onClick={() => handleEditTemplate(template)}
                            >
                              <LucideEdit size={14} />
                              <span>Edit</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="gap-1"
                              onClick={() => handleCopyTemplate(template.content)}
                            >
                              <LucideCopy size={14} />
                              <span>Copy</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                              onClick={() => {
                                setTemplateToDelete(template.id)
                                setIsDeleteDialogOpen(true)
                              }}
                            >
                              <LucideTrash size={14} />
                              <span>Delete</span>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}

                      <Card 
                        className="border-dashed border-2 flex flex-col items-center justify-center p-6 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                        onClick={() => {
                          setNewTemplate({...newTemplate, type: tabValue})
                          setIsCreateDialogOpen(true)
                        }}
                      >
                        <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3 mb-3">
                          <LucidePlus className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="text-lg font-medium mb-1">Create New Template</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-4">
                          Add a new {tabValue} template to your library
                        </p>
                        <Button size="sm">Create Template</Button>
                      </Card>
                    </div>
                  </TabsContent>
                ))}
              </>
            )}
          </Tabs>
        </div>
      </main>

      {/* Create Template Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Template</DialogTitle>
            <DialogDescription>
              Add a new template to your library
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newTemplate.title}
                onChange={(e) => setNewTemplate({...newTemplate, title: e.target.value})}
                placeholder="Enter template title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newTemplate.description}
                onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
                placeholder="Enter template description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={typeof newTemplate.content === 'string' ? newTemplate.content : JSON.stringify(newTemplate.content, null, 2)}
                onChange={(e) => {
                  try {
                    const parsedContent = JSON.parse(e.target.value);
                    setNewTemplate({...newTemplate, content: parsedContent});
                  } catch {
                    setNewTemplate({...newTemplate, content: e.target.value});
                  }
                }}
                placeholder="Enter template content"
                className="h-32"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={newTemplate.category}
                onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value})}
                placeholder="Enter template category"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTemplate}>
              Create Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Template Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Template</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this template? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteTemplate}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Template Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Templates</DialogTitle>
            <DialogDescription>
              Share your templates with team members
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter team member's email"
              />
            </div>
            <div className="space-y-2">
              <Label>Templates to Share</Label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {templates.map(template => (
                  <div key={template.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`template-${template.id}`}
                      className="rounded border-slate-300"
                    />
                    <label htmlFor={`template-${template.id}`} className="text-sm">
                      {template.title}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsShareDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleShareTemplate}>
              Share
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Generate Template Dialog */}
      <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Generate Interview Template</DialogTitle>
            <DialogDescription>
              Provide requirements to generate a structured interview template using AI. The more specific your requirements, the better the result.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="template-type">Template Type</Label>
              <select
                id="template-type"
                className="w-full h-9 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1 text-sm"
                value={generationType}
                onChange={(e) => setGenerationType(e.target.value as TemplateType)}
              >
                <option value="interview">Interview Template</option>
                <option value="assessment">Assessment Template</option>
                <option value="feedback">Feedback Template</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements</Label>
              <Textarea
                id="requirements"
                value={generationRequirements}
                onChange={(e) => setGenerationRequirements(e.target.value)}
                placeholder="Describe the requirements for the interview template. Include:
- Role and seniority level
- Key skills to evaluate
- Number of sections needed
- Types of questions (technical, behavioral, etc.)
- Evaluation criteria
- Time constraints"
                className="h-32"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={generationCategory}
                onChange={(e) => setGenerationCategory(e.target.value)}
                placeholder="Enter template category (e.g., Technical, Behavioral, Leadership)"
              />
            </div>
            {generationError && (
              <div className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
                {generationError}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsGenerateDialogOpen(false)
              setGenerationError(null)
            }}>
              Cancel
            </Button>
            <Button 
              onClick={handleGenerateTemplate} 
              disabled={isGenerating || !generationRequirements}
              className="gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <LucideFileText size={16} />
                  <span>Generate Template</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
