import styled from "styled-components";

export const Form = styled.form`
  width: 600px;
  // max-width: 40%;
  margin: 1rem auto;
`;
export const FormGroup = styled.div`
  width: 100%;
  height: 2.5rem;
  display: flex;
  flex-direction: column;  
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
  position: relative;
`;
export const Error = styled.div`
  margin: 2rem;
  text-align: center;
  color: #dd2222;
  font-weight: 600;
`;
export const Success = styled.div`
  margin: 2rem;
  text-align: center;
  color: #7fad39;
  font-weight: 600;
`;
export const FormInline = styled.div`
  display: flex;
  width: 100%;
  height: 2.5rem;
`;

export const FormDropdown = styled.div`
  display: flex;
  margin: 2rem 0;
  position: relative;
`;

export const Title = styled.h2`
  text-align: center;
  font-size: 1.6em;
  text-transform: uppercase;
  margin: 2rem auto;  
`;

export const Label = styled.span`
  background: linear-gradient(to right, #bbdefb , #90caf9);
  position: absolute;
  top: -0.75rem;
  left: 1rem;
  z-index: 1;
  padding :0  0.25rem;
`;

export const Input = styled.input`
  border-radius: 5px;
  width: 100%;
  height: 100%;
  padding: 0 0.5rem;
  font-size: 1.1em;
  border: none;
  outline: none;
  border: 1px solid #424242;
  z-index: 0;
  &[type="file"] {
    padding-top: 0.6rem;
  }
  flex-grow: 1;
  background: linear-gradient(to right , #90caf9,#bbdefb)
`;

export const Feedback = styled.span`
  font-size: 0.8em;
  font-style: italic;
  color: #dd2222;
  position: absolute;
  left: 0.15rem;
  top: 100%;
`;

export const Required = styled.span`
  color: #dd2222;
`;

export const Select = styled.div`
  width: 100%;
  padding: 0.4rem 1rem;
  font-size: 1rem;
  line-height: 1.7;
  outline: none;
  border: 1px solid #424242;
  border-radius: 0.3rem;
  margin: 0 auto 1rem auto;
  background-color: transparent;
  z-index: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  position: relative;
  background: linear-gradient(to right , #90caf9,#bbdefb);
`;

export const SelectIcon = styled.span`
  font-size: 0.8rem;
  opacity: 0.4;
  display: flex;
  &:hover {
    opacity: 0.8;
  }
`;

export const ListAPI = styled.div`
  position: absolute;
  top: 110%;
  left: -1%;
  display: ${({ show }) => (show ? "flex" : "none")};
  padding: 0 0.5rem;
  font-size: 0.9rem;
  flex-direction: column;
  width: 102%;
  max-height: 15rem;
  overflow: auto;
  background-color: white;
  border: 1px solid var(--color-border-default);
  border-top: none;
  box-shadow: var(--mediumShadow);
  border-radius: 0.3rem;
  z-index: 9;
`;

export const ItemAPI = styled.span`
  &:hover {
    background-color: var(--color-background-default);
  }
`;

export const Placeholder = styled.span`
  opacity: 0.4;
  font-size: 0.9rem;
`;

export const BtnInline = styled.button`
  width: 20%;
  height: 100%;
  text-align: center;
  display: block;
  cursor: pointer;
  z-index: 1;
`;
