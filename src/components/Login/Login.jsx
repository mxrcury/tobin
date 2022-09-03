import React from 'react'
import Form from '../Form/Form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/firebase'

const Login = ({setIsLoggedIn}) => {

  const handleLogIn = (data) =>{
    console.log(data)
    signInWithEmailAndPassword(auth, data.email, data.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    alert(error.message)
  });
  }

  return (
    <div>
        <Form handleClick={handleLogIn} title={'Log In'} />
    </div>
  )
}

export default Login