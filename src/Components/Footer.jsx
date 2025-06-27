// ✅ src/components/Footer.jsx
import React from 'react';
import { FaPlus, FaArchive, FaArrowLeft, FaMoon, FaSun } from 'react-icons/fa';

function Footer({
    showArchived,
    toggleArchiveView,
    openAddModal,
    toggleTheme,
    searchTerm,
    setSearchTerm,
    isDarkMode
}) {
    return (
        <footer className="fixed bottom-0 left-0 w-full bg-base-200/90 backdrop-blur-md py-4 px-6 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.15)] border-t border-base-300">
            <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4">

                {/* Left Controls */}
                <div className="flex items-center gap-3 flex-wrap">
                    <button
                        onClick={toggleArchiveView}
                        className="btn btn-sm btn-circle btn-outline"
                        aria-label={showArchived ? "Back to Notes" : "View Archive"}
                        title={showArchived ? "Back to Notes" : "View Archive"}
                    >
                        {showArchived ? <FaArrowLeft /> : <FaArchive />}
                    </button>

                    <input
                        type="text"
                        placeholder="Search notes..."
                        className="input input-sm input-bordered w-52 sm:w-64 max-w-xs rounded-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-3 flex-wrap">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="btn btn-sm btn-circle btn-outline text-lg"
                        aria-label="Toggle theme"
                        title="Toggle Theme"
                    >
                        {isDarkMode ? <FaSun /> : <FaMoon />}
                    </button>

                    {/* Add Button */}
                    {!showArchived && (
                        <button
                            onClick={openAddModal}
                            className="btn btn-lg btn-circle bg-lime-400 hover:bg-lime-700 text-white "
                            aria-label="Add Note"
                            title="Add Note"
                        >
                            <FaPlus />
                        </button>
                    )}
                </div>
            </div>
        </footer>
    );
}

export default Footer;
