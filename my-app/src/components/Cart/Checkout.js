import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => {
  return value.trim() === '';
};
const isFiveChars = (value) => {
  return value.trim().length === 5;
};

const Checkout = (props) => {
  const [formInputValid, setFormInputValid] = useState({
    name: true,
    city: true,
    street: true,
    postalCode: true,
  });
  const nameInputRef = useRef();
  const cityInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();

  const confirmHandler = (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputValid({
      name: enteredNameIsValid,
      city: enteredCityIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.submitOrderHandler({
      name: enteredName,
      city: enteredCity,
      street: enteredStreet,
      postalCode: enteredPostalCode,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputValid.name ? '' : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputValid.city ? '' : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputValid.street ? '' : classes.invalid
  }`;
  const postalControlClasses = `${classes.control} ${
    formInputValid.postalCode ? '' : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">이름</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValid.name && <p>유효한 이름을 작성하세요.</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">지역</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValid.city && <p>유효한 도시를 작성하세요.</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">상세 주소</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValid.street && <p>유효한 주소를 작성하세요.</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">우편번호</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputValid.postal && <p>유효한 우편번호를 작성하세요.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          취소
        </button>
        <button className={classes.submit}>확인</button>
      </div>
    </form>
  );
};
export default Checkout;
