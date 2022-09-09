import React from "react";
import styles from "./TodoItem.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import { useInput } from './../../hooks/useInput';

export const TodoItem = (props) => {
  return (
  <div className={styles.wrapper}>
      <div
        className={styles.todoWrapper}
        onClick={() => {
          if(props.task.isDone){
          props.uncompleteTask(props.task.id)
          }else{
            props.completeTask(props.task.id);
          }
        }}
      >
        <input
          type="checkbox"
          checked={
            props.task.isDone ? 'checked' : ''
          }
           //? "checked" : ""
          className={styles.checkbox}
        />
        <div>
          <div
            className={`${styles.todoItem} ${
              props.task.isDone ? styles.completedTask : ""
            } `}
          >
            {props.task.taskTitle}
          </div>
        </div>
      </div>
      <div className={styles.btns}>
        <button
          onClick={() => {
            props.openModal(true)
            props.inputEdit.setSomeValue(props.task.taskTitle)
            props.fillSelectedTask(props.task.id,props.taskTitle)
          }}
          className={styles.editBtn}
        >
          <DriveFileRenameOutlineOutlinedIcon
            style={{ color: "rgb(96, 96, 96)", width: "25px", background:'transparent' }}
          />
        </button>
        <button
          onClick={() => {
            props.deleteTask(props.task.id);
          }}
          className={styles.delBtn}
        >
          <DeleteOutlineIcon
            style={{ color: "rgb(96, 96, 96)", width: "25px",display:'block', background:'transparent'}}
          />
        </button>
      </div>
    </div>)
};
