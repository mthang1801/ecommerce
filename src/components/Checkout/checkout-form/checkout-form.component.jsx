import React from "react";
import {
  Form,
  FormInline,
  FormGroup,
  Label,
  Input,
  Required,
  Select,
  Option
} from "./checkout-form.styles";
const CheckoutForm = () => {
  return (
    <Form>
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
      <Select >
        <Option value="#" disabled selected hidden>Phương thức thanh toán</Option>
        <Option value="cod">Tiền mặt (COD)</Option>
        <Option value="paypal">Thanh toán qua thẻ</Option>
      </Select>
    </Form>
  );
};

export default CheckoutForm;
