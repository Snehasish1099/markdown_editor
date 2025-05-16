import type { MarkdownEditorState } from "../redux/documentReducer"

export const saveToLocalStorage = (state: MarkdownEditorState) => {
    try {
        localStorage.setItem('markdown-editor', JSON.stringify(state))
    } catch (e) {
        console.error('Could not save', e)
    }
}

export const loadFromLocalStorage = () => {
    try {
        const data = localStorage.getItem('markdown-editor')

        // Parse the JSON string back into an object if it exists; otherwise, return undefined
        return data ? JSON.parse(data) : undefined
    } catch {
        // If parsing fails or another error occurs, return undefined
        return undefined
    }
}
