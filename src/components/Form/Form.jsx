import React from "react";
import { useState } from "react";
import styles from "./Form.module.css";

const Form = ({ title, handleClick,isRegisterPage }) => {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [username,setUsername] = useState('')

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.formTitle}>{title}</h1>
      <div className={styles.formWrapper}>
        {isRegisterPage && (
          <input
            className={`${styles.input}`}
            type="text"
            placeholder="enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}
        <input
          autoFocus
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
        <button
          className={styles.btn}
          onClick={() => {
            handleClick(email, password,username);
          }}
        >
          {title}
        </button>
      </div>
    </div>
  );
};

export default Form;
