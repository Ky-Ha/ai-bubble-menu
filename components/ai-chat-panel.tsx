import { useState } from 'react'
import { useEditor } from 'novel'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { toast } from 'sonner'

export const AiChatPanel = () => {
  const { editor } = useEditor()

  const [input, setInput] = useState<string>('')
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/ask-ai/',
      prepareSendMessagesRequest({ messages, id, body }) {
        return {
          body: {
            id,
            messages,
            selectedText: editor?.state.doc.textBetween(
              editor.state.selection.from,
              editor.state.selection.to
            ),
            paragraph: editor?.getText(),
            ...body,
          },
        }
      },
    }),
    experimental_throttle: 100,
    onError: () => toast.error('An error occurred, please try again!'),
  })

  return (
    <div className="flex flex-col justify-end mx-auto border shadow bg-yellow-100 w-full p-2">
      <div className='h-90 overflow-auto'>
        {messages.map((message) => (
          <div key={message.id} className="whitespace-pre-wrap">
            {message.role === 'user' ? 'User: ' : 'AI: '}
            {message.parts.map((part, i) => {
              switch (part.type) {
                case 'text':
                  return <div key={`${message.id}-${i}`}>{part.text}</div>
              }
            })}
          </div>
        ))}
      </div>

      <div className='w-fit h-fit p-2'>
        <form
          className="border shadow"
          onSubmit={(e) => {
            e.preventDefault()
            if (input.trim()) {
              sendMessage({ text: input })
              setInput('')
            }
          }}
        >
          <input
            className="border"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={status !== 'ready'}
            placeholder="Say something..."
          />
          <button type="submit" disabled={status !== 'ready'}>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
