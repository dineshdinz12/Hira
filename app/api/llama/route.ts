import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    // Check if API key is set
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set in environment variables');
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Use Gemini instead of Llama
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [{ text: prompt }]
      }]
    });

    const response = await result.response;
    const text = await response.text();
    
    return NextResponse.json({ response: text })
  } catch (error) {
    console.error('Error calling Gemini:', error)
    return NextResponse.json(
      { error: 'Failed to get response from Gemini' },
      { status: 500 }
    )
  }
} 