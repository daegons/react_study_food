import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
const HeaderCartButton = () => {
  return (
    <button className={classes.button}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>당신의 장바구니</span>
      <span className={classes.badge}>3</span>
    </button>
  );
};

export default HeaderCartButton;
