
import { GoogleGenAI, Type } from "@google/genai";
import { SuggestionResponse } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Using a placeholder. Please set your API key for the app to function.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "YOUR_API_KEY" });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        hashtags: {
            type: Type.ARRAY,
            description: "A list of trending and relevant hashtags. Provide at least 10.",
            items: {
                type: Type.OBJECT,
                properties: {
                    hashtag: {
                        type: Type.STRING,
                        description: "The hashtag, including the '#' symbol."
                    },
                    reason: {
                        type: Type.STRING,
                        description: "A brief explanation of why this hashtag is a good choice for the user's account."
                    }
                },
                 required: ["hashtag", "reason"]
            }
        },
        growthIdeas: {
            type: Type.ARRAY,
            description: "A list of creative and actionable growth ideas. Provide at least 5 detailed ideas.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: {
                        type: Type.STRING,
                        description: "A concise title for the growth idea."
                    },
                    description: {
                        type: Type.STRING,
                        description: "A detailed, step-by-step description of the growth strategy."
                    }
                },
                required: ["title", "description"]
            }
        }
    },
    required: ["hashtags", "growthIdeas"]
};

export const getSuggestions = async (accountDescription: string, accountGoals: string, trainingData: string): Promise<SuggestionResponse> => {
    const model = 'gemini-2.5-flash';

    const prompt = `
        Based on the following social media account details, generate a list of trending hashtags and actionable growth ideas.

        **Account Description:**
        ${accountDescription}

        **Account Goals:**
        ${accountGoals}

        **Additional Context & Training Data (emulate this style/topic or use this info for better suggestions):**
        ${trainingData || "No additional context provided."}

        Please provide a comprehensive and creative set of suggestions. The hashtags should be a mix of popular, niche, and community-specific tags. The growth ideas should be practical and innovative.
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                systemInstruction: "You are a world-class social media growth strategist and AI agent. Your goal is to provide actionable, creative, and trending advice to help users grow their social media presence. Always return your response in the specified JSON format.",
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.8,
            },
        });

        const jsonText = response.text.trim();
        const cleanJsonText = jsonText.replace(/^```json\s*|```$/g, '');
        const parsedResponse = JSON.parse(cleanJsonText);

        if (!parsedResponse.hashtags || !parsedResponse.growthIdeas) {
            throw new Error("Invalid response format from API. The response did not contain the expected 'hashtags' or 'growthIdeas' properties.");
        }

        return parsedResponse as SuggestionResponse;

    } catch (error) {
        console.error("Error fetching suggestions from Gemini API:", error);
        if (error instanceof Error) {
            // Check for specific API errors if possible
             if (error.message.includes("API key not valid")) {
                throw new Error("The provided API key is not valid. Please check your environment configuration.");
            }
            throw new Error(`Failed to get suggestions: ${error.message}`);
        }
        throw new Error("An unknown error occurred while fetching suggestions.");
    }
};
