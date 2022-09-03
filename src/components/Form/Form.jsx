import React from "react";
import { useState } from "react";
// import { useLocation, useNavigate, useParams, useRoutes } from "react-router-dom";
import styles from "./Form.module.css";
import { useForm } from 'react-hook-form'

const Form = ({ title, handleClick,setLoggedUsername,isRegisterPage }) => {


  // const { register,handleSubmit } = useForm({
  //   defaultValues:{
  //     username:'',
  //     email:'',
  //     password:''
  // }})

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [username,setUsername] = useState('')



  return (
    <div className={styles.wrapper}>
      <h1 className={styles.formTitle}>{title}</h1>
      <form onSubmit={handleClick} className={styles.formWrapper}>
        {isRegisterPage && (
          <input
            autoFocus
            type="text"
            placeholder="username"
            className={`${styles.input}`}
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <input
          autoFocus={!isRegisterPage && true}
          className={`${styles.input}`}
          type="email"
          placeholder="enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={`${styles.input}`}
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* {!isRegisterPage && (
          <div>
            <input type="checkbox" />
            remember me
          </div>
        )} */}

        <button className={styles.btn} onClick={handleClick}>
          {title}
        </button>
      </form>
    </div>
  );
};

export default Form;
