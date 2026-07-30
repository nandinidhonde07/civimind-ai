"use server";

import { GoogleGenAI } from '@google/genai';

export interface AIAnalysisResult {
  category: string;
  department: string;
  priority: string;
  priorityScore: number;
  summary: string;
  keywords: string[];
  estimatedResolution: string;
  suggestedDepartment: string;
  suggestedOfficer: string;
  riskLevel: string;
  imageVerification: {
    confidence: number;
    detectedIssue: string;
    validImage: boolean;
  };
  possibleCause: string;
  suggestedAction: string;
  departmentsRequired: string[];
  duplicateProbability: number;
}

export async function analyzeComplaint(title: string, description: string, location: string, hasImage: boolean = false): Promise<AIAnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  const mockResponse: AIAnalysisResult = {
    category: "Road Infrastructure",
    department: "Public Works Department",
    priority: "Critical",
    priorityScore: 95,
    summary: "Large pothole posing immediate traffic hazard and risk of vehicle damage.",
    keywords: ["pothole", "hazard", "road", "vehicle damage"],
    estimatedResolution: "48 hours",
    suggestedDepartment: "Public Works",
    suggestedOfficer: "Road Maintenance Team Alpha",
    riskLevel: "Critical",
    imageVerification: {
      confidence: hasImage ? 92 : 0,
      detectedIssue: hasImage ? "Large crater-style pothole" : "No image provided",
      validImage: hasImage
    },
    possibleCause: "Heavy rainfall combined with heavy vehicle traffic",
    suggestedAction: "Deploy emergency fill and barricade immediately",
    departmentsRequired: ["Public Works Department", "Traffic Police"],
    duplicateProbability: 85
  };

  if (!apiKey || apiKey === '') {
    console.log("No Gemini API key found, returning mock data.");
    await new Promise(resolve => setTimeout(resolve, 1500));
    return mockResponse;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
You are an AI decision engine for a Smart City government platform. 
Analyze the following citizen complaint and return ONLY a valid JSON object. Do not include markdown code blocks or any other text.

Complaint Details:
Title: ${title}
Description: ${description}
Location: ${location}
Has Image: ${hasImage}

Output JSON Format Required:
{
  "category": "e.g., Road, Electricity, Water",
  "department": "e.g., Public Works Department",
  "priority": "Critical, High, Medium, or Low",
  "priorityScore": 0-100 number,
  "summary": "Short 1-2 sentence summary",
  "keywords": ["array", "of", "keywords"],
  "estimatedResolution": "e.g., 48 hours",
  "suggestedDepartment": "Best department to route to",
  "suggestedOfficer": "Type of team or officer to assign",
  "riskLevel": "Critical, High, Medium, Low",
  "imageVerification": {
    "confidence": 0-100 number,
    "detectedIssue": "What the image shows (or 'No image' if false)",
    "validImage": boolean
  },
  "possibleCause": "What might have caused this",
  "suggestedAction": "Immediate action to take",
  "departmentsRequired": ["List", "of", "departments", "needed"],
  "duplicateProbability": 0-100 number
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text) as AIAnalysisResult;
      return data;
    }
    
    return mockResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return mockResponse;
  }
}
