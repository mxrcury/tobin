import React from 'react'
import Login from '../components/Login/Login'
import { Navigate } from "react-router-dom";
import { useAuth } from 'hooks/useAuth';

const LoginPage = (props) => {
  const {isAuth} = useAuth()
  return (
    <div>
      { isAuth ? <Navigate replace to='/'/> : <Login {...props} />}
    </div>
  );
}

export default LoginPage
