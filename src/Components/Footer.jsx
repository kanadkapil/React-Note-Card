// ✅ src/components/Footer.jsx
import React from 'react';
import { FaPlus, FaArchive, FaArrowLeft } from 'react-icons/fa';

function Footer({ showArchived, toggleArchiveView, openAddModal, toggleTheme, searchTerm, setSearchTerm }) {
    return (
        <footer className="fixed bottom-0 left-0 w-full bg-zinc-900/80 py-4 px-6 flex flex-wrap justify-between items-center z-50 shadow-lg gap-4">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleArchiveView}
                    className="btn btn-outline btn-sm text-white"
                >
                    {showArchived ? (
                        <>
                            <FaArrowLeft className="mr-2" /> Back to Notes
                        </>
                    ) : (
                        <>
                            <FaArchive className="mr-2" /> View Archived
                        </>
                    )}
                </button>

                <input
                    type="text"
                    placeholder="Search notes..."
                    className="input input-bordered input-sm w-48"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={toggleTheme}
                    className="btn btn-sm btn-outline text-white"
                >
                    Toggle Theme
                </button>

                {!showArchived && (
                    <button
                        onClick={openAddModal}
                        className="btn btn-success btn-sm text-white"
                    >
                        <FaPlus className="mr-2" /> Add Note
                    </button>
                )}
            </div>
        </footer>
    );
}

export default Footer;