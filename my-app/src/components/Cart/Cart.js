import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCxt = useContext(CartContext);

  const totalAmount = `${cartCxt.totalAmount}₩`;
  const hasItems = cartCxt.items.length > 0;

  const cartItemRemoveHandl = (id) => {
    cartCxt.removeItem(id);
  };
  const cartItemAddHandl = (item) => {
    cartCxt.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCxt.items.map((list) => {
        return (
          <CartItem
            ket={list.id}
            name={list.name}
            amount={list.amount}
            price={list.price}
            cartItemRemoveHandl={cartItemRemoveHandl.bind(null, list.id)}
            cartItemAddHandl={cartItemAddHandl.bind(null, list)}
          />
        );
      })}
    </ul>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>최종 금액</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout />}
      {!isCheckout && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onHideCart}>
            닫기
          </button>
          {hasItems && (
            <button onClick={orderHandler} className={classes.button}>
              주문
            </button>
          )}
        </div>
      )}
    </Modal>
  );
};
export default Cart;
