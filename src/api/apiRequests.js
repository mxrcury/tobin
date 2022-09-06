import axios from "axios";
import { db } from "./../firebase/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";


export const getTasksReq = async (userId) => {
  const userDoc = doc(db, "users", userId);
  const tasksRef = collection(userDoc,'tasks')
  const data = await getDocs(tasksRef)
  return (data.docs.map(doc=>({...doc.data(),id:doc.id})))
};
export const addTaskReq = async (taskTitle, userId) => {
  const userDoc = doc(db, "users", userId);
  const tasksRef = collection(userDoc,'tasks')
  return await addDoc(tasksRef, { taskTitle, isDone: false,createdAt:new Date().toString() });
};
export const delTaskReq = async (userId, taskId) => {
  const taskRef = doc(db, "users", userId, 'tasks', taskId);
  return await deleteDoc(taskRef)
};

export const toggleTaskCompleteReq = async (userId,taskId, isDone) => {
  const taskRef = doc(db, "users", userId, 'tasks', taskId);
  return await updateDoc(taskRef, { isDone });
};
export const editTaskReq = async (userId,taskId, taskTitle, isDone) => {
  const taskRef = doc(db, "users", userId, 'tasks', taskId);
  return await updateDoc(taskRef, { taskTitle, isDone });
};
