import React from 'react';
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import style from './style.module.css'
import { useSelector } from 'react-redux';

const ChangeColorModal = (props) => {

  const { colors } = useSelector(({todoList})=>{
    return({
      colors:todoList.colors
    })
  })

  return (
    <div className={style.modalWrapper} >
      <div className={style.modalWindow} >
        <div className={style.colors} >
          {colors.map(item=><button onClick={()=>{
            props.changeColor(props.selectedTask.id,item.color)
            props.setChangeColor(false)
          }} className={style.color} style={{background:`${item.color}`,border:'1px solid rgb(36,36,36)'}} ></button>)}
        </div>
        <button onClick={()=>props.setChangeColor(false)} className={style.closeModal}>
        <CloseOutlinedIcon/>
        </button>
      </div>
    </div>
  )
}

export default ChangeColorModal
