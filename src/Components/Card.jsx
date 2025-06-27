import React, { useState } from 'react';
import { IoFingerPrint } from 'react-icons/io5';
import { motion } from 'framer-motion';
import Modal from './Modal';
import { useDispatch } from 'react-redux';
import { deleteNote, archiveNote } from '../features/notes/notesSlice';
import AddNoteModal from '../features/notes/AddNoteModal';
import { HiDotsVertical } from 'react-icons/hi';
import { editNote } from '../features/notes/notesSlice';
import { FaEdit, FaArchive, FaTrash, FaArrowUp } from 'react-icons/fa';



function Card({ data, reference, isArchivedView }) {
    const { title, desc, emoji, footerColor, cardID } = data;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const dispatch = useDispatch();
    const shortDesc = desc?.length > 100 ? desc.slice(0, 100) + '...' : desc;


    const handleUnarchive = () => {
        dispatch(editNote({
            cardID,
            updatedData: { isArchived: false }
        }));
    };


    return (
        <>
            <motion.div
                drag
                dragConstraints={reference}
                whileDrag={{ scale: 1.2 }}
                dragTransition={{ bounceDamping: 10, bounceStiffness: 600 }}
                dragElastic={0.5}
                whileHover={{ scale: 1.05 }}
                className="p-4 relative w-72 h-72 text-white bg-zinc-900/60 rounded-2xl overflow-hidden shadow-md"
            >
                <IoFingerPrint size={25} color="white" />
                <h3 className="text-lg font-bold my-3">{title}</h3>
                <p className="text-sm my-3 px-4">{shortDesc}</p>

                {desc.length > 100 && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-3 py-1 mt-2 text-sm font-semibold bg-zinc-700 text-white rounded-lg opacity-50 hover:opacity-100 transition"
                    >
                        Read More
                    </button>
                )}

                <div
                    className="absolute bottom-0 left-0 w-full h-10 py-3"
                    style={{ backgroundColor: footerColor || '#bbf7d0' }}
                >
                    <span className="flex justify-between px-4 text-black">
                        <p>{emoji}</p>
                        <div className="relative">
                            <button onClick={() => setMenuOpen(!menuOpen)}>
                                <HiDotsVertical size={20} />
                            </button>

                            {menuOpen && (
                                <ul className="absolute bottom-10 right-0 bg-white text-black rounded shadow w-auto text-sm z-50 p-2 flex flex-col gap-2">
                                    {!isArchivedView ? (
                                        <>
                                            <li>
                                                <button
                                                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200"
                                                    title="Edit"
                                                    aria-label="Edit"
                                                    onClick={() => setEditModalOpen(true)}
                                                >
                                                    <FaEdit size={18} />
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200"
                                                    title="Archive"
                                                    aria-label="Archive"
                                                    onClick={() => dispatch(archiveNote(cardID))}
                                                >
                                                    <FaArchive size={18} />
                                                </button>
                                            </li>
                                        </>
                                    ) : (
                                        <li>
                                            <button
                                                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200"
                                                title="Unarchive"
                                                aria-label="Unarchive"
                                                onClick={handleUnarchive}
                                            >
                                                <FaArrowUp size={18} />
                                            </button>
                                        </li>
                                    )}
                                    <li>
                                        <button
                                            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-100 text-red-600"
                                            title="Delete"
                                            aria-label="Delete"
                                            onClick={() => dispatch(deleteNote(cardID))}
                                        >
                                            <FaTrash size={18} />
                                        </button>
                                    </li>
                                </ul>
                            )}



                        </div>
                    </span>
                </div>
            </motion.div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={title} description={desc} />
            <AddNoteModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} isEditMode={true} existingNote={data} />
        </>
    );
}

export default Card;
