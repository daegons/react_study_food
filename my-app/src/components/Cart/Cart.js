import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
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

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      'https://daegon---react-project-default-rtdb.firebaseio.com/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItem: cartCxt.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCxt.clearCart();
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCxt.items.map((list) => {
        return (
          <CartItem
            key={list.id}
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

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onHideCart}>
        닫기
      </button>
      {hasItems && (
        <button onClick={orderHandler} className={classes.button}>
          주문
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        {!hasItems ? <span>상품을 추가해주세요.</span> : <span>최종 금액</span>}
        {!hasItems ? '' : <span>{totalAmount}</span>}
      </div>
      {isCheckout && (
        <Checkout
          submitOrderHandler={submitOrderHandler}
          onCancel={props.onHideCart}
        />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>주문 요청중...🕗</p>;

  const DidSubmittingModalContent = (
    <>
      <p>주문 완료 ✔</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCart}>
          닫기
        </button>
      </div>
    </>
  );
  return (
    <Modal onHideCart={props.onHideCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && DidSubmittingModalContent}
    </Modal>
  );
};
export default Cart;
