import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are Doc Talk, a multilingual AI health assistant. 
Answer health questions, explain medicine images, and provide vaccination schedules based on birth dates. 
Always identify the user's language and reply in that same language.
If the user provides an image, analyze it medically but cautiously.
Always include a disclaimer that you are an AI and not a substitute for professional medical advice.`;

/**
 * Sends a message to Gemini, optionally with an image.
 * Now requires apiKey to be passed in to support BYOK (Bring Your Own Key).
 */
export const sendMessageToGemini = async (
  text: string,
  imageBase64: string | undefined,
  apiKey: string
): Promise<string> => {
  try {
    if (!apiKey) {
      throw new Error("API Key is missing.");
    }

    const ai = new GoogleGenAI({ apiKey: apiKey });

    const parts: any[] = [];

    // Add text part if exists
    if (text) {
      parts.push({ text });
    }

    // Add image part if exists
    if (imageBase64) {
      // Extract base64 data and mime type. 
      // Assuming format: "data:image/jpeg;base64,..."
      const match = imageBase64.match(/^data:(.+);base64,(.+)$/);
      if (match) {
        const mimeType = match[1];
        const data = match[2];
        parts.push({
          inlineData: {
            mimeType,
            data
          }
        });
      }
    }

    if (parts.length === 0) {
      throw new Error("No content to send.");
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        role: 'user',
        parts: parts
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "I'm sorry, I couldn't process that.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);

    if (error.message?.includes("429") || error.message?.includes("exhausted") || error.message?.includes("quota")) {
      return "QUOTA_EXCEEDED";
    }

    if (error.message?.includes("API key")) {
      return "⚠️ Authentication Error: The API Key provided is invalid.";
    }

    return "⚠️ I'm having trouble connecting to the server. Please check your connection.";
  }
};