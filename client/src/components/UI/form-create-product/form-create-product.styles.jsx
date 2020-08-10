import styled from "styled-components";

export const Form = styled.form`
  width : 100%; 
  max-width : 600px;
  margin : 1rem auto;
`
export const FormGroup = styled.div`
  display : flex ; 
  flex-direction: column ; 
  &:not(:last-child){
    margin-bottom : 2rem;
  }
  position : relative;
`

export const FormInline = styled.div`
  display : flex ;   
  justify-content : space-between;  
  & ${FormGroup} {
    width : 48%;
  }
`

export const Label = styled.span`
  padding : 0.2rem;
  background-color : white ;
  position : absolute ; 
  top : -1rem;
  left : 1rem;
  z-index: 1;
`

export const Input = styled.input`
  width : 100%;
  height : 2.5rem; 
  padding : 1rem;
  font-size : 1.1em;
  border : none ; 
  outline : none ; 
  border-bottom :1px solid #424242;
 
`


export const Required = styled.span`
  color : #dd2222;
`

export const Select = styled.select`  
  width : 100%; 
  padding : .7rem 1rem;
  font-size : 1.1em;
  border : 1px solid #ccc ; 
  outline : none ; 
  background-color : transparent ; 
  margin : 0 auto 1.5rem auto;
  z-index : 0;
`

export const Option = styled.option``

export const BtnRemove = styled.span`
  position: absolute;
  right: 3%;
  top: 50%;
  font-size: 2em;
  font-weight: bold;
  color: blue;
  cursor : pointer;
  transform: translateY(-50%);
  &:hover{
    color : #dd2222;
  }
`