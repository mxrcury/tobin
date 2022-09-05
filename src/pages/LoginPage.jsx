import React from 'react'
import Login from '../components/Login/Login'
import { Navigate } from "react-router-dom";
import { useAuth } from 'hooks/useAuth';
import { useSelector } from 'react-redux';
import Preloader from 'components/Container/PreloaderModal/Preloader';

const LoginPage = (props) => {
  const {isAuth} = useAuth()
  const {isLoading} = useSelector(state=>state.user)
  return (
    <div>
      {isLoading && <Preloader/>}
      { isAuth ? <Navigate replace to='/'/> : <Login {...props} />}
    </div>
  );
}

export default LoginPage
