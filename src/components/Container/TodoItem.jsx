import React from "react";
import styles from "./TodoItem.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

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
          checked={props.task.isDone ? "checked" : ""}
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
            props.openModal()
            props.fillSelectedTask(props.task.id,props.task.taskTitle)
          }}
          className={styles.editBtn}
        >
          <DriveFileRenameOutlineOutlinedIcon
            style={{ color: "black", width: "18px", marginLeft: "1px", background:'transparent' }}
          />
        </button>
        <button
          onClick={() => {
            props.deleteTask(props.task.id);
          }}
          className={styles.delBtn}
        >
          <DeleteOutlineIcon
            style={{ color: "black", width: "18px", marginLeft: "5px",marginRight: "0",display:'block', background:'transparent'}}
          />
        </button>
      </div>
    </div>
  );
};
