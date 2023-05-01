import Modal from '../UI/Modal';
import classes from './Cart.module.css';
const Cart = (props) => {
  const cartItems = (
    <ul className={classes['cart-items']}>
      {[{ id: 'c1', name: 'Sushi', amount: 2, price: 12.99 }].map((list) => {
        return <li>{list.name}</li>;
      })}
    </ul>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>최종 금액</span>
        <span>35.62</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart}>
          닫기
        </button>
        <button className={classes.button}>주문</button>
      </div>
    </Modal>
  );
};
export default Cart;
