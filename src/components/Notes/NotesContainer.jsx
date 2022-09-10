import React from 'react'
import Notes from './Notes'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNotes } from 'Redux/Reducers/notes-reducer';
import { useAuth } from 'hooks/useAuth';
import { delNote } from '../../Redux/Reducers/notes-reducer';

const NotesContainer = () => {
    const { notes } = useSelector((state) => state.notes);
    const { id } = useAuth()
    const dispatch = useDispatch()
    
    const deleteNote = (noteId) =>{
        dispatch(delNote(noteId))
    } 
    // useEffect(()=>{
    //     dispatch(getNotes(id))
    // },[])
    


  return <Notes notes={notes}/>
}

export default NotesContainer