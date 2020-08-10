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
  SubTitle
} from "../../UI/custom-form/custom-form.styles";
import CustomInput from "../../UI/custom-input/custom-input.component";
import CustomButton from "../../UI/custom-button/custom-button.component";
import { withRouter } from "react-router-dom";
// import { resetAccount } from "../../utils/firebase";
class RestoreAccount extends React.Component {
  state = {
    email: "",
    error: null,
  };

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

  render() {
    console.log(this.props);
    const { email, error } = this.state;
    return (
      <CustomFormContainer onSubmit={this.handleSubmit}>
        <FormHeader>
          <Title>Forgot account</Title>
          <SubTitle>
            Get your account via Email.
          </SubTitle>
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
          <CustomButton
            variant="outlined"
            size="small"
            color="#0d47a1"
            bgColor="blue"
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
