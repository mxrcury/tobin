import { useInput } from "hooks/useInput";
import React from "react";
import { useState } from "react";
import styles from "./Form.module.css";

const Form = ({ title, handleClick,isRegisterPage }) => {

  const email = useInput()
  const password = useInput()
  const username = useInput()
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.formTitle}>{title}</h1>
      <div className={styles.formWrapper}>
        {isRegisterPage && (
          <input
            className={`${styles.input}`}
            type="text"
            placeholder="enter username"
            {...username.bind}
            required
          />
        )}
        <input
          autoFocus
          className={`${styles.input}`}
          type="email"
          placeholder="enter your email"
          required
          {...email.bind}
        />
        <input
          className={`${styles.input}`}
          type="password"
          placeholder="password"
          required
          {...password.bind}
        />
        <button
          className={styles.btn}
          onClick={() => {
            handleClick(email.bind.value, password.bind.value,username.bind.value);
          }}
        >
          {title}
        </button>
      </div>
    </div>
  );
};

export default Form;
