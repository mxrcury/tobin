import { Link } from 'react-router-dom'
import styles from './Header.module.css'

const Header = ({
  isLoggedIn, 
  setIsLoggedIn,
  loggedUsername
  }) => {
  const setLogOut = () =>{
    setIsLoggedIn(false)
  }

  return (
    <div className={styles.wrapper} style={{ color: "black" }}>
      {/* <input type="switch"/> */}
      {!isLoggedIn && (
        <div className={styles.buttons}>
          <Link to="/login">
            <button className={styles.logBtn}>Log In</button>
          </Link>
          <Link to="/register">
            <button className={styles.logBtn}>Sign Up</button>
          </Link>
        </div>
      )}
      {isLoggedIn && (
        <div className={styles.headerWrapper}>
          <div className={styles.headerTitle}>
          hi, {loggedUsername}
          </div>
          <div className={styles.button}>
            <button onClick={setLogOut} className={styles.logBtn}>
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


export default Header