import React from 'react';
import Header from './Header';

// Interface for Layout 
interface LayoutProps {
    children: React.ReactNode;
    toggleDarkMode: () => void;
    isDark: boolean
}

const Layout: React.FC<LayoutProps> = ({ children, toggleDarkMode, isDark }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header toggleDarkMode={toggleDarkMode} isDark={isDark}/>
            <main className="flex-1 flex overflow-hidden">{children}</main>
        </div>
    );
};

export default Layout;
