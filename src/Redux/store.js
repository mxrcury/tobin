import {configureStore} from '@reduxjs/toolkit'
import { todoReducer,userReducer } from './Reducers/todo-reducer'
import thunkMiddleware from 'redux-thunk'
import notesReducer from './Reducers/notes-reducer'




export const store = configureStore({
    reducer:{
        todoList:todoReducer,
        user:userReducer,
        notes:notesReducer
    },
    middleware:[thunkMiddleware]
})