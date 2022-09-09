import { createSlice } from '@reduxjs/toolkit';

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
        }
    }
}) 

export const { setNotes } = notesSlice.actions
export default notesSlice.reducer