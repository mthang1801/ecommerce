import React , {useEffect} from 'react'
import {AiOutlineCheckCircle} from "react-icons/ai"
import {RiErrorWarningLine} from "react-icons/ri"
import {FormCompleteWrapper, IconLayer, TextContent, ButtonDone} from "./styles/FormComplete.styles";
import {withRouter} from "react-router-dom";
import {fetchUserStart} from "../../redux/user/user.actions";
import {connect} from "react-redux";
import { clearAll } from '../../redux/seller/seller.actions';
const FormCompleteCreateProduct = ({success, history, clearAll, fetchUser}) => {
  useEffect(() => {
    window.scrollTo({
      top : 100,
      behavior : "smooth"
    })
  }, [])
  const handleComplete = e => {      
    clearAll();
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
        <p>Bạn đã đăng sản phẩm thành công, quản trị viên sẽ duyệt lại và sẽ phản hổi với bạn trong thời gian sớm.</p> :
        <p>Có lỗi xảy ra, vui lòng thử lại.</p>
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
export default connect(null, mapDispatchToProps)(withRouter(FormCompleteCreateProduct))
