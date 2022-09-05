import { createSlice } from "@reduxjs/toolkit";
import { getTasksReq, delTaskReq, addTaskReq, toggleTaskCompleteReq, editTaskReq } from 'api/apiRequests';

const SET_TASKS = "SET_TASKS";
const CHANGE_TEXT = "CHANGE_TEXT";
const UPDATE_TASK = "UPDATE_TASK";
const EDIT_TASK_TEXT = "EDIT_TASK_TEXT";
const TOGGLE_MODAL = "TOGGLE_MODAL";
const FILL_SELECTED_TASK = 'FILL_SELECTED_TASK'
const TOGGLE_FETCHING = 'TOGGLE_FETCHING'
const CREATE_TASK = 'CREATE_TASK'
const ADD_TASK = 'ADD_TASK'
const DELETE_TASK = 'DELETE_TASK'
const ADD_CHECKED_TASK = 'ADD_CHECKED_TASK'
const DELETE_CHECKED_TASK = 'DELETE_CHECKED_TASK'

const ACCESS_KEY = 'u-access'
const EMAIL_KEY = 'u-email'
const ID_KEY = 'u-key'


const initialState = {
  tasks: [],
  createdTask:{},
  selectedTask:{},
  checkedTasks:[],
  isFetching:false,
  isModalOpen: false,
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
        tasks: [...state.tasks.filter((el) => el.id != action.taskId)],
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: [
          ...state.tasks.map((task) => {
            if (task.id === action.taskId) {
              return { ...task };
            } else {
              return task;
            }
          }),
        ],
      };
    case CREATE_TASK:
      return {...state,createdTask:{...state.createdTask,taskTitle:action.taskTitle,isDone:false}}
    case CHANGE_TEXT:
      return { ...state, taskText: action.text };
    case EDIT_TASK_TEXT:
      return { ...state, editedTaskText: action.text };
    case TOGGLE_MODAL:
      return { ...state, isModalOpen: action.toggleModal };
    case FILL_SELECTED_TASK:
      return {
        ...state,
        selectedTask: {
          ...state.selectedTask,
          id: action.id,
        },
      };
    case TOGGLE_FETCHING:
        return {...state,isFetching:action.isFetching}
    case ADD_CHECKED_TASK:
      return{
        ...state,
        checkedTasks:[
          ...state.checkedTasks,action.task
        ]}
    case DELETE_CHECKED_TASK:
        return {
          ...state,
          checkedTasks: [
            ...state.checkedTasks.filter((el) => el.id != action.taskId),
          ],
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
export const changeText = (newText) => ({ type: CHANGE_TEXT, text: newText });
export const updateTask = (id) => ({ type: UPDATE_TASK, taskId: id });
export const editTaskText = (newText) => ({
  type: EDIT_TASK_TEXT,
  text: newText,
});
export const toggleModal = (toggleModal) => ({ type: TOGGLE_MODAL, toggleModal });
export const fillSelectedTask = (id) =>({type:FILL_SELECTED_TASK,id})
export const toggleFetching = (isFetching) =>({type:TOGGLE_FETCHING,isFetching})
const addNewTask = (taskData) =>({type:ADD_TASK,taskData})
const deleteSomeTask = (taskId) =>({type:DELETE_TASK,taskId})
// const addCheckedTask = (task) =>({type:ADD_CHECKED_TASK,task})
// const deleteCheckedTask = (taskId) =>({type:DELETE_CHECKED_TASK,taskId})


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