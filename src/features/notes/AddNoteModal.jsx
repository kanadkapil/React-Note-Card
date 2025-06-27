import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNote, editNote } from './notesSlice';
import { v4 as uuidv4 } from 'uuid';

function AddNoteModal({ isOpen, onClose, isEditMode = false, existingNote = null }) {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [emoji, setEmoji] = useState('');
    const [footerColor, setFooterColor] = useState('#dddddd');

    useEffect(() => {
        if (isEditMode && existingNote) {
            setTitle(existingNote.title);
            setDesc(existingNote.desc);
            setEmoji(existingNote.emoji || '');
            setFooterColor(existingNote.footerColor);
        }
    }, [isEditMode, existingNote]);

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
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="relative bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-xl">

                {/* Cross (×) Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
                    aria-label="Close"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold mb-4">
                    {isEditMode ? "Edit Note" : "Add New Note"}
                </h2>

                <input
                    type="text"
                    placeholder="Title"
                    className="input input-bordered w-full mb-3"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="Description"
                    className="textarea textarea-bordered w-full mb-3"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Emoji (optional)"
                    className="input input-bordered w-full mb-3"
                    value={emoji}
                    onChange={(e) => setEmoji(e.target.value)}
                />

                <input
                    type="color"
                    className="w-full h-12 rounded mb-3"
                    value={footerColor}
                    onChange={(e) => setFooterColor(e.target.value)}
                />

                <div className="flex justify-end gap-4">
                    <button onClick={onClose} className="btn btn-ghost">Cancel</button>
                    <button onClick={handleSubmit} className="btn btn-primary">
                        {isEditMode ? "Update" : "Add"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddNoteModal;
