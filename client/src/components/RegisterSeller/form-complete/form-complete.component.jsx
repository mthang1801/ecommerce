import React , {useEffect} from 'react'
import {AiOutlineCheckCircle} from "react-icons/ai"
import {RiErrorWarningLine} from "react-icons/ri"
import {FormCompleteWrapper, IconLayer, TextContent, ButtonDone} from "./form-complete.styles";
import {withRouter} from "react-router-dom";
import {clearAll} from "../../../redux/seller/seller.actions";
import {fetchUserStart} from "../../../redux/user/user.actions";
import {connect} from "react-redux";
const FormComplateRegisterSeller = ({success, history, clearAll, scroll, fetchUser}) => {
  useEffect(() => {
    window.scrollTo({
      top : scroll, 
      behavior:  "auto"
    })
  },scroll)
  const handleComplete = e => {
    if(success){
      clearAll();      
    }
    fetchUser();
    history.replace("/");
  }
  return (   
    <FormCompleteWrapper>      
      <IconLayer success={success}>
        {success ? <AiOutlineCheckCircle /> : <RiErrorWarningLine/> }
      </IconLayer>
      <TextContent>
        {success ? 
        <p>Bạn đã đăng ký trở thành đối tác với chúng tôi thành công, bộ phận quản trị sẽ xem xét đơn của bạn và liên hệ với bạn trong thời gian sớm nhất. Để tìm hiểu thêm thông tin chi tiết vui lòng để gọi điện thoại trực tiếp đến tổng đài 19999999 hoặc gửi email đến <a href="#">organic@support.com</a>.Trân trọng!</p> :
        <p>Đơn đăng ký của bạn không thành công, trong quá trình đăng ký và tạo sản phẩm có thể đã xảy ra lỗi, vui lòng thử lại.</p>
        }
      </TextContent>
      <ButtonDone onClick={handleComplete}>
        {success ? "Hoàn tất" : "Trở về"}
      </ButtonDone>
    </FormCompleteWrapper>   
  )
}
const mapDispatchToProps = dispatch => ({
  clearAll : () => dispatch(clearAll()),
  fetchUser: () => dispatch(fetchUserStart())
})
export default connect(null, mapDispatchToProps)(withRouter(FormComplateRegisterSeller))
