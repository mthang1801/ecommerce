import styled from "styled-components";

export const Form = styled.form`
  width : 600px ;
  max-width : 40%;
  margin :1rem 2rem ;
`
export const FormGroup = styled.div`
  width : 100%;
  height : 2.5rem;  
  display : flex ; 
  flex-direction: column ; 
  justify-conetent : center;
  align-items : center;
  &:not(:last-child){
    margin-bottom : 2rem;
  }
  position : relative;
`
export const Error = styled.div`
  margin : 2rem ;
  text-align : center;
  color : #dd2222; 
  font-weight : 600;
`
export const Success = styled.div`
  margin : 2rem ;
  text-align : center;
  color : #7fad39; 
  font-weight : 600;
`
export const FormInline = styled.div`
  display : flex ;   
  width : 100%;
  height: 2.5rem;
  
`

export const Title = styled.h2`
  text-align :center;
  font-size : 1.6em;
  text-transform : uppercase ; 
`

export const Label = styled.span`
background-color : white;
  position : absolute ; 
  top : -0.75rem;
  left : 1rem;
  z-index:  1 ;
`

export const Input = styled.input`
  border-radius: 5px;
  width : 100%;  
  height : 100%; 
  padding : 0 0.5rem;  
  font-size : 1.1em;
  border : none ; 
  outline : none ; 
  border :1px solid #424242;
  z-index :  0;
  &[type=file]{
    padding-top : 0.6rem;
  };
  flex-grow : 1 ;
`

export const Feedback = styled.span`
  font-size : 0.8em ; 
  font-style: italic;
  color : #dd2222 ;
  position : absolute ; 
  left : 0.15rem;
  top : 100%;
`

export const Required = styled.span`
  color : #dd2222;
`

export const Select = styled.select`  
  width: 100%;
  padding: .6rem 1rem;
  font-size: 1.1em;
  border: none;
  outline: none;
  background-color: white;
  border: 1px solid #424242;
  border-radius: 5px;
`

export const Option = styled.option``

export const BtnSubmit = styled.button`  
  display : inline-block ;
  outline : none ; 
  border: none ; 
  background-color : black ; 
  color : white ; 
  padding : 1rem 2rem;  
  border-radius : 5px;
  text-transform : uppercase ; 
  font-weight : bold; 
  cursor : pointer; 
  &:hover{
    background-color : white ; 
    color : black;
    border : 1px solid black;
  }
`

export const BtnInline = styled.button`    
  width : 20%;
  height: 100%;
  text-align: center;
  display : block;
  cursor: pointer ; 
  z-index:  1 ;
`
