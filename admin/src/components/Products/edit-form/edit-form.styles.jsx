import styled from "styled-components";

export const EditFormWrapper = styled.div`
  z-index: 500;
`

export const FormWrapper = styled.div`  
  padding : 1rem 2rem;
  position : fixed;
  display : flex ;     
  width : 80%;
  left : 10%;
  top : ${({show}) => show ? "5%" : "-100%"};  
  & > form{
    width : 500px;    
    max-width : 40% ;  
  };
  z-index: 500;
  border-radius : 10px;
  box-shadow : 0 3px 6px #ccc;
  background-color : white;
  transition : all 0.4s;
`

export const DisplayImage = styled.div`
  width :50%;
  display : flex ; 
  justify-content : center;
  align-items : center;
`
export const Image = styled.img`
  max-width : 300px;
  max-height : 300px;
  margin : 0 auto;
`