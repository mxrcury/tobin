import React from 'react'
import { useAuth } from 'hooks/useAuth';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Preloader from 'components/Container/PreloaderModal/Preloader';
import Notes from 'components/Notes/Notes';

const NotesPage = () => {
    const {isAuth} = useAuth()
  const {isLoading} = useSelector(state=>state.user)
  return (
    <div>
        {!isAuth && <Navigate replace to="/login" />}
      {isLoading && <Preloader/>}
      <h1 style={{color:'black'}} >Hello Im Notes</h1>
      <Notes/>
    </div>
  )
}

export default NotesPage