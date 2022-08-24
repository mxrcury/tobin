const ADD_TASK = "ADD_TASK";
const CHANGE_TEXT = "CHANGE_TEXT";
const DELETE_TASK = "DELETE_TASK";
const COMPLETE_TASK = "COMPLETE_TASK";
const UNCOMPLETE_TASK = 'UNCOMPLETE_TASK'

const initialState = {
  tasks: [],
  newText: "",
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      let copiedState = { ...state };
      copiedState.todoItems = [...state.todoItems];
      let id
      id++    
      if (copiedState.newText.length >= 1 && copiedState.newText !== " ") {
        copiedState.todoItems.push({
          id: {id},
          title: copiedState.newText,
          completed: false,
        });
        copiedState.newText = "";
      } else {
        alert("Enter a text");
      }
      return copiedState;
    case CHANGE_TEXT:
      return { ...state, newText: action.newText };
    case COMPLETE_TASK:
      return {
        ...state,
        todoItems: [
          ...state.todoItems.map((todo) => {
            if(todo.id === action.taskId){
                return { ...todo, completed: true };
            } else{
                return todo
            }
          }),
        ],
      };
      case UNCOMPLETE_TASK:
      return {
        ...state,
        todoItems: [
          ...state.todoItems.map((todo) => {
            if(todo.id === action.taskId){
                return { ...todo, completed: false };
            } else{
                return todo
            }
          }),
        ],
      };
    default:
      return state;
  }
};

export const changeTextAC = (newMessage) => ({
  type: CHANGE_TEXT,
  newText: newMessage,
});
export const addTaskAC = () => ({ type: ADD_TASK });
export const completeTaskAC = (taskId) => ({
  type: COMPLETE_TASK,
  taskId:taskId
});
export const uncompleteTaskAC = (taskId) =>({
    type:UNCOMPLETE_TASK,
    taskId:taskId
})