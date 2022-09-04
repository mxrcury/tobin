import React from "react";
import { Navigate } from "react-router-dom";
import TodoListContainer from "../components/Container/TodoListContainer";
import { useAuth } from 'hooks/useAuth';

const HomePage = (props) => {
  const {isAuth} = useAuth()

  return (
    <div>
      {!isAuth && <Navigate replace to="/login" />}
      <TodoListContainer />
    </div>
  );
};

export default HomePage;
