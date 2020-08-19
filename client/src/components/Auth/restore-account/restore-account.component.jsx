import React from "react";
import {
  CustomFormContainer,
  FormHeader,
  FormGroups,
  FormActions,
  StyledLink,
  Option,
  ErrorMessage,
  Title,
  SubTitle,
} from "../../UI/custom-form/custom-form.styles";
import CustomInput from "../../UI/custom-input/custom-input.component";
import CustomButton from "../../UI/custom-button/custom-button.component";
import { withRouter } from "react-router-dom";
import { restoreAccount } from "../../../redux/user/user.actions";
import { connect } from "react-redux";
import { selectUserError} from "../../../redux/user/user.selectors"
import {createStructuredSelector} from "reselect"
import Loader from "../../UI/loader/loader.component";
import GoogleRecaptcha from "../../UI/google-recaptcha/google-recaptcha.component"
class RestoreAccount extends React.Component {
  state = {
    email: "",   
    loaded: false,
    disabled: true,
    submitLoading: false,
    captcha_value : null
  };

  componentDidMount() {    
     setTimeout(() => {
      this.setState({ loaded: true });
     },1000)
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    this.setState({submitLoading : true })
    const { email } = this.state;
    e.preventDefault();
    if (!email) {
      return;
    }
    try {
      await this.props.restoreAccount(email);
      this.setState({submitLoading : false});
      this.props.history.push(`${this.props.match.path}/done`);
    } catch (error) {      
      this.setState({submitLoading : false});      
    }
  };

  reCaptchaHandleChange = (value) => {
    this.setState({ captcha_value : value, disabled: false });
    if (value === null) this.setState({ disabled: true });
  };

  render() {  
    const { email, loaded, disabled, submitLoading } = this.state;
    const {error} = this.props;
    return (
      <React.Fragment>
        {submitLoading && <Loader />}
        <CustomFormContainer onSubmit={this.handleSubmit}>
          <FormHeader>
            <Title>Forgot account</Title>
            <SubTitle>Get your account via Email.</SubTitle>
          </FormHeader>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <FormGroups>
            <CustomInput
              type="text"
              name="email"
              value={email}
              label="Email"
              onChange={this.handleChange}
              required
            />
            {loaded && (
              <Option>
                {" "}
               <GoogleRecaptcha onChange={this.reCaptchaHandleChange}/>
               </Option>
            )}
            <CustomButton
              variant="contained"
              color="white"
              size="small"
              bgColor="#3949ab"
              disabled={disabled}
            >
              Submit
            </CustomButton>
          </FormGroups>

          <FormActions>
            <Option>
              <StyledLink to="/auth">Back to Signin</StyledLink>
            </Option>
          </FormActions>
        </CustomFormContainer>
      </React.Fragment>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  error : selectUserError
})
const mapDispatchToProps = (dispatch) => ({
  restoreAccount: (email) => dispatch(restoreAccount(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RestoreAccount));
