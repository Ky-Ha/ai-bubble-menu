import { openai } from '@ai-sdk/openai'
import { convertToModelMessages, streamText, UIMessage } from 'ai'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const {
    messages,
    prompt,
    selectedText,
  }: { messages: UIMessage[]; prompt: string; selectedText: string } =
    await req.json()

  const learningPrompt = `
    You are a helpful assistant, and main mission is like a teacher, 
    You need to explain or clarify, make more details for any question from students with clear and structured answer
    The user will provide some selected text and a question that he meets when reading 1 paragraph

    Selected Text:
    """${selectedText}"""

    Paragraph
    """${prompt}"""

    Instructions:
    - Explain the selected text in a clear, step-by-step way.
    - Directly answer the user question about it.
    - Use simple language and examples where useful.
    - Avoid unnecessary jargon or unrelated information.
    - If relevant, suggest how the user can remember or apply this concept.
    `

  const result = streamText({
    model: openai('gpt-4.1'),
    system: learningPrompt,
    messages: convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
