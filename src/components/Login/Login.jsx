import React from 'react'
import Form from '../Form/Form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { setLoading, setUser } from 'Redux/Reducers/todo-reducer'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

const Login = ({setIsLoggedIn}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogIn = (email,password) =>{
    const auth = getAuth()
    if (
      email.length >= 3 &&
      password.length >= 6 &&
      email.includes("@") &&
      email.includes(".")
    ) {
    dispatch(setLoading({isLoading:true}))
    signInWithEmailAndPassword(auth,email,password)
    .then(({user}) => {
      dispatch(setUser({email:user.email,token:user.accessToken,id:user.uid}))
      dispatch(setLoading({isLoading:false}))
    }
      )
    .catch((error)=>{alert(`Error: ${error.code}`)
    dispatch(setLoading({isLoading:false}))})
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
    <div>
        <Form handleClick={handleLogIn} title={'Log In'} />
    </div>
  )
}

export default Login