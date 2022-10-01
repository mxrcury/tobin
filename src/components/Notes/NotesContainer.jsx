import React from "react";
import Notes from "./Notes";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNoteThunk, getNotes } from "Redux/Reducers/notes-reducer";
import { useAuth } from "hooks/useAuth";
import { deleteNote } from "../../Redux/Reducers/notes-reducer";
import { useMemo } from "react";

const NotesContainer = () => {
  const { notes } = useSelector((state) => state.notes);
  const { id } = useAuth();
  const dispatch = useDispatch();

  const addNote = (noteTitle, noteText) => {
    if (noteTitle.trim().length > 1) {
      dispatch(addNoteThunk(noteText, noteTitle, id));
    }
    if(noteTitle.trim().length < 1){
      alert('Please enter a title:)')
    }
    if(noteText.trim().length < 1){
      alert('Please enter a text:)')
    }
    
  };
  const deleteNote = (noteId) => {
    dispatch(deleteNote(id, noteId));
  };
  useEffect(() => {
    dispatch(getNotes(id));
  }, []);

  return <Notes deleteNote={deleteNote} addNote={addNote} notes={notes} />;
};

export default NotesContainer;
