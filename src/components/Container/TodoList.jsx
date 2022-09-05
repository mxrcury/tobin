import React, { useState } from "react";
import { TodoItem } from "./TodoItem";
import styles from "./TodoList.module.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const TodoList = (props) => {

  const [taskText,setTaskText] = useState('')
  const [editTaskText,setEditTaskText] = useState('')


  return (
    <div className={styles.wrapper}>
      {props.isModalOpen ? (
        <div className={styles.modalWrapper}>
          <div className={styles.modalWindow}>
            <textarea
              type="text"
              onChange={(e) => {
                setEditTaskText(e.target.value)
              }}
              value={props.isModalOpen ? editTaskText : ""}
              className={styles.inputModal}
              placeholder="Edit..."
              style={editTaskText.length < 1 ? {border:'1px solid rgb(96, 96, 96)'} : {border:'1px solid rgb(173, 173, 173)'}}
            />
            <button
              onClick={() => {
                if (editTaskText.trim().length) {
                  props.editTask(props.selectedTask.id,editTaskText);
                  props.closeModal(false)
                  setEditTaskText('')
                }else{
                  alert('Enter a text')
                }
              }}
              className={styles.saveBtn}
            >
              Save changes
            </button>
            <button onClick={()=>{
              props.closeModal()
              setEditTaskText('')
              }} className={styles.closeModal}>
              <CloseOutlinedIcon style={{ cursor: "pointer",color:'rgb(96, 96, 96)',width:'100%' }} />
            </button>
          </div>
        </div>
      ) : ''}
      <div>
        <div className={styles.todoListForm}>
          <h3 className={styles.title}>Add a task</h3>
          <form action="" className={styles.form}>
            <input
              placeholder="Write a task..."
              autoFocus
              value={taskText}
              onChange={(e)=>setTaskText(e.target.value)}
              className={styles.inputItems}
            />
            <button onClick={(e) =>{
              e.preventDefault()
             props.addTask(taskText)
             setTaskText('')}} className={styles.addItemBtn}>
              Add
            </button>
          </form>
        </div>
      </div>
      {props.tasks.map((task) => {
        return (
          <TodoItem
            task={task}
            completeTask={props.completeTask}
            uncompleteTask={props.uncompleteTask}
            taskTitle={task.taskTitle}
            deleteTask={props.deleteTask}
            openModal={props.openModal}
            fillSelectedTask={props.fillSelectedTask}
            selectedTask={props.selectedTask}
            setEditTaskText={setEditTaskText}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
