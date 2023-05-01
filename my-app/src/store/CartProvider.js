import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemCartHandl = (item) => {
    dispatchCartAction({
      type: 'ADD',
    });
  };
  const removeItemCartHandl = (id) => {};

  const cartContext = {
    items: cartState.items,
    totalAmount: 0,
    addItem: addItemCartHandl,
    removeItem: removeItemCartHandl,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
