import { Link } from 'react-router-dom'
import styles from './Header.module.css'

const Header = () => {
  return (
    <div className={styles.wrapper} style={{color:'black'}}>
    {/* <input type="switch"/> */}
    <Link to='/' className={styles.link}>My tasks</Link>
    <div className={styles.buttons}>
        <Link to='/login'><button className={styles.logBtn}>Log In</button></Link>
        <Link to='/register'><button className={styles.logBtn}>Sign Up</button></Link>
    </div>
    </div>
  )
}


export default Header