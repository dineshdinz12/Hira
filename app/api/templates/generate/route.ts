import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface TemplateRequest {
  type: 'email' | 'assessment' | 'interview' | 'feedback';
  requirements: string;
  category: string;
}

function getTypeSpecificPrompt(type: string, requirements: string, category: string) {
  const basePrompt = `You are a professional HR interview system generator. Generate a ${type} template based on the following requirements. The template should be professional, well-structured, and ready to use.

    Requirements:
    ${requirements}

    Category: ${category}`;

  const typeSpecificGuidelines = {
    email: `Email Template Guidelines:
    - Start with a clear, professional subject line
    - Use a professional greeting
    - Structure the email with clear sections
    - Include a clear call to action
    - End with a professional signature
    - Use placeholders in {curly_brackets} for personalization
    - Keep the tone professional and engaging
    - Include company branding elements if relevant
    - Format: Subject line followed by email body`,

    assessment: `Assessment Template Guidelines:
    - Clear assessment title and objectives
    - Detailed evaluation criteria
    - Structured sections for different skills/areas
    - Specific questions or tasks for each section
    - Scoring guidelines and rubrics
    - Time limits and instructions
    - Required skills and knowledge areas
    - Evaluation methodology
    - Format: Title, Objectives, Sections, Questions, Scoring Guide`,

    interview: `Interview Template Guidelines:
    - Interview structure and duration
    - Key areas to evaluate
    - Specific questions for each area
    - Evaluation criteria and scoring
    - Behavioral and technical aspects
    - Cultural fit assessment
    - Next steps and follow-up
    - Format: Structure, Questions, Evaluation Criteria, Next Steps`,

    feedback: `Feedback Template Guidelines:
    - Clear feedback structure
    - Specific evaluation criteria
    - Strengths and areas for improvement
    - Action items and recommendations
    - Development suggestions
    - Overall assessment summary
    - Format: Structure, Criteria, Feedback, Recommendations`
  };

  return `${basePrompt}

    ${typeSpecificGuidelines[type as keyof typeof typeSpecificGuidelines]}

    Respond with ONLY this JSON structure, no other text:
    {
      "title": "clear and descriptive title",
      "description": "brief description of the template's purpose and use case",
      "content": {
        "sections": [
          {
            "title": "section title",
            "duration": "section duration in minutes",
            "questions": [
              {
                "id": "unique_question_id",
                "text": "question text",
                "type": "multiple_choice|open_ended|technical|behavioral",
                "options": ["option1", "option2", "option3"] // for multiple choice
              }
            ],
            "evaluation_criteria": {
              "criteria": ["criteria1", "criteria2"],
              "scoring": {
                "min": 1,
                "max": 5,
                "description": "scoring description"
              }
            }
          }
        ],
        "metadata": {
          "total_duration": "total duration in minutes",
          "required_skills": ["skill1", "skill2"],
          "difficulty_level": "beginner|intermediate|advanced",
          "evaluation_methodology": "how to evaluate"
        }
      },
      "category": "${category}",
      "type": "${type}"
    }`;
}

function formatTemplateContent(content: any): string {
  if (typeof content === 'string') {
    return content;
  }

  if (content.sections) {
    return content.sections.map((section: any) => {
      const sectionContent = [
        `Section: ${section.title}`,
        `Duration: ${section.duration}`,
        '\nQuestions:',
        ...section.questions.map((q: any) => {
          const questionContent = [
            `Q: ${q.text}`,
            `Type: ${q.type}`
          ];
          if (q.options) {
            questionContent.push('Options:');
            questionContent.push(...q.options.map((opt: string) => `- ${opt}`));
          }
          return questionContent.join('\n');
        }),
        '\nEvaluation Criteria:',
        ...section.evaluation_criteria.criteria.map((c: string) => `- ${c}`),
        `\nScoring: ${section.evaluation_criteria.scoring.min}-${section.evaluation_criteria.scoring.max}`,
        section.evaluation_criteria.scoring.description
      ].join('\n');
      return sectionContent;
    }).join('\n\n');
  }

  if (content.metadata) {
    const sections = [
      'Metadata:',
      `Total Duration: ${content.metadata.total_duration}`,
      `Required Skills: ${content.metadata.required_skills.join(', ')}`,
      `Difficulty Level: ${content.metadata.difficulty_level}`,
      `Evaluation Methodology: ${content.metadata.evaluation_methodology}`
    ];
    return sections.join('\n');
  }

  return JSON.stringify(content, null, 2);
}

async function generateTemplate(type: string, requirements: string, category: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = getTypeSpecificPrompt(type, requirements, category);

  try {
    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    });
    
    const response = await result.response;
    const text = await response.text();
    
    // Clean the response if it contains markdown code blocks
    const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
    
    try {
      const parsedResponse = JSON.parse(cleanedText);
      
      // Validate the response structure
      if (!parsedResponse.title || !parsedResponse.description || !parsedResponse.content) {
        throw new Error('Invalid template structure in AI response');
      }

      // Format the content
      parsedResponse.content = formatTemplateContent(parsedResponse.content);

      // Ensure the response matches the expected type and category
      parsedResponse.type = type;
      parsedResponse.category = category;

      return parsedResponse;
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError);
      console.error('Cleaned text that failed to parse:', cleanedText);
      throw new Error('Invalid JSON response from AI model');
    }
  } catch (error) {
    console.error('Error generating template:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    // Check if API key is set
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set in environment variables');
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const { type, requirements, category }: TemplateRequest = await request.json();

    // Validate input
    if (!type || !requirements || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate template type
    if (!['email', 'assessment', 'interview', 'feedback'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid template type' },
        { status: 400 }
      );
    }

    // Generate template using Gemini
    const template = await generateTemplate(type, requirements, category);

    // Add metadata to the template
    const enrichedTemplate = {
      ...template,
      id: Date.now().toString(),
      createdBy: 'AI Assistant',
      usedCount: 0,
      rating: 0,
      isFavorite: false,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    return NextResponse.json({
      template: enrichedTemplate
    });
  } catch (error) {
    console.error('Error generating template:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate template' },
      { status: 500 }
    );
  }
} 