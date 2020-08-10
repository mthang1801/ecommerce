import React from "react";
import {
  InputGroup,
  Input,
  Label,
  TextError,
  TextSuccess,
} from "./custom-input.style";
const CustomInput = ({
  onChange,
  label,
  value,
  touched,
  valid,
  validationErrors,
  ...otherProps
}) => {
  const transformedErrors =
    validationErrors && validationErrors.length
      ? validationErrors.map((error, idx) => {
          return idx === validationErrors.length - 1 ? error : error + ", ";
        })
      : "";
  const border = touched ? (transformedErrors ? "error" : "success") : null;
  return (
    <InputGroup>
      <Input
        onChange={onChange}
        value={value}
        {...otherProps}
        border={border}
      />
      <Label shrinkLabel={!!value}>{label}</Label>
      {touched ? (
        transformedErrors ? (
          <TextError>{transformedErrors}</TextError>
        ) : (
          <TextSuccess>Valid Field</TextSuccess>
        )
      ) : null}
    </InputGroup>
  );
};

export default CustomInput;
