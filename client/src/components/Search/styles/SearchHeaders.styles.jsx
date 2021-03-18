import styled from "styled-components";

export const SearchForm = styled.form`
  display :flex;
  align-items: center; 
  border : 1px solid  var(--light-gray-3);
  padding:  ${({open}) => open ? " 0.5rem 1rem" : "0"};  ;
  font-size : 1rem;
  border-radius :  ${({open}) => open ? "1rem" : "50%"};  
  justify-content : center;
  align-items :center;
  width : ${({open}) => open ? "40vw" : "2.25rem"};  
  height:  ${({open}) => open ? "auto" : "2.25rem"};  
  max-width: 50vw;     
  @media screen and (min-width: 768px){
    width : 40vw; 
    height: auto;
    border-radius : 1rem;
    justify-content : space-between;
    padding: 0.5rem 1rem;    
  }
`

export const SearchInput = styled.input`
  border: none ; 
  outline : none ;   
  background-color : transparent;
  width : ${({open}) => open ?"calc(100% - 1rem)" : 0  };
  @media screen and (min-width: 768px){
    width : calc(100% - 1.5rem);     
  }  
`

export const SearchButton = styled.button`
  border: none ; 
  outline : none ; 
  background-color : transparent;
  cursor: pointer;  
  width : ${({open}) => open ? "1rem" : "100%"};
  @media screen and (min-width: 768px){
    width : 1.5rem;     
  }
`