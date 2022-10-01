import { createSlice } from "@reduxjs/toolkit";
import { getTasksReq, delTaskReq, addTaskReq, toggleTaskCompleteReq, editTaskReq, updateColorReq } from 'api/apiRequests';
import { useAuth } from 'hooks/useAuth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from "./../../firebase/firebase";

const SET_TASKS = "SET_TASKS";
const TOGGLE_MODAL = "TOGGLE_MODAL";
const FILL_SELECTED_TASK = 'FILL_SELECTED_TASK'
const ADD_TASK = 'ADD_TASK'
const GET_TASKS = 'GET_TASKS'
const DELETE_TASK = 'DELETE_TASK'

const ACCESS_KEY = 'u-access'
const EMAIL_KEY = 'u-email'
const ID_KEY = 'u-key'
const USERNAME_KEY = 'u-username'


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
    username:localStorage.getItem(USERNAME_KEY) ?? '',
    isLoading:false
  },
  colors:[
    {
      color:'#d78045'
    },
    {
      color:'#E52935'
    },
    {
      color:'#F9B018'
    }
  ]
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
        tasks: [
          ...state.tasks.filter((el, index) => {
            if (index !== action.taskId) {
              return el
            }
          }),
        ],
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
    setUsername(state,action){
      const {username} = action.payload
      state.username = username
      localStorage.setItem(USERNAME_KEY,action.payload.username)
      //localStorage.removeItem(USERNAME_KEY)
    },
    setLoading(state,action){
      state.isLoading = action.payload.isLoading
    }
  }
 
})

export const { setUser, removeUser,setLoading,setUsername } = userSlice.actions;
export const userReducer = userSlice.reducer

export const setTasks = (tasks) => ({ type: SET_TASKS, tasks });
export const delTask = (taskId) =>({type:DELETE_TASK,taskId})
export const toggleModal = (toggleModal) => ({ type: TOGGLE_MODAL, toggleModal });
export const fillSelectedTask = (id,taskTitle) =>({type:FILL_SELECTED_TASK,id,taskTitle})


export const getTasks = (userId) => (dispatch) =>{
  getTasksReq(userId)
    .then((data) => {
      dispatch(setTasks(data));
      const userDoc = doc(db, "users", userId);
      getDoc(userDoc).then(userData =>{
        const username = userData.data().username
        dispatch(setUsername({username}))
      })
    })
    .catch((error) => console.error(`Error:${error.message}`));
}
export const addTask = (taskText,userId) =>(dispatch)=>{
  addTaskReq(taskText,userId).then((response) => {
      dispatch(getTasks())
    }).catch(error => alert(`Error:${error.message}`))
}
export const deleteTask = (userId,taskId) => (dispatch)=>{

  delTaskReq(userId,taskId).then((data) => {
        dispatch(getTasks(userId))
      }).catch(error => alert(`Error:${error.message}`))
}


export const completeTask = (userId,taskId) => (dispatch) =>{
  toggleTaskCompleteReq(userId,taskId,true).then((response) => {
   dispatch(getTasks(userId))
  }).catch(error => console.log(`Error:${error.message}`))

}
export const uncompleteTask = (userId,taskId) => (dispatch) =>{
  toggleTaskCompleteReq(userId,taskId,false).then((response) => {
    dispatch(getTasks(userId))
  }).catch(error => console.log(`Error:${error.message}`))
}
export const editTask = (userId,taskId,taskText) => (dispatch)=>{
  editTaskReq(userId,taskId,taskText,false).then((response) => {
    dispatch(getTasks(userId))
  }).catch(error => alert(`Error:${error.message}`))
}
export const updateColor = (userId,taskId,color) => (dispatch)=>{
  updateColorReq(userId,taskId,color).then((response)=>{
    dispatch(getTasks(userId))
  }).catch(error=>alert(`Error:${error.message}`))
}