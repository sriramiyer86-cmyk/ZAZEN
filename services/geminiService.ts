
import { GoogleGenAI } from "@google/genai";

export const generateFreezerImage = async (prompt: string): Promise<string> => {
  // Use the most up-to-date API key from the environment
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.warn("API Key missing, returning placeholder");
    return `https://picsum.photos/seed/${encodeURIComponent(prompt)}/800/600`;
  }

  try {
    // Re-initialize for every call to ensure the latest key from process.env.API_KEY is used
    const ai = new GoogleGenAI({ apiKey });
    
    // Using gemini-2.5-flash-image as the default model per coding guidelines.
    // gemini-3-pro-image-preview is only for high-quality (2K/4K) requests and requires a paid key.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Professional industrial product photography of ZaZen Systems hardware. High-end steampunk aesthetic with polished brass, matte obsidian, and copper accents. Studio lighting, 8k resolution, photorealistic. Specific subject: ${prompt}`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
        // Note: imageSize and googleSearch are NOT supported for gemini-2.5-flash-image
      },
    });

    if (!response || !response.candidates || response.candidates.length === 0) {
      throw new Error("No candidates returned from Gemini");
    }

    const firstCandidate = response.candidates[0];
    if (firstCandidate.content && firstCandidate.content.parts) {
      for (const part of firstCandidate.content.parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image data found in response");
  } catch (error: any) {
    console.error("Image generation failed:", error);
    
    // Check for errors that might indicate an API key issue
    if (
      error.message?.includes("PERMISSION_DENIED") || 
      error.message?.includes("Requested entity was not found") ||
      error.message?.includes("403")
    ) {
      // Signal to the App component that a key re-selection might be needed
      window.dispatchEvent(new CustomEvent('gemini-api-key-error', { detail: error.message }));
    }
    
    return `https://picsum.photos/seed/${encodeURIComponent(prompt)}/800/600`;
  }
};
