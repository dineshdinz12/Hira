import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { code, questionId } = await req.json()

    // Check if API key is set
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set in environment variables');
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Get similarity score using Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Compare these two code snippets and provide a similarity score from 0-100. First code: ${code} Second code: ${questionId}`;

    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [{ text: prompt }]
      }]
    });

    const response = await result.response;
    const text = await response.text();
    
    const score = parseInt(text.match(/\d+/)?.[0] || '0')

    return NextResponse.json({ score })
  } catch (error) {
    console.error('Error scoring submission:', error)
    return NextResponse.json(
      { error: 'Failed to score submission' },
      { status: 500 }
    )
  }
} 