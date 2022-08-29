const SET_TASKS = "SET_TASKS";
const CHANGE_TEXT = "CHANGE_TEXT";
const UPDATE_TASK = "UPDATE_TASK";
const EDIT_TASK_TEXT = "EDIT_TASK_TEXT";
const TOGGLE_MODAL = "TOGGLE_MODAL";
const FILL_SELECTED_TASK = 'FILL_SELECTED_TASK'
const ADDING_TASK_PROGRESS = 'ADDING_TASK_PROGRESS'
const EDITING_TASK_PROGRESS = 'EDITING_TASK_PROGRESS'
const DELETING_TASK_PROGRESS = 'DELETING_TASK_PROGRESS'
const TOGGLE_FETCHING = 'TOGGLE_FETCHING'

const initialState = {
  tasks: [],
  taskText: "",
  isModalOpen: false,
  editedTaskText: "",
  selectedTask:{},
  isFetching:false,
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
