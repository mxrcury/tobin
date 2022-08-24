import {configureStore} from '@reduxjs/toolkit'
import { todoReducer } from './Reducers/todo-reducer'



export const store = configureStore({
    reducer:{
        todoList:todoReducer,
    }
})