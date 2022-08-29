import React from "react";
import { createRef } from "react";
import { TodoItem } from "./TodoItem";
import styles from "./TodoList.module.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const TodoList = (props) => {
  const inputEl = createRef();
  const editInputEl = createRef();

  const changeText = () => {
    props.changeText(inputEl.current.value);
  };
  // d!!!!!!!!!!!!1
  const beginEditTastText = () => {
    props.editTaskText(this.props.selectedTask.taskTitle);
  };
  //!!!
  const editTaskText = () => {
    props.editTaskText(editInputEl.current.value);
  };
  return (
    <div className={styles.wrapper}>
      {props.isModalOpen && (
        <div className={styles.modalWrapper}>
          <div className={styles.modalWindow}>
            {/* !!!!!!! */}
            <textarea
              type="text"
              onChange={() => {
                editTaskText();
              }}
              ref={editInputEl}
              value={props.isModalOpen ? props.editedTaskText : ""}
              className={styles.inputModal}
              placeholder="Edit..."
              style={props.editedTaskText.length < 1 ? {border:'1px solid rgb(96, 96, 96)'} : {border:'1px solid rgb(173, 173, 173)'}}
            />
            <button
              onClick={() => {
                if (props.editedTaskText.length >= 1) {
                  props.editTask(props.selectedTask.id);
                  props.closeModal();
                }else{
                  alert('Enter a text')
                }
              }}
              className={styles.saveBtn}
            >
              Save changes
            </button>
            <button onClick={props.closeModal} className={styles.closeModal}>
              <CloseOutlinedIcon style={{ cursor: "pointer",color:'rgb(96, 96, 96)',width:'100%' }} />
            </button>
          </div>
        </div>
      )}
      <div>
        <div className={styles.todoListForm}>
          <h3 className={styles.title}>Add a task</h3>
          <form action="" className={styles.form}>
            <input
              placeholder="Write a task..."
              value={props.taskText}
              onChange={changeText}
              ref={inputEl}
              className={styles.inputItems}
            />
            <button onClick={props.addTask} className={styles.addItemBtn}>
              Add
            </button>
          </form>
        </div>
      </div>
      {props.tasks.map((task) => {
        return (
          <TodoItem
            isFetching={props.isFetching}
            task={task}
            completeTask={props.completeTask}
            uncompleteTask={props.uncompleteTask}
            taskTitle={task.taskTitle}
            deleteTask={props.deleteTask}
            openModal={props.openModal}
            fillSelectedTask={props.fillSelectedTask}
            selectedTask={props.selectedTask}
            deletingTaskProgress={props.deletingTaskProgress}
            deletingTaskInProgress={props.deletingTaskInProgress}
          />
        );
      })}
     
     
     
     {/* {props.tasks.map((task) => (
          <div className={styles.todoWrapper}>
            <input
              type="checkbox"
              value={props.taskText}
              className={styles.checkbox}
            />
            <div>
              <div className={styles.todoItem}>{task.taskTitle}</div>
            </div>
          </div>
        ))} */}
      {/* {props.todoItems.map((el) => (
          <div className={styles.todoWrapper}
          onClick={(e)=>{el.completed ? uncompleteTask(el.id) : completeTask(el.id)}}
          >
            <input type="checkbox" checked={el.completed ? 'checked' : ''} className={styles.checkbox} />
            <div className={`${el.completed ? styles.completedTask : ''} ${styles.todoItem}`}>{el.title}</div>
          </div>
        ))} */}
    </div>
  );
};

export default TodoList;
