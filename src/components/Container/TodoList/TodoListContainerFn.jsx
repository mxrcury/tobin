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
  delTask,
  updateColor
} from "../../../Redux/Reducers/todo-reducer";
import PreloaderModal from "../PreloaderModal/Preloader";
import TodoList from "./TodoList";
import { useAuth } from 'hooks/useAuth';

const TodoListApiContainerCopy = (props) =>{
  
  const {id } = useAuth()
  const [isModalOpen,setModalOpen] = useState(false)
  const [isChangeColor,setChangeColor] = useState(false)

  useEffect(() => {
    props.getTasks(props.id)
  },[])
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
  const changeColor = (taskId, color) =>{
    props.updateColor(id, taskId, color);
  }

  const openModal= () =>{
    setModalOpen(true)
  }
  const closeModal = () =>{
    setModalOpen(false)
    props.fillSelectedTask(null)
  }
  console.log(changeColor)

  props.isFetching && (<PreloaderModal/>)
   return (
      <TodoList
        {...props}
        name='John'
        addTask={addTask}
        changeColor={changeColor}
        deleteTask={deleteTask}
        editTask={editTask}
        completeTask={completeTask}
        uncompleteTask={uncompleteTask}
        openModal={openModal}
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        setChangeColor={setChangeColor}
        isChangeColor={isChangeColor}
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
  delTask,
  updateColor
})(TodoListApiContainerCopy);
