import { tasksAPI } from "../../api/apiRequests";

const SET_TASKS = "SET_TASKS";
const CHANGE_TEXT = "CHANGE_TEXT";
const UPDATE_TASK = "UPDATE_TASK";
const EDIT_TASK_TEXT = "EDIT_TASK_TEXT";
const TOGGLE_MODAL = "TOGGLE_MODAL";
const FILL_SELECTED_TASK = 'FILL_SELECTED_TASK'
const TOGGLE_FETCHING = 'TOGGLE_FETCHING'
const CREATE_TASK = 'CREATE_TASK'

const initialState = {
  tasks: [],
  taskText: "",
  createdTask:{},
  editedTaskText: "",
  selectedTask:{},
  isFetching:false,
  isModalOpen: false,
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASKS:
      return { ...state, tasks: [...action.tasks] };
    // case ADD_TASK:
    //     return{...state,tasks:[...state.tasks,...action.task]}
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
      dispatch(getTasks())
      dispatch(changeText(""))
    })
    .catch((error) => alert(error));
}
export const deleteTask = (taskId) => (dispatch)=>{
  dispatch(toggleFetching(true))
    tasksAPI.deleteTask(taskId).then((data) => {
        dispatch(getTasks())
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
  });
}
export const editTask = (taskId,taskText) => (dispatch)=>{
  tasksAPI.editTask(taskId,taskText,false).then((response) => {
    console.log('Task has been edited')
    dispatch(getTasks())
    dispatch(changeText(''))
  });
}