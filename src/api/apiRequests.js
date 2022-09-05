import axios from 'axios'
import { db } from './../firebase/firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'

const instance = axios.create({
    baseURL:'https://63031e7c9eb72a839d793a73.mockapi.io/api/v1/'
})

export const tasksAPI = {
    getTasks(){
        return instance.get(`tasks`).then(response => response.data)
    },
    addTask (createTask) {
        return instance.post(
          `tasks`,
          createTask
        )
    },
    deleteTask (taskId){
       return instance.delete(
        `tasks/${taskId}`
      )
    },
    toggleTaskCompleting(taskId,isDone){
      return instance.put(
        `tasks/${taskId}`,
        {isDone}
      )
    },
    editTask(taskId,taskTitle,isDone){
        return instance.put(
          `tasks/${taskId}`,
          { taskTitle: `${taskTitle}`, isDone }
        );
    }
}

// const axiosReq = axios.create({
//   baseURL:'https://todo-app-884bd-default-rtdb.europe-west1.firebasedatabase.app/',
//   withCredentials:true
// })

const tasksCollectionRef = collection(db,'tasks')

export const getTasksReq = async () =>{
  const data = await getDocs(tasksCollectionRef)
  return (data.docs.map(doc=>({...doc.data(),id:doc.id})))
}
export const addTaskReq = async (taskTitle) =>{
  return await addDoc(tasksCollectionRef,{taskTitle,isDone:false})
}
export const delTaskReq = async (id) =>{
  const newDoc = doc(db,'tasks',id)
  return await deleteDoc(newDoc)
}
export const toggleTaskCompleteReq = async (id,isDone) =>{
  const newDoc = doc(db,'tasks',id)
  return await updateDoc(newDoc,{isDone})
}
export const editTaskReq = async (id,taskTitle,isDone)=>{
  const newDoc= doc(db,'tasks',id)
  return await updateDoc(newDoc,{taskTitle,isDone})
}