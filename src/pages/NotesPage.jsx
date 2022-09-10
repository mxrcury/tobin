import React from "react";
import { useAuth } from "hooks/useAuth";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Preloader from "components/Container/PreloaderModal/Preloader";
import Notes from "components/Notes/Notes";
import styled from 'styled-components';
import NotesContainer from "components/Notes/NotesContainer";

const Wrapper = styled.div`
    margin-top:100px;
`

const NotesPage = () => {
  const { isAuth } = useAuth();
  const { isLoading } = useSelector((state) => state.user);

  return (
    <Wrapper>
      {!isAuth && <Navigate replace to="/login" />}
      {isLoading && <Preloader />}
      <NotesContainer />
    </Wrapper>
  );
};

export default NotesPage;
