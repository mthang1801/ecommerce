import React , {useState, useContext, useEffect} from 'react'
import { selectOrderedDetail} from "../../../redux/cart/cart.selectors";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect"
import {OrderedCompleteWrapper, Button} from "./checkout-complete.styles";
import AppContext from "../../../context/app-viewport.context";
const OrderedComplete = ({orderedDetail, history}) => {  
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
