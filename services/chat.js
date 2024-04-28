/// @ts-check

import { genAI } from '../lib/google-ai.js'

export async function chat (message) {
  if (!message) {
    throw new Error('Message is required')
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

  const chat = model.startChat()

  const result = await chat.sendMessage(message)
  const response = result.response
  const text = response.text()

  return text
}
