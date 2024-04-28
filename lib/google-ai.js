/// @ts-check

import { GoogleGenerativeAI } from '@google/generative-ai'
import { GoogleAIFileManager } from '@google/generative-ai/files'

export const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '')

export const fileManagerAI = new GoogleAIFileManager(process.env.GOOGLE_AI_API_KEY || '')
