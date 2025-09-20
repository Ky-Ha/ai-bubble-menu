'use client'

import { EditorRoot, EditorContent, StarterKit } from 'novel'
import BubbleMenu from './BubbleMenu'

export default function AiEditor({ content }: { content: any }) {
  const extensions = [StarterKit]

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-white dark:bg-neutral-900 shadow-lg rounded-lg border border-gray-200 dark:border-neutral-700 p-4">
      <EditorRoot>
        <EditorContent
          editable={false}
          immediatelyRender={false}
          initialContent={content ?? undefined} //initContent for Editor
          extensions={extensions}
          className="min-h-96 rounded-xl border p-4"
        >
          <BubbleMenu />
        </EditorContent>
      </EditorRoot>
    </div>
  )
}
