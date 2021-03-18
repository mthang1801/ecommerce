import React from "react";
import {
  ForgotDoneContainer,
  CheckIconContainer,
  TextContent,
  ButtonDone,
} from "./styles/RestoreAccountDone.styles";

import { withRouter } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";
const ForgotPasswordDone = ({ history, location, match }) => {
  return (
    <ForgotDoneContainer>
      <CheckIconContainer>
        <FaRegCheckCircle />
      </CheckIconContainer>
      <TextContent>
        We have received your suggestion about restoring your email account. You
        need to check your email to activate restore password feature and update
        new password.
      </TextContent>
      <ButtonDone onClick={() => history.replace("/auth")}>
        Done
      </ButtonDone>
    </ForgotDoneContainer>
  );
};

export default withRouter(ForgotPasswordDone);
