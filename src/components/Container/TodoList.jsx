import React, { useState } from "react";
import { TodoItem } from "./TodoItem";
import styles from "./TodoList.module.css";
import EditModal from './EditModal';

const TodoList = (props) => {

  const [taskText,setTaskText] = useState('')
  const [editTaskText,setEditTaskText] = useState('')
  return (
    <div className={styles.wrapper}>
      {props.isModalOpen ? (
        <EditModal
          editTaskText={editTaskText}
          setEditTaskText={setEditTaskText}
          closeModal={props.closeModal}
          isModalOpen={props.isModalOpen}
          editTask={props.editTask}
          selectedTask={props.selectedTask}
        />
      ) : (
        ""
      )}
      <div>
        <div className={styles.todoListForm}>
          <h3 className={styles.title}>Add a task</h3>
          <form action="" className={styles.form}>
            <input
              placeholder="Write a task..."
              autoFocus
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              className={styles.inputItems}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                props.addTask(taskText);
                setTaskText("");
              }}
              className={styles.addItemBtn}
            >
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
