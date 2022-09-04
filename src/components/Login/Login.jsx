import React from 'react'
import Form from '../Form/Form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { setUser } from 'Redux/Reducers/todo-reducer'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

const Login = ({setIsLoggedIn}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogIn = (email,password) =>{
    const auth = getAuth()
    signInWithEmailAndPassword(auth,email,password)
    .then(({user}) => {
      dispatch(setUser({email:user.email,token:user.accessToken,id:user.uid}))
      navigate('/')}
      )
    .catch((error)=>alert('This user is not found'))

  }

  return (
    <div>
        <Form handleClick={handleLogIn} title={'Log In'} />
    </div>
  )
}

export default Login