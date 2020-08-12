import React from "react";
import Modal from "../../components/UI/modal/modal.component";
const WithError = (WrappedComponent) => {
  return ({ error, ...otherProps }) => {
    return error ? (
      <React.Fragment>
        <Modal show={error} close={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...otherProps} />
      </React.Fragment>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };
};

export default WithError;
