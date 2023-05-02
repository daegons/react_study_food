import { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
const Cart = (props) => {
  const cartCxt = useContext(CartContext);

  const totalAmount = `${cartCxt.totalAmount}₩`;
  const hasItems = cartCxt.items.length > 0;

  const cartItemRemoveHandl = (id) => {
    cartCxt.removeItem(id);
  };
  const cartItemAddHandl = (item) => {
    cartCxt.addItem({ ...item, amount: 1 });
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
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          닫기
        </button>
        {hasItems && <button className={classes.button}>주문</button>}
      </div>
    </Modal>
  );
};
export default Cart;
