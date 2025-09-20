import { MessageCircleQuestionMark } from 'lucide-react'
import { EditorBubble, useEditor } from 'novel'
import { useCallback } from 'react'

const GenerativeMenuSwitch = () => {
  const { editor } = useEditor()

  if (!editor) return <></>

  const askAIAssistant = useCallback(() => {
    console.log('Ask AI')
    if (!editor) {
      console.log('Editor not available')
      return
    }

    const { from, to } = editor.state.selection
    const selectedText = editor.state.doc.textBetween(from, to, ' ')

    editor.chain().focus().setTextSelection(editor.state.selection.from).run()
    console.log('Selected text:', selectedText)
  }, [editor])

  return (
    <EditorBubble
      tippyOptions={{
        appendTo: () => document.body,
        interactive: true,
        placement: 'bottom',
      }}
      shouldShow={({ from, to }) => from !== to}
    >
      <div className="bg-yellow-300 p-2 rounded flex flex-row gap-x-1">
        <MessageCircleQuestionMark />
        <button onClick={askAIAssistant}>Ask Ai</button>
      </div>
    </EditorBubble>
  )
}

export default GenerativeMenuSwitch
