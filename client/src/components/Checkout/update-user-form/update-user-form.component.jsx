import React, { useState, useEffect } from "react";
import {
  Form,
  FormInline,
  FormGroup,
  Label,
  Input,
  Required, 
  Button,
  Title
} from "./update-user-form.styles";
import { connect } from "react-redux";
import { updateUserInfo } from "../../../redux/user/user.actions";
import Spinner from "../../UI/spinner/spinner.component"
const CheckoutForm = ({ currentUser, updateUserInfo, history }) => {
  const handleUpdateUserInfo = () => {};
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false); 
  useEffect(() => {
    if (    
      !firstName ||
      !lastName ||
      !city ||
      !district ||
      !ward ||
      !address ||
      !phone ||
      !email
    )
      return setDisabledBtn(true);
    setDisabledBtn(false);
  }, [firstName, lastName, city, district, ward, address, phone, email]);
  useEffect(() => {
    if (currentUser && currentUser.information) {      
      setFirstName(currentUser.information.first_name);
      setLastName(currentUser.information.last_name);
      setCity(currentUser.information.city);
      setDistrict(currentUser.information.district);
      setWard(currentUser.information.ward);
      setAddress(currentUser.information.address);
      setPhone(currentUser.information.phone);
      setEmail(currentUser.information.email);
    }
  }, [currentUser]);
  
  const handleSubmitUpdateForm = (e) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !city ||
      !district ||
      !ward ||
      !address ||
      !phone ||
      !email
    ) {
      return setErr("Bạn phải điền tất cả các trường")
    }
    setLoading(true);
    const userInformation = {
      first_name : firstName, 
      last_name : lastName, 
      city,
      district , 
      ward, 
      address, 
      phone, 
      email
    }
    updateUserInfo(userInformation)
    .then(res => {
      history.replace("/checkout")
      setLoading(false);
    }).catch(err => {
      setErr(err.response.data.message);
      setLoading(false);
    })
  };
  if(loading)
  return <Spinner/>
  return (
    <Form onSubmit={handleSubmitUpdateForm}>      
      <Title>Cập nhật thông tin</Title>
      {err ? <h4>{err}</h4> : null}
      <FormInline>
        <FormGroup>
          <Label htmlFor="fname">
            Họ<Required>*</Required>
          </Label>
          <Input
            name="fname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lname">
            Tên<Required>*</Required>
          </Label>
          <Input
            name="lname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormGroup>
      </FormInline>
      <FormGroup>
        <Label htmlFor="city">Tỉnh/ Thành phố</Label>
        <Input
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="district">Quận/ Huyện</Label>
        <Input
          name="district"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="ward">Phường/ Xã</Label>
        <Input
          name="ward"
          value={ward}
          onChange={(e) => setWard(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="address">Số nhà, đường</Label>
        <Input
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </FormGroup>
      <FormInline>
        <FormGroup>
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
      </FormInline>
    
      <Button
        style={{ display: "block", margin: "0 auto" }}
        onClick={handleUpdateUserInfo}
        disabled={disabledBtn}
      >
        Lưu thay đổi
      </Button>
    </Form>
  );
};
const mapDispatchToProps = (dispatch) => ({
  updateUserInfo: (userInfo) => dispatch(updateUserInfo(userInfo)),
});

export default connect(null, mapDispatchToProps)(CheckoutForm);
