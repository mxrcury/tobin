import styles from './Preloader.module.css'
import Loader from 'images/Loader.gif'

const Preloader = () => {
  return (
    <>
    <div className={styles.preloaderModal}>
      <img src={Loader} alt="" />
    </div>
    <div className={styles.overlay}></div>
    </>
  );
}

export default Preloader