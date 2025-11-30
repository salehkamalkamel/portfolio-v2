"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.AI_API_KEY });

// Helper to clean HTML tags to save tokens
function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export type AIActionType = "summary" | "translate";

export async function generateAIContent(
  rawContent: string,
  type: AIActionType
) {
  try {
    // 1. Clean the input to save tokens/bandwidth
    const cleanText = stripHtml(rawContent);

    // Limit context if the blog is massive (optional safety check)
    const truncatedText = cleanText.slice(0, 15000);

    const model = "gemini-2.5-flash";

    let systemInstruction = "";

    if (type === "summary") {
      systemInstruction =
        "You are an expert editor. Summarize the provided blog post in English. " +
        "Keep it concise (approx 5-6 bullet points), professional, and engaging. " +
        "Do not use markdown formatting like bolding, just plain text with bullet points.";
    } else if (type === "translate") {
      systemInstruction =
        "You are an expert translator and editor. Summarize the provided blog post in Arabic. " +
        "Do not just translate word-for-word; capture the key meaning and summarize it in professional Arabic. " +
        "Keep it concise (approx 5-6 bullet points). Output in Arabic only.";
    }

    const response = await ai.models.generateContent({
      model: model,
      contents: [
        {
          role: "user",
          parts: [
            { text: systemInstruction },
            { text: `\n\nContent:\n${truncatedText}` },
          ],
        },
      ],
      config: {
        temperature: 0.3,
      },
    });

    if (!response.text) {
      throw new Error("No response generated.");
    }

    return { success: true, data: response.text };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      success: false,
      error: "Failed to process content. Please try again.",
    };
  }
}
