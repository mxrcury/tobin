import React from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams, useRoutes } from "react-router-dom";
import styles from "./Form.module.css";

const Form = ({ title, handleClick,setLoggedUsername }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const params = useParams()
  // const navigate = useNavigate()
  // const routes = useRoutes()
  // const location = useLocation()

  const handleEmailChange = (e) => {
    const emailValue = e.target.value
    setEmail(emailValue);
    //
    setLoggedUsername(emailValue)
    //
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };



  return (
    <div className={styles.wrapper}>
      <h1 className={styles.formTitle}>{title}</h1>
      <form onSubmit={handleClick} className={styles.formWrapper}>
        <input
          autoFocus
          className={`${styles.input}`}
          type="text"
          placeholder="enter your name"
          required
          value={email}
          onChange={handleEmailChange}
        />
        <input
          className={`${styles.input}`}
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={handlePasswordChange}
        />

        {/* {location.pathname === '/login' && <div>
          <input type="checkbox" />
          remember me
        </div>} */}
        {/* {console.log(routes)} */}

        <button className={styles.btn} onClick={handleClick}>
          {title}
        </button>
      </form>
    </div>
  );
};

export default Form;
