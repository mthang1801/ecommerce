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
  position : absolute ; 
  top : -1rem;
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
  border : none ; 
  outline : none ; 
  border-bottom :1px solid #424242;
  margin : 0 auto 1.5rem auto;
`

export const Option = styled.option``