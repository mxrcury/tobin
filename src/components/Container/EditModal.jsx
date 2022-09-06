import React from 'react'
import styles from './EditModal.module.css'
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";


const EditModal = (props) => {

  return (<div className={styles.modalWrapper}>
          <div className={styles.modalWindow}>
            <textarea
              type="text"
              onChange={(e) => {
                props.setEditTaskText(e.target.value)
              }}
              value={props.isModalOpen ? props.editTaskText : ""}
              className={styles.inputModal}
              placeholder="Edit..."
              style={props.editTaskText.length < 1 ? {border:'1px solid rgb(96, 96, 96)'} : {border:'1px solid rgb(173, 173, 173)'}}
            />
            <button
              onClick={() => {
                if (props.editTaskText.trim().length) {
                  props.editTask(props.selectedTask.id,props.editTaskText);
                  props.closeModal(false)
                  props.setEditTaskText('')
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
              props.setEditTaskText('')
              }} className={styles.closeModal}>
              <CloseOutlinedIcon style={{ cursor: "pointer",color:'rgb(96, 96, 96)',width:'100%' }} />
            </button>
          </div>
        </div>
  )
}

export default EditModal
