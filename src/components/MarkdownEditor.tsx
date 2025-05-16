import { useEffect, useRef, useState } from 'react'
import { updateContent } from '../redux/documentReducer'
import ReactMarkdown from 'react-markdown'
import { useDebounce } from '../hooks/useDebounce'
import { useAppDispatch, useAppSelector } from '../redux/configureStore'

const MarkdownEditor = ({ isDark }: { isDark: boolean }) => {
    const dispatch = useAppDispatch()
    const activeId = useAppSelector(state => state?.documents?.activeId)
    const doc = useAppSelector(state => state?.documents?.documents?.find(docu => docu?.id === activeId))

    // Local state for textarea value and saving indicator
    const [value, setValue] = useState(doc?.content || '')
    const [saving, setSaving] = useState(false)

    // Refs for syncing scroll of text editor with its preview when preview section is scrolled
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const previewRef = useRef<HTMLDivElement>(null)

    const debounced = useDebounce(value, 500)

    // useEffect to update local textarea value when active document changes
    useEffect(() => {
        setValue(doc?.content || '')
    }, [doc])

    // useEffect to update document content in Redux store after debounce
    useEffect(() => {
        if (doc) {
            dispatch(updateContent({ id: doc?.id, content: debounced }))
        }
    }, [debounced])

    // Show saving status briefly on content update
    useEffect(() => {
        setSaving(true)
        const timeout = setTimeout(() => setSaving(false), 1000)
        return () => clearTimeout(timeout)
    }, [debounced])

    // Sync editor scroll with preview scroll
    const handlePreviewScroll = () => {
        if (!previewRef?.current || !textareaRef?.current)
            return
        const preview = previewRef?.current
        const editor = textareaRef?.current

        const ratio = preview?.scrollTop / (preview?.scrollHeight - preview?.clientHeight)

        editor.scrollTop = ratio * (editor?.scrollHeight - editor?.clientHeight)
    }



    if (!doc) return <p className={isDark ? 'text-white' : 'text-black'}>Select or create a document</p>

    return (
        <div className={`flex flex-col h-full w-full ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            {/* Header */}
            <div className={`flex justify-between items-center px-6 py-3 border-b ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-gray-50'}`}>
                <h2 className="text-lg font-semibold truncate">{doc.title || 'Untitled Document'}</h2>
                <span className="text-sm">
                    {saving ? (
                        <span className="text-yellow-500">Saving...</span>
                    ) : (
                        <span className="text-green-500">Saved</span>
                    )}
                </span>
            </div>

            {/* Editor and Preview */}
            <div className="flex flex-1 overflow-hidden">
                <textarea
                    className={`w-1/2 p-4 resize-none focus:outline-none overflow-auto border-r ${isDark ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-400'}`}
                    placeholder="Write something..."
                    value={value}
                    ref={textareaRef}
                    onChange={(e) => setValue(e.target.value)}
                />

                <div className={`w-1/2 p-4 overflow-auto ${isDark ? 'prose-invert bg-gray-800 text-white' : 'bg-gray-50 text-gray-800'}`} ref={previewRef} onScroll={handlePreviewScroll}>
                    <ReactMarkdown>{value}</ReactMarkdown>
                </div>
            </div>
        </div>
    )
}

export default MarkdownEditor
