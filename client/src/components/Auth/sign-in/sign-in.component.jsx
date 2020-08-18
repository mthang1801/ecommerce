import React  from "react"; 
import {CustomFormContainer, FormHeader, Title, SubTitle,  FormGroups, FormActions, StyledLink, Option, FlashForm , ErrorMessage} from "../../UI/custom-form/custom-form.styles";
import CustomInput from "../../UI/custom-input/custom-input.component";
import CustomButton from "../../UI/custom-button/custom-button.component";
import {withRouter} from "react-router-dom";
import {FaGooglePlusG, FaFacebookF} from "react-icons/fa"
import {connect} from "react-redux"
import {loginStart} from "../../../redux/user/user.actions";
import GoogleRecaptcha from "../../UI/google-recaptcha/google-recaptcha.component";
import FacebookLogin from "../../UI/facebook-login/facebook-login.component";
import GoogleLogin from "../../UI/google-login/google-login.component";
class SignIn extends React.Component{
  state = {
    email : "", 
    password : "",
    error : null, 
    disabled : true , 
    loaded : false ,
    captcha_value :null
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({loaded: true})
    },1000)
  }

  handleChange = e => {
    const {name, value} = e.target;
    this.setState({ [name] : value})
  }

  onSubmitSigninForm = async e => {
    e.preventDefault();
    const {email, password} = this.state ; 
    if(!email || !password){
      this.setState({error : "Email và mật khẩu không được để trống"});
      return;
    }
    this.setState({error : null })
    try {
      this.props.login(email,password)
    } catch (error) {
      this.setState({error : error.message})
    }
  }
  handleChangeGoogleRecaptcha = value => {
    this.setState({ captcha_value: value, disabled: false });
    if (value === null) this.setState({ disabled: true });
  }

  render(){    
    const {email, password, error, disabled, loaded} = this.state;   
    const {authPath}  = this.props;   
    return (
      <CustomFormContainer onSubmit={this.onSubmitSigninForm}>
        <FormHeader>
          <Title>Sign In</Title>
          <SubTitle>Sign in your account via email and password.</SubTitle>
        </FormHeader>
        {error &&  <ErrorMessage>{error}</ErrorMessage>}
        <FlashForm>
          <FacebookLogin/>
          <GoogleLogin/>         
        </FlashForm>
        <FormGroups>                        
          <CustomInput type="text" name="email" value={email} label="Email" onChange={this.handleChange} required/>
          <CustomInput type="password" name="password" value={password} label="Password" onChange={this.handleChange} required/>
          {loaded && <GoogleRecaptcha onChange={this.handleChangeGoogleRecaptcha}/>}
          <CustomButton variant="outlined" size="small" color="#0d47a1" bgColor="blue" disabled={disabled} style={{marginTop : "1rem"}}>Sign In</CustomButton>
        </FormGroups>       
        <FormActions>          
          <Option>Don't have account ? <StyledLink to={`${authPath}/signup`}>Signup account</StyledLink></Option>
          <Option>Forgot password ? <StyledLink to={`${authPath}/restore-account`}>Get Password Again.</StyledLink></Option>
        </FormActions>
      </CustomFormContainer>
    )
  }

}

const mapDispatchToProps = dispatch => ({
  login : (email,password) => dispatch(loginStart(email, password))
})

export default connect(null, mapDispatchToProps)(withRouter(SignIn));