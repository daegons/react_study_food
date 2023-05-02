import classes from "./Checkout.module.css";

const Checkout = () => {
  return (
    <form>
      <div className={classes.control}>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" />
      </div>
      <div className={classes.control}>
        <label htmlFor="street">street</label>
        <input type="text" id="street" />
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">우편번호</label>
        <input type="text" id="postal" />
      </div>
      <div className={classes.control}>
        <label htmlFor="city">도시</label>
        <input type="text" id="city" />
      </div>
      <button>확인</button>
    </form>
  );
};
export default Checkout;
