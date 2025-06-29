'use client';

import { RecruiterSidebar } from "@/components/recruiter/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LucideArrowRight,
  LucideCheck,
  LucideChevronDown,
  LucideCode,
  LucideFilter,
  LucideGraduationCap,
  LucideMapPin,
  LucidePlus,
  LucideSearch,
  LucideStar,
  LucideUser,
  LucideUsers,
  LucideUpload,
  LucideFileText,
  LucideBarChart2,
  LucideX,
} from "lucide-react"
import { CandidateSkillMatch } from "@/components/recruiter/candidate-skill-match"
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface Candidate {
  id: string;
  name: string;
  skills: string[];
  experience: number;
  education: string;
  projects: string[];
  softSkills: string[];
  score?: number;
  analysis?: {
    technicalSkillsMatch: { score: number; analysis: string };
    experienceMatch: { score: number; analysis: string };
    educationMatch: { score: number; analysis: string };
    softSkillsMatch: { score: number; analysis: string };
    overallAnalysis: string;
    recommendation: string;
  };
  status?: 'new' | 'reviewed' | 'interview' | 'offer' | 'rejected';
  interviewDate?: string;
  interviewNotes?: string;
  lastUpdated?: string;
}

interface EvaluationCriteria {
  technicalSkills: number;
  experience: number;
  education: number;
  softSkills: number;
}

interface FilterCriteria {
  scoreRange: [number, number];
  skills: string[];
  experienceRange: [number, number];
  educationLevel: string;
}

