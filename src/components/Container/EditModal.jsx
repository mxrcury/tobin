import React from 'react'
import styles from './EditModal.module.css'
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useInput } from './../../hooks/useInput';


const EditModal = (props) => {

  return (<div className={styles.modalWrapper}>
          <div className={styles.modalWindow}>
            <textarea
              type="text"
              {...props.inputEdit.bind}
              className={styles.inputModal}
              placeholder="Edit..."
              style={props.inputEdit.bind.value.length < 1 ? {border:'1px solid rgb(96, 96, 96)'} : {border:'1px solid rgb(173, 173, 173)'}}
            />
            <button
              onClick={() => {
                if (props.inputEdit.bind.value.trim().length) {
                  props.editTask(props.selectedTask.id,props.inputEdit.bind.value);
                  props.closeModal(false)
                  props.inputEdit.clear()
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
              props.inputEdit.clear()
              }} className={styles.closeModal}>
              <CloseOutlinedIcon style={{ cursor: "pointer",color:'rgb(96, 96, 96)',width:'100%' }} />
            </button>
          </div>
        </div>
  )
}

export default EditModal
