import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

// Interface for Document 
export type Document = {
    id: string
    title: string
    content: string
}

// Interface for initialState 
export type MarkdownEditorState = {
    documents: Document[];
    activeId: string | null;
    searchQuery: string;
}

const initialState: MarkdownEditorState = {
    documents: [],
    activeId: null,
    searchQuery: '',
}

const documentsSlice = createSlice({
    name: 'documents',
    initialState,
    reducers: {
        createDocument: (state) => {
            const id = Date.now().toString()    // using timestamp as a simple unique ID
            const title = `Untitled Document ${state.documents.length + 1}`

            // Add the new document with empty content
            state.documents.push({ id, title, content: '' })

            // Set the newly created document as the active one
            state.activeId = id
        },
        deleteDocument: (state, action: PayloadAction<string>) => {
            state.documents = state.documents.filter(doc => doc.id !== action.payload)

            // If the deleted document was active, update activeId
            if (state.activeId === action.payload) {

                // Set activeId to the first document's ID if any remain, else null
                state.activeId = state.documents.length ? state.documents[0].id : null
            }
        },
        setActiveDocument: (state, action: PayloadAction<string>) => {
            state.activeId = action.payload
        },
        updateTitle: (state, action: PayloadAction<{ id: string, title: string }>) => {
            const doc = state.documents.find(d => d.id === action.payload.id)
            if (doc) doc.title = action.payload.title
        },
        updateContent: (state, action: PayloadAction<{ id: string, content: string }>) => {
            const doc = state.documents.find(d => d.id === action.payload.id)
            if (doc) doc.content = action.payload.content
        },
        // Load the documents state from localStorage
        setDocumentsFromStorage: (state, action: PayloadAction<MarkdownEditorState>) => {
            state.documents = action.payload.documents;
            state.activeId = action.payload.activeId;
            state.searchQuery = action.payload.searchQuery;
        },
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
    },
})

export const {
    createDocument, deleteDocument, setActiveDocument,
    updateContent, updateTitle, setDocumentsFromStorage,
    setSearchQuery
} = documentsSlice.actions

export default documentsSlice.reducer
