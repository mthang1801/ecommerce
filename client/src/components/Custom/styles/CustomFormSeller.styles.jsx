import styled from "styled-components";
import NumberFormat from "react-number-format";
export const Form = styled.form`
  width: 100%;
  max-width: 600px;
  margin: 2rem auto;
`;
export const FormGroup = styled.div`
  display: flex;
  margin : 2rem 0;
  position: relative;
`;

export const FormInline = styled.div`
  display: flex;
  justify-content: space-between;
  margin : 1rem 0;
  & ${FormGroup} {
    width: 48%;
    margin : 0;
  }
`;

export const Label = styled.label`
  position: absolute;
  font-size: 0.8em;
  color: #002984;
  top: -0.8rem;
  background-color: white;
  padding: 0px 3px;
  left: 0.4rem;
  z-index: 1;
`;

export const Input = styled.input`
  width: 100%;
  height: 2.5rem;
  padding: 1rem;
  font-size: 1.1em;
  outline: none;
  border: 1px solid #424242 !important;
  border-radius: 0.3rem;
  &:focus {
    border: 2px solid #002984 !important;
  }
  z-index: 0;
  &::placeholder{
    font-size : 0.9rem;
  }
`;

export const CustomNumberFormat = styled(NumberFormat)` 
  width: 100%;
  height: 2.5rem;
  padding: 1rem;
  font-size: 1.1em;
  outline: none;
  border: 1px solid #424242 !important;
  border-radius: 0.3rem;
  &:focus {
    border: 2px solid #002984 !important;
  }
`;

export const Required = styled.span`
  color: #dd2222;
`;

export const Select = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 1.1em;
  line-height: 1.7;
  outline: none;
  border: 1px solid #424242;
  border-radius: 0.3rem;  
  background-color: transparent;
  z-index: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  position: relative;
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
  left: 0;
  display: ${({ show }) => (show ? "flex" : "none")};
  padding: 0 0.5rem;
  font-size: 0.9rem;
  flex-direction: column;
  width: 100%;
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

export const Option = styled.option``;

export const Editable = styled.span`
  color: rgba(0, 0, 0, 0.75);
  cursor: pointer;
  font-size: 1.4em;
  margin-top: 0.4rem;
  &:hover {
    color: black;
  }
`;

export const ImageInput = styled.label`
  font-size: 1rem;
  cursor: pointer;
  color: var(--indigo-1);
  & svg {
    font-size: 1.6rem;
  }
  input {
    display: none;
  }
`;


export const FormGroupAnimation = styled.div`
display : flex ;   
  &:not(:last-child){
    margin-bottom : 2rem;
  }
  position : relative;
  visibility : ${({show}) => show ? "visible" : "hidden"};
  width : ${({show}) => show ? "100%" : "50%"};
  height : ${({show}) => show ? "auto" : 0};
  transition : ${({show}) => show ? "all 0.25s" : "none"};
`

export const PlainText= styled.span`
  width : 100%; 
  overflow: hidden ;
  white-space : nowrap; 
  text-overflow : ellipsis ;
  position : absolute;   
  left : 4px;
  font-style: italic;
  color : #404040;
  top : 100%;
  font-size : 0.8em ;
`
