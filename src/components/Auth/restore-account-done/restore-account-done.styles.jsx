import styled, { keyframes } from "styled-components";
import CustomButton from "../../UI/custom-button/custom-button.component"

export const ForgotDoneContainer = styled.form`
  display : flex ; 
  justify-content : center;
  align-items : center;
  flex-direction : column ;
  width: 500px;
  padding: 3rem 4rem;
  text-align: center;
  border: 1px solid #ccc;
  margin: 2rem auto;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  @media screen and (max-width: 500px) {
    width: 90%;
    padding: 1rem 1.5rem;
  }
`;

const checkAnimation = keyframes`
  0%{
    opacity : 0 ;
  },
  100%{
    opacity : 1;
  }
`;
export const CheckIconContainer = styled.div`
  font-size: 3em;
  color: green;
  animation-name: ${checkAnimation};
  animation-duration: .7s;
  animation-timing-function: linear;
`;

const textAnimation = keyframes`
  0% {
    opacity: 0;
  }
  ,
  100% {
    opacity: 1;
  }
`;

export const TextContent = styled.div`
  font-weight: 600;
  font-size: 1.1em;
  margin: 1.5rem auto;
  animation-name: ${textAnimation};
  animation-duration: .7s;
  animation-delay: .7s;
  animation-fill-mode: backwards;
  animation-timing-function: linear;
`;

const btnAnimation = keyframes`
  0% {
    opacity: 0;
  }
  ,
  100% {
    opacity: 1;
  }
`;

export const ButtonDone = styled(CustomButton)`
  background-color : green ; 
  border: none ; 
  outline : none ; 
  color : white ; 
  padding : .75rem 1rem;
  &:hover{
    background-color : #006600;
    color : white;
    border: none ; 
    outline : none ;
  }
  animation-name: ${btnAnimation};
  animation-duration: .7s;
  animation-delay: 1.5s;
  animation-fill-mode: backwards;
  animation-timing-function: linear;
`