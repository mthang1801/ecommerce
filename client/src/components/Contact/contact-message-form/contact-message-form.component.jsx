import React from 'react'
import {Form,Title, FormInline, Input, BtnSend, TextArea} from "./contact-message-form.styles";
const ContactMessageForm = ({mobileView, tabletView}) => {
  return (
    <Form mobileView={mobileView} tabletView={tabletView}>
      <Title>Để lại lời nhắn</Title>
      <FormInline>
        <Input placeholder="Nhập tên của bạn"/>
        <Input placeholder="Nhập email của bạn"/>
      </FormInline>
      <TextArea placeholder="Nội dung văn bản" rows={5} />
      <BtnSend>Gửi Lời nhắn</BtnSend>
    </Form>
  )
}

export default ContactMessageForm
