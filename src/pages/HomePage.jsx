import React from "react";
import { Navigate } from "react-router-dom";
import TodoListContainer from "../components/Container/TodoListContainer";
import { useAuth } from 'hooks/useAuth';
import { useSelector } from 'react-redux';
import Preloader from "components/Container/PreloaderModal/PreloaderModal";

const HomePage = (props) => {
  const {isAuth} = useAuth()
  const {isLoading} = useSelector(state=>state.user)

  return (
    <div>
      {!isAuth && <Navigate replace to="/login" />}
      {isLoading && <Preloader/>}
      <TodoListContainer />
    </div>
  );
};

export default HomePage;
