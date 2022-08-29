import React from "react";
import { Navigate } from "react-router-dom";
import TodoListContainer from "../components/Container/TodoListContainer";

const HomePage = () => {
  return (
    <div>
      <Navigate replace to="/login" />
      <TodoListContainer />
    </div>
  );
};

export default HomePage;
