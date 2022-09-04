import {configureStore} from '@reduxjs/toolkit'
import { todoReducer,userReducer } from './Reducers/todo-reducer'
import thunkMiddleware from 'redux-thunk'




export const store = configureStore({
    reducer:{
        todoList:todoReducer,
        user:userReducer
    },
    middleware:[thunkMiddleware]
})