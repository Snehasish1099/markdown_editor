import React from 'react'
import type { DarkModeContextType } from '../../utils/DarkModeContext'

const Header: React.FC<DarkModeContextType> = ({ toggleDarkMode, isDark }) => {

    return (
        <header className={`w-full p-4 flex justify-between items-center shadow-md !h-[8vh] ${isDark ? 'bg-gray-800 text-white' : 'bg-blue-200 text-black'}`}>
            <h1 className="text-xl font-bold">Markdown Editor</h1>
            <button
                onClick={toggleDarkMode}
                className={`ml-auto px-2 py-1 text-sm rounded cursor-pointer ${isDark ? 'bg-gray-700 text-white border' : 'bg-gray-300 text-black border'}`}
            >
                {isDark ? 'Light' : 'Dark'}
            </button>
        </header>
    )
}

export default Header
