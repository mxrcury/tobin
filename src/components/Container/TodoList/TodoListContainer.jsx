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
  editTask,
  delTask
} from "../../../Redux/Reducers/todo-reducer";
import PreloaderModal from "../PreloaderModal/Preloader";
import TodoList from "./TodoList";

class TodoListApiContainer extends React.Component {
  componentDidMount() {
    this.props.getTasks(this.props.id)
  }
  addTask = (taskText) => {
    if(taskText.trim().length > 1){
      this.props.addTask(taskText,this.props.id)
      this.props.getTasks(this.props.id)
    }else{
      alert('ENTER A TEXT IDIOT')
    }
  }
  deleteTask = (taskId) => {
    this.props.deleteTask(this.props.id,this.props.tasks)
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
  id:state.user.id
});

export default connect(mapStateToProps, {
  getTasks,
  addTask,
  fillSelectedTask,
  setTasks,
  deleteTask,
  completeTask,
  uncompleteTask,
  editTask,
  delTask
})(TodoListApiContainer);
