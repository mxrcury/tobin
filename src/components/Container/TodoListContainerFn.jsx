import React from "react";
import { useEffect,useState } from "react";
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
} from "../../Redux/Reducers/todo-reducer";
import PreloaderModal from "./PreloaderModal/Preloader";
import TodoList from "./TodoList";
import { useAuth } from 'hooks/useAuth';

const TodoListApiContainerCopy = (props) =>{
  
  const {id } = useAuth()

  // useEffect(() => {
  //   props.getTasks(props.id)
  // },[props.tasks])
  const addTask = (taskText) => {
    if(taskText.trim().length > 1){
      props.addTask(taskText,props.id)
      props.getTasks(props.id)
    }else{
      alert('Please enter a text')
    }
  }
  const deleteTask = (taskId) => {
    props.deleteTask(id,taskId)
  };
  const completeTask = (taskId) => {
      props.completeTask(id,taskId)
  };
  const uncompleteTask = (taskId) => {
      props.uncompleteTask(id,taskId)
  };
  const editTask = (taskId,taskText) => {
      props.editTask(id,taskId,taskText)
  };
  const [isModalOpen,setModalOpen] = useState(false)
  const openModal= () =>{
    setModalOpen(true)
  }
  const closeModal = () =>{
    setModalOpen(false)
    props.fillSelectedTask(null)
  }
  props.isFetching && (<PreloaderModal/>)
   return (
      <TodoList
        {...props}
        addTask={addTask}
        deleteTask={deleteTask}
        editTask={editTask}
        completeTask={completeTask}
        uncompleteTask={uncompleteTask}
        openModal={openModal}
        closeModal={closeModal}
        isModalOpen={isModalOpen}
      />
    );
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
})(TodoListApiContainerCopy);
