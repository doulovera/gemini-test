/// @ts-check

import readline from 'node:readline'

import { chat } from './services/chat.js'
import { file } from './services/file.js'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

async function chatInput () {
  rl.question('Ask something to Gemini: \n🙍=> ', async (input) => {
    try {
      const geminiResponse = await chat(input)

      console.log('🤖 =>', geminiResponse)
    } catch (error) {
      console.error(error)
    } finally {
      rl.close()
    }
  })
}

async function fileInput () {
  rl.question('Enter the image number: \n🖼️=> ', async (input) => {
    try {
      const imageNumber = parseInt(input, 10)

      if (isNaN(imageNumber)) {
        throw new Error('Invalid image number')
      }

      const geminiResponse = await file(imageNumber)

      console.log('🤖 =>', geminiResponse)
    } catch (error) {
      console.error(error)
    } finally {
      rl.close()
    }
  })
}

const AVAILABLE_COMMANDS = {
  chat: chatInput,
  file: fileInput,
  exit: () => rl.close()
}

const question = `Welcome to the Gemini-test, what would you like to do?
${Object.keys(AVAILABLE_COMMANDS).map((command) => `👉 ${command}`).join('\n')}

=>`
rl.question(question, async (input) => {
  if (AVAILABLE_COMMANDS[input]) {
    await AVAILABLE_COMMANDS[input]()
  } else {
    console.log('Invalid command')
    rl.close()
  }
})
