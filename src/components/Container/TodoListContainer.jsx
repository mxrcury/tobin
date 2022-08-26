import * as axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { tasksAPI } from "../../api/apiRequests";
import {
  setTasks,
  changeText,
  updateTask,
  editTaskText,
  toggleModal,
  fillSelectedTask,
  addingTaskProgress,
  editingTaskProgress,
  deletingTaskProgress,
  toggleFetching
} from "../../Redux/Reducers/todo-reducer";
import TodoList from "./TodoList";

class TodoListApiContainer extends React.Component {
  fetchGetRequest = () => {
    this.props.toggleFetching(true)
    tasksAPI.getTasks().then((data) => {this.props.setTasks(data)
        this.props.toggleFetching(false)
      });
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
  addTask = () => {
    if (this.props.taskText.length >= 1) {
      tasksAPI.addTask(this.createTask(this.props.taskText)).then((response) => {
          this.fetchGetRequest();
          this.props.changeText("");
        })
        .catch((error) => alert(error));
    } else {
      alert("Enter a text, idiot");
    }
  };
  deleteTask = (taskId) => {
    this.props.toggleFetching(true)
    tasksAPI.deleteTask(taskId).then((response) => {
        this.fetchGetRequest();
        this.props.toggleFetching(false)
        console.log(`Task was deleted - ${response.data}.${taskId}`);
      });
  };
  createTask = (taskTitle) => ({ taskTitle: taskTitle, isDone: false });
  completeTask = (taskId) => {
      tasksAPI.toggleTaskCompleting(taskId,true).then((response) => {
        this.fetchGetRequest();
        console.log(response.data);
      });
  };
  uncompleteTask = (taskId) => {
    
      tasksAPI.toggleTaskCompleting(taskId,false).then((response) => {
        this.fetchGetRequest();
        console.log(response.data);
      });
  };
  editTask = (taskId) => {
  
      tasksAPI.editTask(taskId,this.props.editedTaskText,false).then((response) => {
        console.log('Task has been edited')
        this.fetchGetRequest();
        this.props.editTaskText('');
      });
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
  selectedTask:state.todoList.selectedTask
});

export default connect(mapStateToProps, {
  setTasks,
  changeText,
  updateTask,
  editTaskText,
  toggleModal,
  fillSelectedTask,
  addingTaskProgress,
  editingTaskProgress,
  deletingTaskProgress,
  toggleFetching
})(TodoListApiContainer);
