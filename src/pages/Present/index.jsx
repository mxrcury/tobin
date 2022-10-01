import React from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';

const PresentPage = () => {
    const {isAuth} = useAuth()
  return (

    <>
    {isAuth && <Navigate replace to='/todos'/>}
    <h1 style={{color:'#2f2f2f',textAlign:'center',marginTop:'60px',fontSize:'37px'}}>
      TOBIN
    </h1>
    <p style={{color:'#2f2f2f',textAlign:'center',marginTop:'13px',fontSize:'18px'}}>click on button for <Link style={{color:'black'}} to='/login'>log in</Link> or <Link style={{color:'black'}} to='/register'>sign up</Link></p>
    </>
  )
}

export default PresentPage
