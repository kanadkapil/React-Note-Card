import { createSlice } from '@reduxjs/toolkit';

const dummyNote = {
    cardID: "welcome-note",
    title: "Welcome to NoteNest!",
    desc: "📌 Click '+' to add a note.\n📝 Use emojis and footer colors.\n🔧 Use 3-dots to edit/delete/archive.\n🧹 Stay productive!",
    emoji: "📒",
    footerColor: "#e0f7fa",
    isArchived: false,
};

const initialState = {
    notes: JSON.parse(localStorage.getItem('notes')) || [dummyNote],
};

const updateLocalStorage = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes));
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote: (state, action) => {
            state.notes.push({ ...action.payload, isArchived: false });
            updateLocalStorage(state.notes);
        },
        deleteNote: (state, action) => {
            state.notes = state.notes.filter(note => note.cardID !== action.payload);
            updateLocalStorage(state.notes);
        },
        editNote: (state, action) => {
            const { cardID, updatedData } = action.payload;
            const index = state.notes.findIndex(note => note.cardID === cardID);
            if (index !== -1) {
                state.notes[index] = { ...state.notes[index], ...updatedData };
                updateLocalStorage(state.notes);
            }
        },
        archiveNote: (state, action) => {
            const index = state.notes.findIndex(note => note.cardID === action.payload);
            if (index !== -1) {
                state.notes[index].isArchived = true;
                updateLocalStorage(state.notes);
            }
        },
    },
});

export const { addNote, deleteNote, editNote, archiveNote } = notesSlice.actions;
export default notesSlice.reducer;
