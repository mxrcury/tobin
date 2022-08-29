import React from "react";
import styles from "./Form.module.css";

const Form = ({ title, handleClick }) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.formTitle}>{title}</h1>
      <form action="" className={styles.formWrapper}>
        <input type="email" />
        <input type="password" />
        {/* <input type="password" /> */}
        <button onClick={handleClick}>Log In</button>
      </form>
    </div>
  );
};

export default Form;
