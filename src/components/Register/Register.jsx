import React from 'react'
import Form from '../Form/Form'
import { useHistory, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { auth } from './../../firebase/firebase'

import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {

  const navigate = useNavigate()

  const handleRegister = (data)=>{
    
    
    console.log(data)


    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        console.log(userCredential)
        // const user = userCredential.user;
        navigate('/login')
      })
      .catch((error) => {
        // alert(error.message)
        // ..
      });

      
  }
  const [isRegisterPage] = useState(true)

  return (
    <Form handleClick={handleRegister} isRegisterPage={isRegisterPage} title='Sign Up'/>
  )
}

export default Register