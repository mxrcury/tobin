import React from "react";
import { connect } from "react-redux";
import {
  getTasks,
  addTask,
  fillSelectedTask,
  setTasks,
  deleteTask,
  completeTask,
  uncompleteTask,
  editTask
} from "../../Redux/Reducers/todo-reducer";
import PreloaderModal from "./PreloaderModal/PreloaderModal";
import TodoList from "./TodoList";

class TodoListApiContainer extends React.Component {
  componentDidMount() {
    this.props.getTasks()
  }
  addTask = (taskText) => {
    if(taskText.trim().length > 1){
      this.props.addTask(taskText)
    }else{
      alert('ENTER A TEXT IDIOT')
    }
  }
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
    this.setState({isModalOpen:true})
  }
  closeModal = () =>{
    this.setState({isModalOpen:false})
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
  selectedTask:state.todoList.selectedTask,
});

export default connect(mapStateToProps, {
  getTasks,
  addTask,
  fillSelectedTask,
  setTasks,
  deleteTask,
  completeTask,
  uncompleteTask,
  editTask
})(TodoListApiContainer);
