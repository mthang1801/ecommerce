import React from "react";
import {
  AuthFormContainer,
  FormHeader, 
  FormGroups,
  FormActions,
  StyledLink,
  Option,
  FlashForm,
  Title,
  SubTitle,
  ErrorMessage
} from "./styles/AuthForm.styles";
import CustomInput from "../Custom/CustomInput";
import CustomButton from "../Custom/CustomButton";
import { withRouter } from "react-router-dom";
import { FaGooglePlusG, FaFacebookF } from "react-icons/fa";
import {registerStart} from "../../redux/user/user.actions"
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectUserError} from "../../redux/user/user.selectors";
import GoogleRecaptcha from "./GoogleRecaptcha";
import FacebookLogin from "./FacebookLogin";
import GoogleLogin from "./GoogleLogin";
const INITIAL_STATE = {
  controls: {
    name: {
      type: "text",
      name: "name",
      valid: false,
      label: "Name",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 50,
      },
      value: "",
      touched: false,
      validationErrors: "",
    },
    email: {
      type: "email",
      name: "email",
      label: "Email",
      valid: false,
      validation: {
        required: true,
        isEmail: true,
      },
      value: "",
      touched: false,
      validationErrors: "",
    },
    password: {
      type: "password",
      name: "password",
      valid: false,
      label: "Password",
      validation: {
        required: true,
        minLength: 6,
      },
      value: "",
      touched: false,
      validationErrors: "",
    },
    confirmPassword: {
      type: "password",
      name: "confirmPassword",
      label: "Confirm Password",
      valid: false,
      validation: {
        required: true,
        minLength: 6,
        match: true,
      },
      value: "",
      touched: false,
      validationErrors: "",
    },
  },
  formIsValid: false,
  loaded : false ,
  disabled : true 
};
class SignUp extends React.Component {
  state = { ...INITIAL_STATE };

  componentDidMount(){
    setTimeout(() => {
      this.setState({loaded : true})
    },1000)
  }

  checkValidity = (value, rules) => {   
    let isValid = true;
    let errorsMessage = [];
    if (rules.required) {
      isValid = value.trim().length && isValid;
      if (!isValid) {
        errorsMessage.push("This field is required");
      }
    }
    if (rules.isEmail) {
      const pattern = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = pattern.test(value) && isValid;
      if (!isValid) {
        errorsMessage.push("Email is invalid");
      }
    }
    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid;
      if (!isValid) {
        errorsMessage.push(`Invalid, at least ${rules.minLength} characters`);
      }
    }
    if (rules.maxLength) {
      isValid = value.trim().length <= rules.maxLength && isValid;
      if (!isValid) {
        errorsMessage.push(`Invalid, at most ${rules.maxLength} characters`);
      }
    }
    if (rules.match) {
      isValid = value.trim() === this.state.controls.password.value && isValid;
      if (!isValid) {
        errorsMessage.push("Password and confirm Password do not match");
      }
    }
    return errorsMessage;
  };

  handleChange = (e, name) => {
    let updatedControls = { ...this.state.controls };
    let updatedControlElement = { ...updatedControls[name] };
    updatedControlElement.value = e.target.value;
    const checkValid = this.checkValidity(
      e.target.value,
      updatedControlElement.validation
    );
    updatedControlElement.valid = checkValid.length === 0;
    updatedControlElement.touched = true;
    updatedControlElement.validationErrors = checkValid;
    updatedControls[name] = updatedControlElement;
    let { email, password, confirmPassword } = updatedControls;
    const formIsValid =
      email.valid &&
      updatedControlElement.valid &&
      password.valid &&
      confirmPassword.valid;
    this.setState({ controls: updatedControls, formIsValid });
  };

  handleSubmitSignUpForm = (e) => {
    e.preventDefault();
    if (!this.state.formIsValid) {
      this.setState({ ...INITIAL_STATE });
      return;
    }
    const { name, email, password } = this.state.controls;   
    
    this.props.registerStart(name.value,email.value, password.value);
  };

  handleChangeGoogleRecaptcha = value => {
    this.setState({ captcha_value: value, disabled: false });
    if (value === null) this.setState({ disabled: true });
  }

  render() {
    const { formIsValid, loaded , disabled} = this.state;
    let formInputArray = [];
    Object.keys(this.state.controls).map((controlItem) => {
      formInputArray.push(this.state.controls[controlItem]);
    });
    const {error} = this.props
    return (
      <AuthFormContainer onSubmit={this.handleSubmitSignUpForm}>
        <FormHeader>
          <Title>Sign Up</Title>
          <SubTitle>
            Sign up your account via email and password.
          </SubTitle>
        </FormHeader>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <FlashForm>         
          <FacebookLogin/>
          <GoogleLogin/>
        </FlashForm>
        <FormGroups>
          {formInputArray.map(
            ({
              label,
              name,
              touched,
              type,
              valid,
              validation,
              validationErrors,
              value,
            }) => (
              <CustomInput
                key={name}
                type={type}
                name={name}
                value={value}
                label={label}
                onChange={(e) => this.handleChange(e, name)}
                require={validation.required}
                touched={touched}
                valid={valid}
                validationErrors={validationErrors}
              />
            )
          )}
          {loaded && <GoogleRecaptcha onChange={this.handleChangeGoogleRecaptcha}/>}
          <CustomButton
            variant="outlined"
            size="small"
            color="#0d47a1"
            bgColor="blue"            
            disabled={!formIsValid || disabled}
           
          >
            Submit
          </CustomButton>
        </FormGroups>
        <FormActions>
          <Option>
            <StyledLink to="/auth">Signin account</StyledLink>
          </Option>
          <Option>
            Forgot password ?{" "}
            <StyledLink to="/auth/restore-account">
              Get Password Again.
            </StyledLink>
          </Option>
        </FormActions>
      </AuthFormContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  error : selectUserError
})

const mapDispatchToProps = dispatch => ({
  registerStart : (name,email,password) => dispatch(registerStart(name,email,password))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));
