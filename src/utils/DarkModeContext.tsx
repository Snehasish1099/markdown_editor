import React, { createContext, useContext, useEffect, useState } from 'react'

// Interface
export type DarkModeContextType = {
    isDark: boolean
    toggleDarkMode: () => void
}

// Creating dark mode Context that components can provide
const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined)

// Provider component to wrap around the app that need dark mode state
export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [isDark, setIsDark] = useState<boolean>(() => {

        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark'
        }

        // by default light mode or if localStorage not accessible
        return false
    })

    // Persist dark mode to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('theme', isDark ? 'dark' : 'light')
    }, [isDark])

    // Function to toggle dark mode state
    const toggleDarkMode = () => setIsDark(prev => !prev)

    return (
        <DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    )
}

// Custom hook to use the DarkModeContext safely
// eslint-disable-next-line react-refresh/only-export-components
export const useDarkMode = () => {
    const context = useContext(DarkModeContext)

    if (!context) {
        throw new Error('useDarkMode must be used within a DarkModeProvider')
    }
    return context
}