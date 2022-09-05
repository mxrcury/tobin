import axios from 'axios'
import { db } from './../firebase/firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'

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