const PREDEFINED_SKILLS = [
  // Programming Languages
  { category: "Programming Languages", skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'Go', 'Rust', 'PHP'] },
  // Web Technologies
  { category: "Web Technologies", skills: ['React', 'Angular', 'Vue.js', 'Node.js', 'Express.js', 'Next.js', 'HTML5', 'CSS3', 'SASS'] },
  // Backend & Databases
  { category: "Backend & Databases", skills: ['Django', 'Flask', 'Spring Boot', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis'] },
  // Cloud & DevOps
  { category: "Cloud & DevOps", skills: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'Jenkins'] },
  // Mobile Development
  { category: "Mobile Development", skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Swift', 'Kotlin'] },
  // Data Science & AI
  { category: "Data Science & AI", skills: ['Machine Learning', 'Data Analysis', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy'] },
  // Soft Skills
  { category: "Soft Skills", skills: ['Communication', 'Leadership', 'Problem Solving', 'Teamwork', 'Time Management', 'Critical Thinking', 'Adaptability', 'Creativity'] }
];

export default function Candidates() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobRequirements, setJobRequirements] = useState('');
  const [previewData, setPreviewData] = useState<Candidate[]>([]);
  const [evaluatedCandidates, setEvaluatedCandidates] = useState<Candidate[]>([]);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [topNCandidates, setTopNCandidates] = useState<number>(10);
  const [sortBy, setSortBy] = useState<'score' | 'experience' | 'education'>('score');
  const [filters, setFilters] = useState<FilterCriteria>({
    scoreRange: [0, 100],
    skills: [],
    experienceRange: [0, 20],
    educationLevel: 'all'
  });

  const [criteria, setCriteria] = useState<EvaluationCriteria>({
    technicalSkills: 0.4,
    experience: 0.3,
    education: 0.2,
    softSkills: 0.1
  });

  const [interviewCandidates, setInterviewCandidates] = useState<Candidate[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'analytics'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [interviewNotes, setInterviewNotes] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [minimumExperience, setMinimumExperience] = useState<number>(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFile(file);
      
      // Preview the first few records
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          setPreviewData(data.slice(0, 3));
        } catch (err) {
          setError('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json']
    },
    multiple: false
  });

  const evaluateCandidates = async () => {
    if (!file || !jobRequirements || selectedSkills.length === 0) {
      setError('Please upload a file, provide job requirements, and select at least one required skill');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const text = await file.text();
      const candidates = JSON.parse(text);

      // Prepare evaluation data
      const evaluationData = {
        candidates,
        criteria: {
          weights: criteria,
          requiredSkills: selectedSkills,
          jobRequirements,
          minimumExperience
        }
      };

      const response = await fetch('/api/candidates/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(evaluationData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to evaluate candidates');
      }

      const data = await response.json();
      
      // Process and validate the response
      if (!data.candidates || !Array.isArray(data.candidates)) {
        throw new Error('Invalid response format from server');
      }

      // Ensure each candidate has the required fields
      const validatedCandidates = data.candidates.map((candidate: any) => ({
        ...candidate,
        score: candidate.score || 0,
        analysis: candidate.analysis || {
          technicalSkillsMatch: { score: 0, analysis: 'No analysis available' },
          experienceMatch: { score: 0, analysis: 'No analysis available' },
          educationMatch: { score: 0, analysis: 'No analysis available' },
          softSkillsMatch: { score: 0, analysis: 'No analysis available' },
          overallAnalysis: 'No analysis available',
          recommendation: 'No recommendation available'
        }
      }));

      setEvaluatedCandidates(validatedCandidates);
    } catch (err) {
      console.error('Evaluation error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during evaluation');
    } finally {
      setLoading(false);
    }
  };

  const handleCandidateSelection = (candidateId: string) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId) 
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const calculateMatchScore = (candidate: Candidate) => {
    if (!candidate.analysis) return 0;

    const {
      technicalSkillsMatch,
      experienceMatch,
      educationMatch,
      softSkillsMatch
    } = candidate.analysis;

    // Calculate skill match percentage
    const skillMatchPercentage = selectedSkills.length > 0
      ? (candidate.skills.filter(skill => selectedSkills.includes(skill)).length / selectedSkills.length) * 100
      : 0;

    // Calculate experience match percentage
    const experienceMatchPercentage = minimumExperience > 0
      ? Math.min(100, (candidate.experience / minimumExperience) * 100)
      : 0;

    // Calculate weighted score based on criteria weights
    const weightedScore = (
      (skillMatchPercentage * criteria.technicalSkills) +
      (experienceMatchPercentage * criteria.experience) +
      (educationMatch.score * criteria.education) +
      (softSkillsMatch.score * criteria.softSkills)
    );

    // Ensure the score is between 0 and 100
    return Math.min(100, Math.max(0, Math.round(weightedScore)));
  };

  const getMatchColor = (score: number) => {
    if (score >= 85) return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
    if (score >= 70) return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
    if (score >= 50) return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300";
    return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
  };

  const calculateComponentScore = (candidate: Candidate, component: keyof typeof criteria) => {
    if (!candidate.analysis) return 0;

    switch (component) {
      case 'technicalSkills':
        return selectedSkills.length > 0
          ? (candidate.skills.filter(skill => selectedSkills.includes(skill)).length / selectedSkills.length) * 100
          : 0;
      case 'experience':
        return minimumExperience > 0
          ? Math.min(100, (candidate.experience / minimumExperience) * 100)
          : 0;
      case 'education':
        return candidate.analysis.educationMatch.score * 100;
      case 'softSkills':
        return candidate.analysis.softSkillsMatch.score * 100;
      default:
        return 0;
    }
  };

  const selectTopCandidates = () => {
    const sortedCandidates = [...evaluatedCandidates].sort((a, b) => {
      if (sortBy === 'score') {
        return calculateMatchScore(b) - calculateMatchScore(a);
      } else if (sortBy === 'experience') {
        return b.experience - a.experience;
      } else {
        // Sort by education level (simplified)
        return b.education.localeCompare(a.education);
      }
    });
    
    const topCandidates = sortedCandidates
      .slice(0, topNCandidates)
      .map(candidate => candidate.id);
    
    setSelectedCandidates(topCandidates);
  };

  // Sort candidates by match score by default
  const sortedCandidates = [...evaluatedCandidates].sort((a, b) => 
    calculateMatchScore(b) - calculateMatchScore(a)
  );

  const moveToInterview = () => {
    const candidatesToMove = evaluatedCandidates.filter(candidate => 
      selectedCandidates.includes(candidate.id)
    ).map(candidate => ({
      ...candidate,
      status: 'interview' as const,
      interviewDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    }));

    setInterviewCandidates(prev => [...prev, ...candidatesToMove]);
    setSelectedCandidates([]);
  };

  const updateInterviewNotes = (candidateId: string, notes: string) => {
    setInterviewCandidates(prev => prev.map(candidate => 
      candidate.id === candidateId 
        ? { ...candidate, interviewNotes: notes, lastUpdated: new Date().toISOString() }
        : candidate
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'interview': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'offer': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const handleSkillSelect = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
    setOpen(false);
    setSearchValue("");
  };

  const handleSkillRemove = (skill: string) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill));
  };

  const filteredSkills = PREDEFINED_SKILLS.flatMap(category => 
    category.skills.filter(skill => 
      skill.toLowerCase().includes(searchValue.toLowerCase()) &&
      !selectedSkills.includes(skill)
    )
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <RecruiterSidebar />

      <main className="md:pl-64 pt-16 md:pt-0">
        <div className="container mx-auto p-6">
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Candidate Evaluation</h1>
                <p className="text-slate-600 dark:text-slate-400">Quick and efficient candidate screening</p>
              </div>
              {evaluatedCandidates.length > 0 && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Label>Select Top</Label>
                    <Select
                      value={topNCandidates.toString()}
                      onValueChange={(value) => setTopNCandidates(parseInt(value))}
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="15">15</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                      </SelectContent>
                    </Select>
                    <Label>by</Label>
                    <Select
                      value={sortBy}
                      onValueChange={(value) => setSortBy(value as 'score' | 'experience' | 'education')}
                    >
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="score">Match Score</SelectItem>
                        <SelectItem value="experience">Experience</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      onClick={selectTopCandidates}
                      className="gap-2"
                    >
                      <LucideStar size={16} />
                      <span>Select Top</span>
                </Button>
              </div>
                  {selectedCandidates.length > 0 && (
                    <Button 
                      onClick={moveToInterview}
                      className="gap-2"
                    >
                      <LucideCheck size={16} />
                      <span>Move {selectedCandidates.length} to Interview</span>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </header>

                <div className="space-y-8">
            {!evaluatedCandidates.length ? (
              <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Job Requirements</CardTitle>
                      </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Required Skills</Label>
                        <div className="space-y-4">
                          {/* Selected Skills */}
                          <div className="flex flex-wrap gap-2">
                            {selectedSkills.map((skill) => (
                              <Badge
                                key={skill}
                                variant="secondary"
                                className="flex items-center gap-1"
                              >
                                {skill}
                                <button
                                  onClick={() => handleSkillRemove(skill)}
                                  className="ml-1 hover:text-destructive"
                                >
                                  <LucideX className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>

                          {/* Searchable Skills Combobox */}
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full justify-between"
                              >
                                {searchValue || "Search skills..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput 
                                  placeholder="Search skills..." 
                                  value={searchValue}
                                  onValueChange={setSearchValue}
                                />
                                <CommandEmpty>No skills found.</CommandEmpty>
                                <CommandGroup className="max-h-[300px] overflow-auto">
                                  {PREDEFINED_SKILLS.map((category) => (
                                    <div key={category.category}>
                                      <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                                        {category.category}
                                      </div>
                                      {category.skills
                                        .filter(skill => 
                                          skill.toLowerCase().includes(searchValue.toLowerCase()) &&
                                          !selectedSkills.includes(skill)
                                        )
                                        .map((skill) => (
                                          <CommandItem
                                            key={skill}
                                            value={skill}
                                            onSelect={() => handleSkillSelect(skill)}
                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                selectedSkills.includes(skill) ? "opacity-100" : "opacity-0"
                                              )}
                                            />
                                            {skill}
                                          </CommandItem>
                                        ))}
                                    </div>
                                  ))}
                                </CommandGroup>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Job Description</Label>
                        <textarea
                          className="w-full min-h-[150px] p-2 border rounded-md"
                          value={jobRequirements}
                          onChange={(e) => setJobRequirements(e.target.value)}
                          placeholder="Enter job requirements..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Required Experience (years)</Label>
                        <Input 
                          type="number" 
                          min="0"
                          value={minimumExperience}
                          onChange={(e) => setMinimumExperience(Math.max(0, parseInt(e.target.value) || 0))}
                          placeholder="Minimum years of experience" 
                        />
                      </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Evaluation Criteria</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {Object.entries(criteria).map(([key, value]) => (
                          <div key={key} className="space-y-2">
                            <div className="flex justify-between">
                              <Label>
                                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                              </Label>
                              <span className="text-sm text-muted-foreground">{Math.round(value * 100)}%</span>
                            </div>
                            <Slider
                              value={[value]}
                              onValueChange={([newValue]) => setCriteria({ ...criteria, [key]: newValue })}
                              max={1}
                              step={0.05}
                            />
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Upload Candidate Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                          isDragActive ? 'border-primary bg-primary/5' : 'border-muted'
                        }`}
                      >
                        <input {...getInputProps()} />
                        <LucideUpload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-sm text-muted-foreground">
                          {isDragActive
                            ? 'Drop the JSON file here'
                            : 'Drag and drop a JSON file, or click to select'}
                        </p>
                        {file && (
                          <p className="mt-2 text-sm text-primary">
                            Selected file: {file.name}
                          </p>
                        )}
                      </div>

                      {previewData.length > 0 && (
                        <div className="mt-4">
                          <h3 className="text-sm font-medium mb-2">Preview (First 3 Records):</h3>
                          <div className="space-y-2">
                            {previewData.map((candidate, index) => (
                              <div key={index} className="text-sm p-2 bg-muted rounded">
                                <p><strong>Name:</strong> {candidate.name}</p>
                                <p><strong>Skills:</strong> {candidate.skills.join(', ')}</p>
                                <p><strong>Experience:</strong> {candidate.experience} years</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <div className="flex justify-end">
                    <Button
                      onClick={evaluateCandidates}
                      disabled={loading || !file || !jobRequirements}
                      className="w-full sm:w-auto"
                    >
                      {loading ? 'Evaluating...' : 'Evaluate Candidates'}
                    </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <h2 className="text-2xl font-bold">Evaluation Results</h2>
                      <Badge variant="outline" className="text-lg">
                        {evaluatedCandidates.length} Candidates
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <Select
                        value={viewMode}
                        onValueChange={(value: 'list' | 'grid' | 'analytics') => setViewMode(value)}
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="View Mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="list">List View</SelectItem>
                          <SelectItem value="grid">Grid View</SelectItem>
                          <SelectItem value="analytics">Analytics</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        onClick={() => setEvaluatedCandidates([])}
                      >
                        <LucideX className="h-4 w-4 mr-2" />
                        Clear Results
                      </Button>
                    </div>
                  </div>

                  {/* Search and Filter Section */}
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <LucideSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search candidates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select
                      value={filters.educationLevel}
                      onValueChange={(value: string) => setFilters(prev => ({ ...prev, educationLevel: value }))}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Education Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Education Levels</SelectItem>
                        <SelectItem value="bachelors">Bachelor's</SelectItem>
                        <SelectItem value="masters">Master's</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                </div>

                  {/* Candidates List */}
                <div className="space-y-4">
                    {sortedCandidates.map((candidate) => {
                      const matchScore = calculateMatchScore(candidate);
                      return (
                        <Card 
                          key={candidate.id}
                          className={`transition-all duration-200 ${
                            selectedCandidates.includes(candidate.id) 
                              ? 'ring-2 ring-primary' 
                              : ''
                          }`}
                        >
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div className="flex items-start gap-4">
                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={selectedCandidates.includes(candidate.id)}
                                    onChange={() => handleCandidateSelection(candidate.id)}
                                    className="h-5 w-5 rounded border-gray-300"
                                  />
                                </div>
                                <Avatar className="h-12 w-12">
                                  <AvatarImage src={`/placeholder.svg?height=48&width=48`} alt={candidate.name} />
                                  <AvatarFallback>
                                    {candidate.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-medium text-lg">{candidate.name}</h3>
                                  <div className="flex flex-wrap gap-4 mt-1 text-sm text-slate-600 dark:text-slate-400">
                                    <div className="flex items-center gap-1">
                                      <LucideGraduationCap size={14} />
                                      <span>{candidate.education}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <LucideCode size={14} />
                                      <span>{candidate.experience} years experience</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <Badge className={getMatchColor(matchScore)}>
                                  {matchScore}% Match
                                </Badge>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      View Details
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-3xl">
                                    <DialogHeader>
                                      <DialogTitle>Candidate Details</DialogTitle>
                                      <DialogDescription>
                                        Comprehensive analysis and evaluation
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-6">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <h4 className="font-medium mb-2">
                                            Technical Skills ({Math.round(calculateComponentScore(candidate, 'technicalSkills'))}%)
                                          </h4>
                                          <Progress value={calculateComponentScore(candidate, 'technicalSkills')} />
                                          <p className="text-sm mt-2">
                                            Matches {candidate.skills.filter(skill => selectedSkills.includes(skill)).length} of {selectedSkills.length} required skills
                                          </p>
                                        </div>
                                        <div>
                                          <h4 className="font-medium mb-2">
                                            Experience ({Math.round(calculateComponentScore(candidate, 'experience'))}%)
                                          </h4>
                                          <Progress value={calculateComponentScore(candidate, 'experience')} />
                                          <p className="text-sm mt-2">
                                            {candidate.experience} years vs {minimumExperience} years required
                                          </p>
                                        </div>
                                        <div>
                                          <h4 className="font-medium mb-2">
                                            Education ({Math.round(calculateComponentScore(candidate, 'education'))}%)
                                          </h4>
                                          <Progress value={calculateComponentScore(candidate, 'education')} />
                                          <p className="text-sm mt-2">{candidate.analysis?.educationMatch.analysis}</p>
                                        </div>
                                        <div>
                                          <h4 className="font-medium mb-2">
                                            Soft Skills ({Math.round(calculateComponentScore(candidate, 'softSkills'))}%)
                                          </h4>
                                          <Progress value={calculateComponentScore(candidate, 'softSkills')} />
                                          <p className="text-sm mt-2">{candidate.analysis?.softSkillsMatch.analysis}</p>
                                        </div>
                                      </div>
                                      <div>
                                        <h4 className="font-medium mb-2">Skills</h4>
                                        <div className="flex flex-wrap gap-2">
                                          {candidate.skills.map((skill, i) => (
                                            <Badge 
                                              key={i} 
                                              variant={selectedSkills.includes(skill) ? "default" : "outline"}
                                            >
                                              {skill}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                      <div>
                                        <h4 className="font-medium mb-2">Overall Analysis</h4>
                                        <p className="text-sm">{candidate.analysis?.overallAnalysis}</p>
                                      </div>
                                      <div>
                                        <h4 className="font-medium mb-2">Recommendation</h4>
                                        <p className="text-sm">{candidate.analysis?.recommendation}</p>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                {/* Interview Candidates Section */}
                {interviewCandidates.length > 0 && (
                  <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-6">Interview Candidates</h2>
                <div className="space-y-4">
                      {interviewCandidates.map((candidate) => (
                        <Card key={candidate.id}>
                      <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={`/placeholder.svg?height=48&width=48`} alt={candidate.name} />
                              <AvatarFallback>
                                {candidate.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium text-lg">{candidate.name}</h3>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge className={getStatusColor(candidate.status || 'new')}>
                                      {(candidate.status || 'new').charAt(0).toUpperCase() + (candidate.status || 'new').slice(1)}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">
                                      Interview Date: {new Date(candidate.interviewDate || new Date().toISOString()).toLocaleDateString()}
                                    </span>
                                </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline">Add Notes</Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Interview Notes</DialogTitle>
                                      <DialogDescription>
                                        Add notes about the candidate's interview
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <textarea
                                        className="w-full min-h-[200px] p-2 border rounded-md"
                                        value={candidate.interviewNotes || ''}
                                        onChange={(e) => updateInterviewNotes(candidate.id, e.target.value)}
                                        placeholder="Enter interview notes..."
                                      />
                                      <div className="flex justify-end">
                                        <Button onClick={() => setSelectedCandidate(null)}>
                                          Save Notes
                          </Button>
                        </div>
                </div>
                                  </DialogContent>
                                </Dialog>
                                <Select
                                  value={candidate.status}
                                  onValueChange={(value: 'interview' | 'offer' | 'rejected') => {
                                    setInterviewCandidates(prev => prev.map(c => 
                                      c.id === candidate.id 
                                        ? { ...c, status: value, lastUpdated: new Date().toISOString() }
                                        : c
                                    ));
                                  }}
                                >
                                  <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="Update Status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="interview">Interview</SelectItem>
                                    <SelectItem value="offer">Offer</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            {candidate.interviewNotes && (
                              <div className="mt-4 p-4 bg-muted rounded-lg">
                                <h4 className="font-medium mb-2">Interview Notes</h4>
                                <p className="text-sm">{candidate.interviewNotes}</p>
                                <p className="text-xs text-muted-foreground mt-2">
                                  Last updated: {new Date(candidate.lastUpdated || '').toLocaleString()}
                                </p>
                              </div>
                            )}
                    </CardContent>
                  </Card>
                      ))}
                </div>
          </div>
                )}
              </>
            )}

            {error && (
              <div className="bg-destructive/15 text-destructive p-4 rounded-lg">
                {error}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
