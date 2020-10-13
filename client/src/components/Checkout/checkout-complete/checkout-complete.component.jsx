import React , {useState, useEffect} from 'react'
import { selectOrderedDetail} from "../../../redux/cart/cart.selectors";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect"
import {OrderedCompleteWrapper, Button} from "./checkout-complete.styles";
const OrderedComplete = ({orderedDetail, history}) => {  
  
  if(!orderedDetail){
    return <OrderedCompleteWrapper>
      <h4>Rất tiếc, chúng tôi không tìm thấy hóa đơn thanh toán nào của bạn.</h4>
      <Button onClick={() => history.replace("/")}>Quay lại trang chủ</Button>
    </OrderedCompleteWrapper>
  }
  return (
    <OrderedCompleteWrapper>
      <h4>Cám ơn bạn đã đặt hàng!</h4>
      <span>Số hóa đơn : {orderedDetail._id} </span>
      <Button onClick={() => history.replace("/")}>Quay lại trang chủ</Button>
    </OrderedCompleteWrapper>
  )
}

const mapStateToProps = createStructuredSelector({ 
  orderedDetail : selectOrderedDetail
})

export default connect(mapStateToProps)(OrderedComplete)
