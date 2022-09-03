import React from 'react'
import Login from '../components/Login/Login'
import { Navigate } from "react-router-dom";

const LoginPage = (props) => {
  return (
    <div>
      {props.isLoggedIn && <Navigate replace to='/'/>}
      <Login {...props} />
    </div>
  );
}

export default LoginPage
