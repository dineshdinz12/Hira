import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";

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

interface InterviewState {
  currentSection: number;
  currentQuestion: number;
  answers: Record<string, string>;
  scores: Record<string, number>;
}

export function InterviewTemplate({ content }: { content: TemplateContent }) {
  const [interviewState, setInterviewState] = useState<InterviewState>({
    currentSection: 0,
    currentQuestion: 0,
    answers: {},
    scores: {},
  });

  const currentSection = content.sections[interviewState.currentSection];
  const currentQuestion = currentSection?.questions[interviewState.currentQuestion];

  const handleAnswer = (questionId: string, answer: string) => {
    setInterviewState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer }
    }));
  };

  const handleScore = (questionId: string, score: number) => {
    setInterviewState(prev => ({
      ...prev,
      scores: { ...prev.scores, [questionId]: score }
    }));
  };

  const nextQuestion = () => {
    if (interviewState.currentQuestion < currentSection.questions.length - 1) {
      setInterviewState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
    } else if (interviewState.currentSection < content.sections.length - 1) {
      setInterviewState(prev => ({
        ...prev,
        currentSection: prev.currentSection + 1,
        currentQuestion: 0
      }));
    }
  };

  const previousQuestion = () => {
    if (interviewState.currentQuestion > 0) {
      setInterviewState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1
      }));
    } else if (interviewState.currentSection > 0) {
      setInterviewState(prev => ({
        ...prev,
        currentSection: prev.currentSection - 1,
        currentQuestion: content.sections[prev.currentSection - 1].questions.length - 1
      }));
    }
  };

  if (!currentSection || !currentQuestion) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
        <div 
          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
          style={{ 
            width: `${((interviewState.currentSection * content.sections.length + interviewState.currentQuestion + 1) / 
              (content.sections.reduce((acc, section) => acc + section.questions.length, 0))) * 100}%` 
          }}
        />
      </div>

      {/* Section Navigation */}
      <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
        <div>
          Section {interviewState.currentSection + 1} of {content.sections.length}
        </div>
        <div>
          Question {interviewState.currentQuestion + 1} of {currentSection.questions.length}
        </div>
      </div>

      {/* Current Section */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">{currentSection.title}</h3>
          <span className="text-sm text-slate-500">{currentSection.duration}</span>
        </div>

        {/* Current Question */}
        <div className="space-y-4">
          <div className="border-l-2 border-purple-500 pl-4">
            <div className="flex items-start gap-2">
              <span className="text-sm font-medium">Q:</span>
              <div className="flex-1">
                <p className="text-sm">{currentQuestion.text}</p>
                
                {/* Question Input */}
                {currentQuestion.type === 'multiple_choice' && currentQuestion.options && (
                  <div className="mt-4 space-y-2">
                    {currentQuestion.options.map((option, idx) => (
                      <label key={idx} className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={option}
                          checked={interviewState.answers[currentQuestion.id] === option}
                          onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                          className="h-4 w-4 border-slate-300"
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
                
                {currentQuestion.type === 'open_ended' && (
                  <textarea
                    value={interviewState.answers[currentQuestion.id] || ''}
                    onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                    className="mt-4 w-full p-2 border border-slate-200 dark:border-slate-800 rounded-md"
                    rows={4}
                    placeholder="Enter your answer..."
                  />
                )}

                {/* Scoring */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">Evaluation</h4>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button
                        key={score}
                        onClick={() => handleScore(currentQuestion.id, score)}
                        className={`px-3 py-1 rounded-md text-sm ${
                          interviewState.scores[currentQuestion.id] === score
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={previousQuestion}
            disabled={interviewState.currentSection === 0 && interviewState.currentQuestion === 0}
            className="gap-2"
          >
            <LucideChevronLeft size={16} />
            Previous
          </Button>
          <Button
            onClick={nextQuestion}
            disabled={
              interviewState.currentSection === content.sections.length - 1 &&
              interviewState.currentQuestion === currentSection.questions.length - 1
            }
            className="gap-2"
          >
            Next
            <LucideChevronRight size={16} />
          </Button>
        </div>
      </div>

      {/* Evaluation Criteria */}
      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md border border-slate-200 dark:border-slate-800">
        <h4 className="font-medium mb-2">Evaluation Criteria</h4>
        <div className="space-y-2">
          {currentSection.evaluation_criteria.criteria.map((criterion, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-sm">•</span>
              <span className="text-sm">{criterion}</span>
            </div>
          ))}
          <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            <p>Scoring: {currentSection.evaluation_criteria.scoring.min}-{currentSection.evaluation_criteria.scoring.max}</p>
            <p>{currentSection.evaluation_criteria.scoring.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 