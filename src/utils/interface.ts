// Interface for Document 
export interface Document {
    id: string
    title: string
    content: string
}

// Interface for initialState 
export interface MarkdownEditorState {
    documents: Document[];
    activeId: string | null;
    searchQuery: string;
}