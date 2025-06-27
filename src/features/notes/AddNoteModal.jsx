import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addNote, editNote } from './notesSlice';
import { v4 as uuidv4 } from 'uuid';

function AddNoteModal({ isOpen, onClose, isEditMode = false, existingNote = null }) {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [emoji, setEmoji] = useState('');
    const [footerColor, setFooterColor] = useState('#dddddd');

    const modalRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            setTimeout(() => titleRef.current?.focus(), 100);
        }
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    useEffect(() => {
        if (isEditMode && existingNote) {
            setTitle(existingNote.title);
            setDesc(existingNote.desc);
            setEmoji(existingNote.emoji || '');
            setFooterColor(existingNote.footerColor);
        }
    }, [isEditMode, existingNote]);

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
    };

    const handleBackdropClick = (e) => {
        if (e.target === modalRef.current) onClose();
    };

    const handleSubmit = () => {
        if (!title || !desc || !footerColor) {
            return alert("Please fill in title, description, and color!");
        }

        if (isEditMode) {
            dispatch(editNote({
                cardID: existingNote.cardID,
                updatedData: { title, desc, emoji, footerColor },
            }));
        } else {
            dispatch(addNote({
                cardID: uuidv4(),
                title,
                desc,
                emoji,
                footerColor,
            }));
        }

        onClose();
        setTitle('');
        setDesc('');
        setEmoji('');
        setFooterColor('#dddddd');
    };

    if (!isOpen) return null;

    return (
        <div
            ref={modalRef}
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
        >
            <div className="relative bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-xl border border-gray-200">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-black rounded-full p-2 text-xl transition"
                    aria-label="Close"
                >
                    &times;
                </button>

                <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
                    {isEditMode ? "Edit Note" : "Add New Note"}
                </h2>

                <input
                    ref={titleRef}
                    type="text"
                    placeholder="Title"
                    className="input input-bordered w-full mb-4"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="Description"
                    className="textarea textarea-bordered w-full mb-4"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />

                <div className="flex items-center gap-3 mb-4">
                    <input
                        type="text"
                        placeholder="Emoji (optional)"
                        className="input input-bordered flex-1"
                        value={emoji}
                        onChange={(e) => setEmoji(e.target.value)}
                    />
                    <span className="text-3xl">{emoji || '😀'}</span>
                </div>

                <div className="flex items-center gap-3 mb-6">
                    <input
                        type="color"
                        className="h-10 w-10 rounded-full border"
                        value={footerColor}
                        onChange={(e) => setFooterColor(e.target.value)}
                    />
                    <span className="text-sm text-gray-600">Choose footer color</span>
                </div>

                <div className="flex justify-end gap-4">
                    <button onClick={onClose} className="btn btn-outline">Cancel</button>
                    <button onClick={handleSubmit} className="btn btn-primary">
                        {isEditMode ? "Update" : "Add"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddNoteModal;
