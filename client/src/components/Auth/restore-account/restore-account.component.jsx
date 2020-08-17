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
import ReCAPTCHA from "react-google-recaptcha";

const TEST_SITE_KEY = "6LcvD8AZAAAAACzN8Rm8GyuqDckBjdIft40W75wJ";
const DELAY = 1500;
class RestoreAccount extends React.Component {
  state = {
    email: "",
    error: null,
    loading: false,
    disabled: true,    
  };

  _reCaptchaRef = React.createRef();

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: true });
    }, DELAY);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    const { email } = this.state;
    e.preventDefault();
    if (!email) {
      return;
    }
    try {
      // await resetAccount(email);
      this.props.history.push(`${this.props.match.path}/done`);
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  reCaptchaHandleChange = (value) => {
    this.setState({ value, disabled : false  });
    if(value === null) this.setState({disabled: true})
  }

  render() {
    console.log(this.props);
    const { email, error, loading, disabled } = this.state;
    return (
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
          {loading && (
            <Option>
              {" "}
              <ReCAPTCHA
                style={{ display: "inline-block" }}
                theme="dark"
                badge="inline"
                size="normal"
                ref={this._reCaptchaRef}
                sitekey={TEST_SITE_KEY}
                onChange={this.reCaptchaHandleChange}
                asyncScriptOnLoad={this.asyncScriptOnLoad}
              />
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
            <StyledLink to="/auth/signin">Back to Signin</StyledLink>
          </Option>
        </FormActions>
      </CustomFormContainer>
    );
  }
}

export default withRouter(RestoreAccount);
