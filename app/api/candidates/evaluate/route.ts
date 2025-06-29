import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface Candidate {
  id: string;
  name: string;
  skills: string[];
  experience: number;
  education: string;
  projects: string[];
  softSkills: string[];
}

interface EvaluationCriteria {
  technicalSkills: number;
  experience: number;
  education: number;
  projects: number;
  softSkills: number;
}

interface EvaluationRequest {
  candidates: Candidate[];
  criteria: EvaluationCriteria;
  jobRequirements: string;
}

async function analyzeCandidate(candidate: Candidate, jobRequirements: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `You are a JSON-only response bot. Analyze this candidate's profile against the following job requirements and respond ONLY with valid JSON in the exact format specified:

    Job Requirements:
    ${jobRequirements}

    Candidate Profile:
    - Name: ${candidate.name}
    - Skills: ${candidate.skills.join(', ')}
    - Experience: ${candidate.experience} years
    - Education: ${candidate.education}
    - Projects: ${candidate.projects.join(', ')}
    - Soft Skills: ${candidate.softSkills.join(', ')}

    Respond with ONLY this JSON structure, no other text:
    {
      "technicalSkillsMatch": {
        "score": number (0-100),
        "analysis": "detailed analysis of technical skills match"
      },
      "experienceMatch": {
        "score": number (0-100),
        "analysis": "detailed analysis of experience match"
      },
      "educationMatch": {
        "score": number (0-100),
        "analysis": "detailed analysis of education match"
      },
      "projectQuality": {
        "score": number (0-100),
        "analysis": "detailed analysis of project quality"
      },
      "softSkillsMatch": {
        "score": number (0-100),
        "analysis": "detailed analysis of soft skills match"
      },
      "overallAnalysis": "comprehensive analysis of the candidate",
      "recommendation": "final recommendation and next steps"
    }`;

  try {
    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [{ text: prompt }]
      }]
    });
    const response = await result.response;
    const text = await response.text();
    
    // Log the raw response for debugging
    console.log('Raw API Response:', text);
    
    // Try to clean the response if it contains markdown code blocks
    const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
    
    try {
      return JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError);
      console.error('Cleaned text that failed to parse:', cleanedText);
      throw new Error('Invalid JSON response from AI model');
    }
  } catch (error) {
    console.error('Error analyzing candidate:', error);
    throw error;
  }
}

function calculateScore(candidate: Candidate, analysis: any, criteria: EvaluationCriteria) {
  const totalWeight = Object.values(criteria).reduce((sum, weight) => sum + weight, 0);
  
  return (
    (analysis.technicalSkillsMatch.score * criteria.technicalSkills +
    analysis.experienceMatch.score * criteria.experience +
    analysis.educationMatch.score * criteria.education +
    analysis.projectQuality.score * criteria.projects +
    analysis.softSkillsMatch.score * criteria.softSkills) / totalWeight
  );
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

    const { candidates, criteria, jobRequirements }: EvaluationRequest = await request.json();

    // Analyze each candidate using Gemini
    const analyzedCandidates = await Promise.all(
      candidates.map(async (candidate) => {
        const analysis = await analyzeCandidate(candidate, jobRequirements);
        const score = calculateScore(candidate, analysis, criteria);
        return {
          ...candidate,
          score,
          analysis
        };
      })
    );

    // Sort candidates by score
    const sortedCandidates = analyzedCandidates.sort((a, b) => (b.score || 0) - (a.score || 0));

    // Calculate statistics
    const scoreRanges = [
      { range: '0-20', min: 0, max: 20 },
      { range: '21-40', min: 21, max: 40 },
      { range: '41-60', min: 41, max: 60 },
      { range: '61-80', min: 61, max: 80 },
      { range: '81-100', min: 81, max: 100 }
    ];

    const scoreDistribution = scoreRanges.map(range => ({
      range: range.range,
      count: sortedCandidates.filter(c => (c.score || 0) >= range.min && (c.score || 0) <= range.max).length
    }));

    // Calculate skill distribution
    const skillCounts = new Map<string, number>();
    sortedCandidates.forEach(candidate => {
      candidate.skills.forEach(skill => {
        skillCounts.set(skill, (skillCounts.get(skill) || 0) + 1);
      });
    });

    const skillDistribution = Array.from(skillCounts.entries()).map(([skill, count]) => ({
      skill,
      count
    }));

    return NextResponse.json({
      candidates: sortedCandidates,
      statistics: {
        scoreDistribution,
        skillDistribution,
        topCandidates: sortedCandidates.slice(0, 5)
      }
    });
  } catch (error) {
    console.error('Error evaluating candidates:', error);
    return NextResponse.json(
      { error: 'Failed to evaluate candidates' },
      { status: 500 }
    );
  }
}   