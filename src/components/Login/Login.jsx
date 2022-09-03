import React from 'react'
import Form from '../Form/Form'

const Login = ({setIsLoggedIn,setLoggedUsername}) => {

  const handleLogIn = (e) =>{
    e.preventDefault()
    setIsLoggedIn(true)
  }

  return (
    <div>в
    выфвыфвыфвыф
        <Form setLoggedUsername={setLoggedUsername} handleClick={handleLogIn} title={'Log In'} />
    </div>
  )
}

export default Login