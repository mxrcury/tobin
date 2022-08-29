import {configureStore} from '@reduxjs/toolkit'
import { todoReducer } from './Reducers/todo-reducer'
import thunkMiddleware from 'redux-thunk'




export const store = configureStore({
    reducer:{
        todoList:todoReducer,
    },
    middleware:[thunkMiddleware]
})