import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import { useAuth } from 'hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, setLoading } from 'Redux/Reducers/todo-reducer';
import { useNavigate } from 'react-router-dom'
import Preloader from 'components/Container/PreloaderModal/PreloaderModal';

const Header = () => {
  const { isAuth } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {email,isLoading} = useSelector(state=>state.user)

  const handleLogOut = () => {
    dispatch(setLoading({isLoading:true}))
    dispatch(removeUser())
    dispatch(setLoading({isLoading:false}))
    navigate('/login')
  };


  if(isLoading){return <Preloader/>}
  return (
    <div className={styles.wrapper} style={{ color: "black" }}>
      {/* <input type="switch"/> */}
      {!isAuth && (
        <div className={styles.buttons}>
          <Link to="/login">
            <button className={styles.logBtn}>Log In</button>
          </Link>
          <Link to="/register">
            <button className={styles.logBtn}>Sign Up</button>
          </Link>
        </div>
      )}
      {isAuth && (
        <div className={styles.headerWrapper}>
          <div className={styles.headerTitle}>hi,  {email}</div>
          <div className={styles.button}>
            <button onClick={handleLogOut} className={styles.logBtn}>
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


export default Header