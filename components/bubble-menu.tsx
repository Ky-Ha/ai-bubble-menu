import { MessageCircleQuestionMark } from 'lucide-react'
import { EditorBubble } from 'novel'
import { useState } from 'react'
import { AiChatPanel } from './ai-chat-panel'

const GenerativeMenuSwitch = () => {
  const [openChat, setOpenChat] = useState(false)

  return (
    <EditorBubble
      tippyOptions={{
        appendTo: () => document.body,
        interactive: true,
        placement: 'bottom',
        onHidden: () => {
          setOpenChat(false)
          // editor.chain().unsetHighlight().run()
        },
      }}
      shouldShow={({ from, to }) => from !== to}
    >
      {!openChat ? (
        <div className="bg-yellow-300 p-2 rounded flex flex-row gap-x-1">
          <MessageCircleQuestionMark />
          <button onClick={() => setOpenChat(true)}>Ask Ai</button>
        </div>
      ) : (
        <AiChatPanel />
      )}
    </EditorBubble>
  )
}

export default GenerativeMenuSwitch
