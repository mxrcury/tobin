import React, { useState } from "react";
import { TodoItem } from "../TodoItem";
import styles from "./TodoList.module.css";
import EditModal from '../EditModal';
import { useInput } from './../../../hooks/useInput';
import ChangeColorModal from "../ChangeColorModal";

const TodoList = (props) => {
  const inputTasks = useInput()
  const inputEdit = useInput()
  return (
    <div className={styles.wrapper}>
      {props.isModalOpen ? (
        <EditModal
          inputEdit={inputEdit}
          closeModal={props.closeModal}
          isModalOpen={props.isModalOpen}
          editTask={props.editTask}
          selectedTask={props.selectedTask}
        />
      ) : (
        ""
      )}
      {props.isChangeColor && (
        <ChangeColorModal
          selectedTask={props.selectedTask}
          changeColor={props.changeColor}
          setChangeColor={props.setChangeColor}
        />
      )}
      <div>
        <div className={styles.todoListForm}>
          <h3 className={styles.title}>Add a task</h3>
          <form action="" className={styles.form}>
            <input
              placeholder="Write a task..."
              autoFocus
              {...inputTasks.bind}
              className={styles.inputItems}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                props.addTask(inputTasks.bind.value);
                inputTasks.clear()
              }}
              className={styles.addItemBtn}
            >
              Add
            </button>
          </form>
        </div>
      </div>
      {props.tasks.map(task => {
        return (
          <TodoItem
            key={task.id}
            task={task}
            completeTask={props.completeTask}
            uncompleteTask={props.uncompleteTask}
            taskTitle={task.taskTitle}
            deleteTask={props.deleteTask}
            openModal={props.openModal}
            fillSelectedTask={props.fillSelectedTask}
            selectedTask={props.selectedTask}
            inputEdit={inputEdit}
            onChangeColor={props.onChangeColor}
            setChangeColor={props.setChangeColor}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
