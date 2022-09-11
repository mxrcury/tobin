import { createSlice } from "@reduxjs/toolkit";
import { addNoteReq, delNoteReq, getNotesReq } from "api/apiRequests";

const initialState = {
  notes: [],
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes(state, action) {
      return {...state,notes:[...action.payload.notes]}
      //state.notes = action.payload.notes;
    },
    delNote(state, action) {
      state.notes.filter((el) => el.id != action.payload.id);
    },
    addNote(state,action){
      state.notes.push({noteText:action.payload.text,title:action.payload.title,id:action.payload.id})
    }
  },
});


export const { setNotes, addNote } = notesSlice.actions;
export default notesSlice.reducer;

export const getNotes = (userId) => (dispatch) => {
  const data = getNotesReq(userId);
  data.then((data) => {
    dispatch(setNotes({notes:data}));
  });
};
export const addNoteThunk = (noteText, noteTitle, userId) => (dispatch) => {
  addNoteReq(noteTitle, noteText, userId)
    .then((note) => {
      dispatch(getNotes(userId))
      // dispatch(addNote({ title: noteTitle, text: noteText, id: note.id }));
    })
    .catch((error) => {
      console.error(error);
    });
};
export const delNote = (userId,noteId)=>(dispatch)=>{
    delNoteReq(userId,noteId).then(note=>{
      dispatch(getNotes(userId))
    }).catch(error=>console.error(error))
}
