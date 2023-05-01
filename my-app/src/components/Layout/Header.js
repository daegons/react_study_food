import { Fragment } from 'react';
//이미지 import시키는 방법
import mealsImage from '../../assets/20200807114513_batakqhf.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>SDG</h1>
        <HeaderCartButton onShowCart={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="메인 음식 이미지" />
      </div>
    </Fragment>
  );
};
export default Header;
