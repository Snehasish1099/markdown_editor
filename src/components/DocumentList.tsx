import { useAppDispatch, useAppSelector } from '../redux/configureStore'
import { createDocument, deleteDocument, setActiveDocument, setSearchQuery, updateTitle } from '../redux/documentReducer'
import { exportFile } from '../utils/exportFile'

const DocumentList = ({ isDark }: { isDark: boolean }) => {
    // Get documents state and search query from Redux
    const { documents, activeId, searchQuery } = useAppSelector(state => state.documents)
    const dispatch = useAppDispatch()

    // Filter documents by search query
    const filtered = documents?.filter(doc => doc?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()))

    return (
        <div className={`flex flex-col h-[50vh] md:h-[92vh] ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
            {/* Fixed Header */}
            <div className="p-4 space-y-4 border-b border-gray-300 dark:border-gray-700">
                <button
                    onClick={() => dispatch(createDocument())}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
                >
                    New Document
                </button>
    
                {/* Search input */}
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                    placeholder="Search documents..."
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300'}`}
                />
            </div>
    
            {/* Scrollable Document List */}
            <div className="flex-1 overflow-y-scroll hide-scrollbar p-4 space-y-4">
                {filtered.length === 0 ? (
                    <p className="text-center text-sm opacity-70">No documents found.</p>
                ) : (
                    <>
                        <h2 className="text-xl font-semibold">Documents</h2>
                        {filtered.map((doc) => (
                            <div
                                key={doc?.id}
                                className={`p-4 rounded-lg border shadow-sm transition-all ${doc?.id === activeId ? 'border-blue-600 border-2' : ''}`}
                            >
                                <input
                                    value={doc.title}
                                    onChange={(e) => dispatch(updateTitle({ id: doc?.id, title: e.target.value }))}
                                    placeholder="Untitled Document"
                                    className={`w-full text-lg font-semibold bg-transparent focus:outline-none ${isDark ? 'text-white' : 'text-gray-900'}`}
                                />
                                <div className="flex flex-wrap gap-2 mt-4">
                                    <button
                                        onClick={() => dispatch(setActiveDocument(doc.id))}
                                        className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition cursor-pointer"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => dispatch(deleteDocument(doc.id))}
                                        className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => exportFile(doc.title, doc.content)}
                                        className="px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 transition cursor-pointer"
                                    >
                                        Export .md
                                    </button>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
    
}

export default DocumentList
