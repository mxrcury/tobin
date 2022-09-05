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
  uncompleteTask,
  editTask
} from "../../Redux/Reducers/todo-reducer";
import PreloaderModal from "./PreloaderModal/PreloaderModal";
import TodoList from "./TodoList";

class TodoListApiContainer extends React.Component {
  fetchGetRequest = () => {
    this.props.getTasks()
  };
  componentDidMount() {
    this.fetchGetRequest();
  }
  addTask = (taskText) => {
      this.props.addTask(taskText)
  };
  deleteTask = (taskId) => {
    this.props.deleteTask(taskId)
  };
  completeTask = (taskId) => {
      this.props.completeTask(taskId)
  };
  uncompleteTask = (taskId) => {
      this.props.uncompleteTask(taskId)
  };
  editTask = (taskId,taskText) => {
      this.props.editTask(taskId,taskText)
  };

  state ={
    isModalOpen:false
  }
  openModal= () =>{
    this.state.isModalOpen = true;
  }
  closeModal = () =>{
    this.state.isModalOpen = false;
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
        isModalOpen={this.state.isModalOpen}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  tasks: state.todoList.tasks,
  taskText: state.todoList.taskText,
  isFetching: state.todoList.isFetching,
  editedTaskText: state.todoList.editedTaskText,
  selectedTask:state.todoList.selectedTask,
  checkedTasks:state.todoList.checkedTasks
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
  uncompleteTask,
  editTask
})(TodoListApiContainer);
