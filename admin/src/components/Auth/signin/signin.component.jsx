import React  from "react"; 
import {CustomFormContainer, FormHeader, Title, SubTitle,  FormGroups, FormActions, StyledLink, Option, FlashForm , ErrorMessage} from "../../UI/auth-form/auth-form.styles";
import CustomInput from "../../UI/custom-input/custom-input.component";
import CustomButton from "../../UI/custom-button/custom-button.component";
import {SignInWrapper} from "./signin.styles";
import {withRouter} from "react-router-dom";
import {login} from "../../../redux/user/user.actions"
import {connect} from "react-redux";

class SignIn extends React.Component{
  state = {
    email : "", 
    password : "",
    error : null
  }

  handleChange = e => {
    const {name, value} = e.target;
    this.setState({ [name] : value})
  }

  onSubmitSigninForm = async e => {
    e.preventDefault();
    const {email, password} = this.state ; 
    this.setState({error : null })
    this.props.login(email, password);
  }

  render(){    
    const {email, password, error} = this.state; 
    const {match}= this.props;
    console.log(match)
    return (
      <SignInWrapper>
         <CustomFormContainer onSubmit={this.onSubmitSigninForm}>
        <FormHeader>
          <Title>Sign In</Title>
          <SubTitle>Sign in your account via email and password.</SubTitle>
        </FormHeader>
        {error &&  <ErrorMessage>{error}</ErrorMessage>}        
        <FormGroups>                        
          <CustomInput type="text" name="email" value={email} label="Email" onChange={this.handleChange} required/>
          <CustomInput type="password" name="password" value={password} label="Password" onChange={this.handleChange} required/>
          <CustomButton variant="outlined" size="small" color="#0d47a1" bgColor="blue">Sign In</CustomButton>
        </FormGroups>       
        <FormActions>          
          <Option>Don't have account ? <StyledLink to={`${match.path}/signup`}>Signup account</StyledLink></Option>
          <Option>Forgot password ? <StyledLink to={`${match.path}/forgot-password`}>Get Password Again.</StyledLink></Option>
        </FormActions>
      </CustomFormContainer>
      </SignInWrapper>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  login : (email, password) => dispatch(login(email, password))
})

export default connect(null, mapDispatchToProps)(withRouter(SignIn));