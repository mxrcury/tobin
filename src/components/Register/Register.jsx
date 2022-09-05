import React from 'react'
import Form from '../Form/Form'
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from 'react';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from 'firebase/auth';
import { setLoading } from 'Redux/Reducers/todo-reducer';
import { useAuth } from 'hooks/useAuth';
import { setDoc, doc, Timestamp, addDoc, collection } from 'firebase/firestore';
import { db } from './../../firebase/firebase';


const Register = () => {

  const [isRegisterPage,setIsRegisterPage] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {isAuth} = useAuth()

  const handleRegister = (email,password,username)=>{
    const auth = getAuth()
    if (
      email.length >= 3 &&
      password.length >= 6 &&
      email.includes("@") &&
      email.includes(".")
    ) {
      dispatch(setLoading({isLoading:true}))
      createUserWithEmailAndPassword(auth, email, password)
        .then(response => {
          const usersCollectionRef = collection(db,'users')
          addDoc(usersCollectionRef, {
            uid: response.user.uid,
            username,
            email,
            password,
            createdAt: Timestamp.fromDate(new Date()),
          });
          dispatch(setLoading({ isLoading: false }));

          navigate("/login");
        })
        .catch((error) => {
          alert(error.code);
          dispatch(setLoading({ isLoading: false }));
        });
    }
    if (!email.includes("@") && !email.includes(".")) {
      alert("INVALID EMAIL");
    }
    if(email.length < 3){
      alert('Email should contain more characters')
    }
    if(password.length < 6){
      alert('Password length should be not less than 6 characters')
    }
  }
  return (
    <>
    {isAuth && <Navigate to='/'/>}
    <Form handleClick={handleRegister} title='Sign Up' isRegisterPage={isRegisterPage}/>
    </>
    )
}

export default Register