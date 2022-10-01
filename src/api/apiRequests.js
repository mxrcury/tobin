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


//Tasks requests
export const getTasksReq = async (userId) => {
  const userDoc = doc(db, "users", userId);
  const tasksRef = collection(userDoc,'tasks')
  const data = await getDocs(tasksRef)
  return (data.docs.map(doc=>({...doc.data(),id:doc.id})))
};
export const addTaskReq = async (taskTitle, userId) => {
  const userDoc = doc(db, "users", userId);
  const tasksRef = collection(userDoc,'tasks')
  return await addDoc(tasksRef, { taskTitle, isDone: false,createdAt:new Date().toString(),color:'rgb(245, 245, 245)' });
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
export const updateColorReq = async (userId,taskId,color)=>{
  const taskRef = doc(db,'users',userId,'tasks',taskId)
  return await updateDoc(taskRef,{color})
}

export const notesAPI = {
  getNotes(userId) {
    return async () => {
      const userDoc = doc(db, "users", userId);
      const notesRef = collection(userDoc, "notes");
      const data = await getDocs(notesRef);
      return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    };
  },
};

// Notes requests
export const getNotesReq = async (userId) => {
  const userDoc = doc(db, "users", userId);
  const notesRef = collection(userDoc,'notes')
  const data = await getDocs(notesRef)
  return (data.docs.map(doc=>({...doc.data(),id:doc.id})))
};
export const addNoteReq = async (noteTitle,noteText, userId) => {
  const userDoc = doc(db, "users", userId);
  const notesRef = collection(userDoc,'notes')
  return await addDoc(notesRef, { noteTitle, noteText,createdAt:new Date().toString() });
};
export const delNoteReq = async (userId, noteId) => {
  const notesRef = doc(db, "users", userId, 'notes', noteId);
  return await deleteDoc(notesRef)
};