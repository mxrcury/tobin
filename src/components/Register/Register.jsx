import React from 'react'
import Form from '../Form/Form'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { getAuth } from 'firebase/auth';


const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleRegister = (email,password)=>{
    const auth = getAuth()
    if (
      email.length >= 3 &&
      password.length >= 6 &&
      email.includes("@") &&
      email.includes(".")
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/login");
        })
        .catch((error) => alert(error.code));
    }
    // if(!email.match(/@/)){
    //   console.log('weqweqw')
    // }
    if(email.length < 3){
      alert('Email should contain full mail')
    }
    if(password.length < 6){
      alert('Password length should be not less than 6 symbols')
    }
  }

  return (
    <Form handleClick={handleRegister} title='Sign Up'/>
  )
}

export default Register