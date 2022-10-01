import React from "react";
import styles from "./TodoItem.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { Wrapper } from '../styles'

export const TodoItem = (props) => {
  return (
    <Wrapper bgColor={props.task.color} className={styles.wrapper}>
      <div
        className={styles.todoWrapper}
        onClick={() => {
          if (props.task.isDone) {
            props.uncompleteTask(props.task.id)
          } else {
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
            className={`${styles.todoItem} ${props.task.isDone ? styles.completedTask : ""
              } `}
          >
            {props.task.taskTitle}
          </div>
        </div>
      </div>
      <div className={styles.btns}>
        <button
          onClick={() => {
            props.setChangeColor(true)
            props.fillSelectedTask(props.task.id, props.taskTitle)
          }}
          className={styles.editBtn}>
          <ColorLensIcon
            sx={{
              transition: ".1s ease",
              color: "rgb(36, 36, 36)",
              width: "25px",
              display: 'block',
              background: 'transparent',
              "&:hover": { opacity: '.8' },
            }} />
        </button>
        <button
          onClick={() => {
            props.openModal(true)
            props.inputEdit.setSomeValue(props.task.taskTitle)
            props.fillSelectedTask(props.task.id, props.taskTitle)
          }}
          className={styles.editBtn}
        >
          <DriveFileRenameOutlineOutlinedIcon
            sx={{
              transition: ".1s ease",
              color: "rgb(36, 36, 36)",
              width: "25px",
              display: 'block',
              background: 'transparent',
              "&:hover": { opacity: '.8' },
            }} />
        </button>
        <button
          onClick={() => {

            props.deleteTask(props.task.id);
          }}
          className={styles.delBtn}
        >
          <DeleteOutlineIcon
            sx={{
              transition: ".1s ease",
              color: "rgb(36, 36, 36)",
              width: "25px",
              display: 'block',
              background: 'transparent',
              "&:hover": { opacity: '.8' },
            }}
          />
        </button>
      </div>
    </Wrapper>)
};
