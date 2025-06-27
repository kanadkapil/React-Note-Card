
// ✅ src/pages/Foreground.jsx
import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from '../components/Card';
import AddNoteModal from '../features/notes/AddNoteModal';
import Footer from '../Components/Footer';

function Foreground() {
    const ref = useRef(null);
    const notes = useSelector((state) => state.notes.notes);
    const [showModal, setShowModal] = useState(false);
    const [showArchived, setShowArchived] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', saved);
    }, []);

    const toggleTheme = () => {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const filteredNotes = notes
        .filter(n => n.isArchived === showArchived)
        .filter(n => n.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <>
            <div
                ref={ref}
                className="fixed top-0 left-0 z-10 w-full h-full pb-20 flex flex-wrap gap-5 p-5 overflow-auto"
            >
                {filteredNotes.map(note => (
                    <Card key={note.cardID} data={note} reference={ref} isArchivedView={showArchived} />
                ))}
            </div>

            <Footer
                showArchived={showArchived}
                toggleArchiveView={() => setShowArchived(prev => !prev)}
                openAddModal={() => setShowModal(true)}
                toggleTheme={toggleTheme}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <AddNoteModal isOpen={showModal} onClose={() => setShowModal(false)} />
        </>
    );
}

export default Foreground;