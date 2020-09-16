import styled from "styled-components";

export const TextArea = styled.textarea`
  width: 100%;
  height: 7rem;
  font-size: 1em;
  min-height: 60px;
  padding: 0.75rem 1.25rem;
  outline: none;
  border-radius: 5px;
  border: 1.5px solid #198cf0;
  &:focus {
    border-color: #004a8a;
  }
  resize: none;
`;
