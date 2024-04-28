/// @ts-check

import { fileManagerAI, genAI } from '../lib/google-ai.js'

export async function file (imageNumber) {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-pro-latest'
  })

  const randomNum = Math.floor(Math.random() * 30) // 1-30

  const images = ['png', 'png', 'jpg']

  const fileType = images[imageNumber - 1]
  const fileResult = await fileManagerAI.uploadFile(process.cwd() + `/services/assets/${imageNumber}.${fileType}`, {
    mimeType: fileType === 'png' ? 'image/png' : 'image/jpeg',
    // It will also add the necessary "files/" prefix if not provided
    name: 'files/prueba-test-idk-' + randomNum,
    displayName: 'mrcat'
  })

  const result = await model.generateContent({
    contents: [
      {
        role: 'user',
        parts: [
          { text: 'What is this?' },
          {
            fileData: {
              mimeType: fileResult.file.mimeType,
              fileUri: fileResult.file.uri
            }
          }
        ]
      }
    ]
  })

  const response = result.response
  const text = response.text()

  return text
}
