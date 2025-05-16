import { useDarkMode } from '../utils/DarkModeContext'
import Layout from './common/Layout'
import DocumentList from './DocumentList'
import MarkdownEditor from './MarkdownEditor'

const HomePage = () => {
    const { isDark, toggleDarkMode } = useDarkMode()

    return (
        <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <Layout toggleDarkMode={toggleDarkMode} isDark={isDark}>
                <div className="w-1/4 border-r border-gray-300">
                    <DocumentList isDark={isDark}/>
                </div>
                <div className="w-3/4 p-4">
                    <MarkdownEditor isDark={isDark}/>
                </div>
            </Layout>
        </div>
    )
}

export default HomePage