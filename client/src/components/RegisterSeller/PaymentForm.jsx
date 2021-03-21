import React, { useState, useEffect } from "react";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import { Wrapper, CardHolderName } from "./styles/PaymentForm.styles";
import images from "react-payment-inputs/images";
import { connect } from "react-redux";
import { saveRegisterForm } from "../../redux/seller/seller.actions";
import { selectRegisterForm } from "../../redux/seller/seller.selectors";
import { createStructuredSelector } from "reselect";

const ERROR_MESSAGES = {
  emptyCardNumber: "Empty Card Number",
  invalidCardNumber: "Invalid Card Number",
  emptyExpiryDate: "Empty Expiry Date",
  monthOutOfRange: "Month Out Of Range",
  YearOutOfRange: "Year Out Of Range",
  dateOutOfRange: "Date Out Of Range",
  invalidExpiryDate: "Invalid Expiry Date",
  emptyCVC: "Empty CVC",
  invalidCVC: "Invalid CVC",
};

const PaymentForm = ({ save, register, disabledNext, setDisabledNext }) => {
  const [isError, setIsError] = useState(true);
  const { cardNumber, cvc, expiryDate, holderName } = register.cardPayment;
  const {
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
  } = usePaymentInputs();

  const onChangeHolderName = (e) => {
    save({
      ...register,
      cardPayment: { ...register.cardPayment, holderName: e.target.value },
    });
  };
  const handleChangeCardNumber = (e) => {
    save({
      ...register,
      cardPayment: { ...register.cardPayment, cardNumber: e.target.value },
    });
  };
  const handleChangeExpiryDate = (e) => {
    save({
      ...register,
      cardPayment: { ...register.cardPayment, expiryDate: e.target.value },
    });
  };
  const handleChangeCVC = (e) => {
    save({
      ...register,
      cardPayment: { ...register.cardPayment, cvc: e.target.value },
    });
  };
  const handleCardError = (error) => {
    if(error){
      return setIsError(true);
    }
    setIsError(false);
  };

  useEffect(() => {
    if(!isError && holderName && cvc && expiryDate && cardNumber){
      setDisabledNext(false) 
    }else{
      setDisabledNext(true);
    }
  },[cardNumber,expiryDate,cvc, isError, holderName])
  
  return (
    <Wrapper>
      <CardHolderName>
        <input
          type="text"
          placeholder="Card holder name"
          value={holderName}
          onChange={onChangeHolderName}
        />
      </CardHolderName>
      <PaymentInputsWrapper {...wrapperProps}>
        <svg {...getCardImageProps({ images })} />
        <input
          {...getCardNumberProps({
            onChange: handleChangeCardNumber,
            onError: handleCardError,
          })}
        />
        <input
          {...getExpiryDateProps({
            onChange: handleChangeExpiryDate,
            onError: handleCardError,
          })}
        />
        <input
          {...getCVCProps({
            onChange: handleChangeCVC,
            onError: handleCardError,
          })}
        />
      </PaymentInputsWrapper>
    </Wrapper>
  );
};
const mapStateToProps = createStructuredSelector({
  register: selectRegisterForm,
});
const mapDispatchToProps = (dispatch) => ({
  save: (obj) => dispatch(saveRegisterForm(obj)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm);
