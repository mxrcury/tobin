import React from "react";
import { Navigate } from "react-router-dom";
import TodoListContainer from "../../components/Container/TodoList/TodoListContainerFn";
import { useAuth } from 'hooks/useAuth';
import { useSelector } from 'react-redux';
import Preloader from "components/Container/PreloaderModal/Preloader";

const ToDoPage = (props) => {
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

export default ToDoPage;
