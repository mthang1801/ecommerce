import React, { Fragment } from "react";
import { CustomButtonContainer, IconButton } from "./custom-button.styles";
const CustomButton = ({ children, icon, positionIcon, ...props }) => {
  return (
    <CustomButtonContainer {...props}>
      {positionIcon === "before" ? (
        <Fragment>
          <IconButton>{icon}</IconButton>
          {children}
        </Fragment>
      ) : positionIcon === "after" ? (
        <Fragment>
          {children}
          <IconButton>{icon}</IconButton>
        </Fragment>
      ) : (
        <Fragment>{children}</Fragment>
      )}
    </CustomButtonContainer>
  );
};

export default CustomButton;
