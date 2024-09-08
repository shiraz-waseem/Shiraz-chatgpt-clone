import React from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai"
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";


// safety settings
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

// const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings });


const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_PUBLIC_KEY);


const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings });

// const prompt = "Write a story about a magic backpack.";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());

export default model // so I can use anywhere