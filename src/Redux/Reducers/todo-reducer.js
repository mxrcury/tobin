import { tasksAPI } from "../../api/apiRequests";

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


const initialState = {
  tasks: [],
  taskText: "",
  createdTask:{},
  editedTaskText: "",
  selectedTask:{},
  checkedTasks:[],
  isFetching:false,
  isModalOpen: false,
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
          taskTitle: action.taskTitle,
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

export const setTasks = (tasks) => ({ type: SET_TASKS, tasks });
export const changeText = (newText) => ({ type: CHANGE_TEXT, text: newText });
export const updateTask = (id) => ({ type: UPDATE_TASK, taskId: id });
export const editTaskText = (newText) => ({
  type: EDIT_TASK_TEXT,
  text: newText,
});
export const toggleModal = (toggleModal) => ({ type: TOGGLE_MODAL, toggleModal });
export const fillSelectedTask = (id,title) =>({type:FILL_SELECTED_TASK,id,taskTitle:title})
export const toggleFetching = (isFetching) =>({type:TOGGLE_FETCHING,isFetching})
export const createTask = (taskTitle) =>({type:CREATE_TASK,taskTitle})
const addNewTask = (taskData) =>({type:ADD_TASK,taskData})
const deleteSomeTask = (taskId) =>({type:DELETE_TASK,taskId})
const addCheckedTask = (task) =>({type:ADD_CHECKED_TASK,task})
const deleteCheckedTask = (taskId) =>({type:DELETE_CHECKED_TASK,taskId})


export const getTasks = () => (dispatch) =>{
  dispatch(toggleFetching(true))
  tasksAPI.getTasks().then((data) => {
    dispatch(setTasks(data))
    dispatch(toggleFetching(false))
  });
}
export const addTask = (taskText) => (dispatch)=>{
  tasksAPI
    .addTask(dispatch(createTask(taskText)))
    .then((response) => {
      dispatch(addNewTask(response.data))
      dispatch(changeText(""))
    })
    .catch((error) => alert(error));
}
export const deleteTask = (taskId) => (dispatch)=>{
  dispatch(toggleFetching(true))
    tasksAPI.deleteTask(taskId).then((data) => {
        console.log(data)
        dispatch(deleteSomeTask(taskId))
        initialState.checkedTasks.filter(el=>el.id != taskId)
        dispatch(toggleFetching(false))
        console.log(`Task was deleted`);
      });
}
export const completeTask = (taskId) => (dispatch) =>{
  tasksAPI.toggleTaskCompleting(taskId,true).then((response) => {
   dispatch(getTasks())
  });
}
export const uncompleteTask = (taskId) => (dispatch) =>{
  tasksAPI.toggleTaskCompleting(taskId,false).then((response) => {
    dispatch(getTasks())
    // dispatch(deleteCheckedTask(taskId))
  });
}
export const editTask = (taskId,taskText) => (dispatch)=>{
  tasksAPI.editTask(taskId,taskText,false).then((response) => {
    console.log('Task has been edited')
    dispatch(getTasks())
    dispatch(changeText(''))
  });
}