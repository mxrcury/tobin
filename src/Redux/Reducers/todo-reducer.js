import { createSlice } from "@reduxjs/toolkit";
import { getTasksReq, delTaskReq, addTaskReq, toggleTaskCompleteReq, editTaskReq } from 'api/apiRequests';

const SET_TASKS = "SET_TASKS";
const TOGGLE_MODAL = "TOGGLE_MODAL";
const FILL_SELECTED_TASK = 'FILL_SELECTED_TASK'
const ADD_TASK = 'ADD_TASK'
const DELETE_TASK = 'DELETE_TASK'

const ACCESS_KEY = 'u-access'
const EMAIL_KEY = 'u-email'
const ID_KEY = 'u-key'


const initialState = {
  tasks: [],
  createdTask:{},
  selectedTask:{},
  checkedTasks:[],
  isFetching:false,
  isModalOpen: true,
  user:{
    email: localStorage.getItem(EMAIL_KEY) ?? null,
    token: localStorage.getItem(ACCESS_KEY) ?? null,
    id: localStorage.getItem(ID_KEY) ?? null,
    isLoading:false
  }
};



export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASKS:
      return { ...state, tasks: [...action.tasks] };
    case ADD_TASK:
        return{...state,tasks:[...state.tasks,action.taskData]}
    case DELETE_TASK:
      return {
        ...state,
        tasks: [...state.tasks.filter((el) => el.id !== action.taskId)],
      };
    case TOGGLE_MODAL:
      return { ...state, isModalOpen: action.toggleModal };
    case FILL_SELECTED_TASK:
      return {
        ...state,
        selectedTask: {
          ...state.selectedTask,
          id: action.id,
          taskTitle:action.taskTitle
        },
      };
    default:
      return state;
  }
};

const userSlice = createSlice({
  name:'user',
  initialState:initialState.user,
  reducers:{
    setUser(state,action){
      const { email,token,id } = action.payload;
      state.email = email
      state.token = token
      state.id = id
      localStorage.setItem(ACCESS_KEY,state.token)
      localStorage.setItem(EMAIL_KEY,state.email)
      localStorage.setItem(ID_KEY,state.id)
    },
    removeUser(state){
      state.email = null
      state.token = null
      state.id = null
      localStorage.removeItem(ACCESS_KEY)
      localStorage.removeItem(EMAIL_KEY)
      localStorage.removeItem(ID_KEY)
    },
    setLoading(state,action){
      state.isLoading = action.payload.isLoading
    }
  }
 
})

export const { setUser, removeUser,setLoading } = userSlice.actions;
export const userReducer = userSlice.reducer

export const setTasks = (tasks) => ({ type: SET_TASKS, tasks });
export const toggleModal = (toggleModal) => ({ type: TOGGLE_MODAL, toggleModal });
export const fillSelectedTask = (id,taskTitle) =>({type:FILL_SELECTED_TASK,id,taskTitle})


export const getTasks = () => (dispatch) =>{
  getTasksReq()
    .then((data) => {
      dispatch(setTasks(data));
    })
    .catch((error) => alert(`Error:${error.message}`));
}
export const addTask = (taskText) =>(dispatch)=>{
  addTaskReq(taskText).then((response) => {
      dispatch(getTasks())
    }).catch(error => alert(`Error:${error.message}`))
}


export const deleteTask = (taskId) => (dispatch)=>{
    delTaskReq(taskId).then((data) => {
        dispatch(getTasks())
      }).catch(error => alert(`Error:${error.message}`))
}
export const completeTask = (taskId) => (dispatch) =>{
  toggleTaskCompleteReq(taskId,true).then((response) => {
   dispatch(getTasks())
  }).catch(error => alert(`Error:${error.message}`))
}
export const uncompleteTask = (taskId) => (dispatch) =>{
  toggleTaskCompleteReq(taskId,false).then((response) => {
    dispatch(getTasks())
  }).catch(error => alert(`Error:${error.message}`))
}
export const editTask = (taskId,taskText) => (dispatch)=>{
  editTaskReq(taskId,taskText,false).then((response) => {
    dispatch(getTasks())
  }).catch(error => alert(`Error:${error.message}`))
}