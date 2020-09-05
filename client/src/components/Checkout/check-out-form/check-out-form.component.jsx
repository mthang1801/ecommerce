import React from 'react'
import {CheckoutFormWrapper, Title, Button} from "./check-out-form.styles";
const CheckoutForm = ({currentUser, show,setToggleEditUserForm}) => {
  console.log(show);
  return (
    <CheckoutFormWrapper show={show}>
      <Title>Thông tin khách hàng</Title>
      <p>Tên khách hàng : <span style={{fontWeight:"bold"}}>{`${currentUser.information.first_name} ${currentUser.information.last_name}`}</span></p>
      <p>Địa chỉ : {`${currentUser.information.address}, phường ${currentUser.information.ward}, Quận ${currentUser.information.district}, ${currentUser.information.city}`}</p>
      <p>Email : {currentUser.information.email}</p>
      <p>Điện thoại : {currentUser.information.phone}</p>
      <Button onClick={setToggleEditUserForm}>Cập nhật</Button>
    </CheckoutFormWrapper>
  )
}

export default CheckoutForm
