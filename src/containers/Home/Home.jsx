import { Outlet } from 'react-router-dom';
import classes from './home.module.scss';
import checkIcon from '../../assets/images/check_icon.png';

const Home = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.leftColumn}>
        <div className={classes.logoSection}>
          <img
            className={classes.checkIcon}
            src={checkIcon}
          />
          <p>ONLINE TODO LIST</p>
        </div>
        <div className={classes.mainImage} />
      </div>

      <Outlet />
    </div>
  );
};

export default Home;
