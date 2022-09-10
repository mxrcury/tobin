import { createSlice } from '@reduxjs/toolkit';
import { addNoteReq, delNoteReq, getNotesReq } from 'api/apiRequests';

const initialState = {
    notes:[]
}

const notesSlice = createSlice({
    name:'notes',
    initialState,
    reducers:{
        setNotes(state,action){
            const {text,title} = action.payload
            state.notes.push({text,title})
        },
        delNote(state,action){
            state.notes.filter(el=>el.id!=action.payload.id)
        },
    }
}) 

export const { setNotes,delNote } = notesSlice.actions
export default notesSlice.reducer

// export const getNotes = ()=> (dispatch)=>{
//     getNotesReq().then(data=>{
//         console.log(data)
//     }).catch(error=>console.error(error))
// }
// export const addNote = ()=>(dispatch)=>{
//     addNoteReq().then(note=>{
//         console.log(note)
//     }).catch(error=>console.error(error))
// }
// export const delNote = ()=>(dispatch)=>{
//     delNoteReq().then(note=>{
//         console.log(note)
//     }).catch(error=>console.error(error))
// }