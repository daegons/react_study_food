import { Fragment } from "react";
//이미지 import시키는 방법
import mainImage from "../../assets/20200807114513_batakqhf.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        {/* <h1>SDG</h1> */}
        <div>메인로고</div>

        <HeaderCartButton onShowCart={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mainImage} alt="메인 이미지" />
      </div>
    </Fragment>
  );
};
export default Header;
