import React, { useState, useEffect, useContext } from "react";
import {
  Form,
  FormInline,
  FormGroup,
  Label,
  Input,
  Required,
  Select,
  Option,
} from "./register-form.styles";
import AppContext from "../../../context/app-viewport.context";
const RegisterForm = () => {
  const [payMethod, setPayMethod] = useState(null);
  const [mobileView, setMobileView] = useState(window.innerWidth < 600);
  const [tabletView, setTabletView] = useState(window.innerWidth < 992 && window.innerWidth >= 660);
  const width = useContext(AppContext);
  useEffect(() => {
    if (width < 660) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
    if (width < 992 && width >= 660) {
      setTabletView(true);
    } else {
      setTabletView(false);
    }
  }, [width]);
  return (
    <Form mobileView={mobileView} tabletView={tabletView}>
      <FormInline>
        <FormGroup>
          <Label>
            Họ<Required>*</Required>
          </Label>
          <Input name="fname" />
        </FormGroup>
        <FormGroup>
          <Label>
            Tên<Required>*</Required>
          </Label>
          <Input name="lname" />
        </FormGroup>
      </FormInline>
      <FormGroup>
        <Label>
          Quốc gia<Required>*</Required>
        </Label>
        <Input name="country" />
      </FormGroup>
      <FormGroup>
        <Input name="address" placeholder="Đường, Phường/Xã, Quận/Huyện" />
      </FormGroup>
      <FormGroup>
        <Input name="city" placeholder="Thành phố" />
      </FormGroup>
      <FormGroup>
        <Input name="apartment" placeholder="Số nhà" />
      </FormGroup>
      <FormInline>
        <FormGroup>
          <Label>Số điện thoại</Label>
          <Input name="phone" />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input name="email" />
        </FormGroup>
      </FormInline>
      <Select defaultValue="" required onChange={(e) => setPayMethod(e.target.value)}>
        <Option disabled hidden>
          Phương thức thanh toán
        </Option>
        <Option value="cod">Tiền mặt (COD)</Option>
        <Option value="paypal">Thanh toán qua thẻ</Option>
      </Select>
      {payMethod === "paypal" && (
        <React.Fragment>
          <FormGroup>
            <Label>Số Thẻ</Label>
            <Input name="paypalId" />
          </FormGroup>
          <FormGroup>
            <Label>Tên chủ thẻ</Label>
            <Input name="ownerPaypal" />
          </FormGroup>
        </React.Fragment>
      )}
    </Form>
  );
};

export default RegisterForm;
