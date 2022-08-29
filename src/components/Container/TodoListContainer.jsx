import React from "react";
import { connect } from "react-redux";
import {
  getTasks,
  addTask,
  changeText,
  updateTask,
  editTaskText,
  toggleModal,
  fillSelectedTask,
  toggleFetching,
  setTasks,
  deleteTask,
  completeTask,
  editTask
} from "../../Redux/Reducers/todo-reducer";
import PreloaderModal from "./PreloaderModal/PreloaderModal";
import TodoList from "./TodoList";

class TodoListApiContainer extends React.Component {
  fetchGetRequest = () => {
    this.props.getTasks()
  };
  // Функція, яка внизу, потребує адаптації, ідея така, щоб отримувати тільки елемент таску по айдішнику і обновляти його стан, а не одразу всі
  // ==============
  // fetchGetRequestById = (taskId) => {
  //   axios
  //     .get(`https://63031e7c9eb72a839d793a73.mockapi.io/api/v1/tasks/${taskId}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       this.props.updateTask(`${response.data}.${taskId}`);
  //     });
  // };
  // ===============
  componentDidMount() {
    this.fetchGetRequest();
  }
  addTask = (e) => {
    if (this.props.taskText.trim().length) {
      e.preventDefault()
      this.props.addTask(this.props.taskText)
    } else {
      e.preventDefault()
      this.props.changeText('');
      alert("Enter a text, idiot");
    }
  };
  deleteTask = (taskId) => {
    this.props.deleteTask(taskId)
  };
  // createTask = (taskTitle) => ({ taskTitle: taskTitle, isDone: false });
  completeTask = (taskId) => {
      this.props.completeTask(taskId)
  };
  uncompleteTask = (taskId) => {
      this.props.uncompleteTask(taskId)
  };
  editTask = (taskId) => {
      this.props.editTask(taskId,this.props.editedTaskText)
  };
  openModal= () =>{
    this.props.toggleModal(true)
  }

  closeModal = () =>{
    this.props.toggleModal(false)
    this.props.editTaskText('');
    this.props.fillSelectedTask(null)
  }
  render() {
  this.props.isFetching && (<PreloaderModal/>)
   return (
      <TodoList
        {...this.props}
        addTask={this.addTask}
        deleteTask={this.deleteTask}
        editTask={this.editTask}
        completeTask={this.completeTask}
        uncompleteTask={this.uncompleteTask}
        openModal={this.openModal}
        closeModal={this.closeModal}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  tasks: state.todoList.tasks,
  taskText: state.todoList.taskText,
  isFetching: state.todoList.isFetching,
  isModalOpen: state.todoList.isModalOpen,
  editedTaskText: state.todoList.editedTaskText,
  selectedTask:state.todoList.selectedTask,
});

export default connect(mapStateToProps, {
  getTasks,
  addTask,
  changeText,
  updateTask,
  editTaskText,
  toggleModal,
  fillSelectedTask,
  toggleFetching,
  setTasks,
  deleteTask,
  completeTask,
  editTask
})(TodoListApiContainer);
