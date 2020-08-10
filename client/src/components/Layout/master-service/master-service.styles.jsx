import styled from "styled-components";

export const MasterServiceContainer = styled.div`  
  width : 100%;
  display : flex ;
  align-items : center;
  margin :auto;
  justify-content :center;
`
export const IconService = styled.div`
  width : 45px; 
  height : 45px;
  background-color : #eee;
  border-radius : 50%;
  display : flex ; 
  justify-content : center;
  align-items : center;
  cursor : pointer;
  &:hover{
    background-color : #ccc;
  }
`
export const DetailService = styled.div`
  padding-left : .5rem; 
  display : flex ; 
  flex-direction : column;
  justify-content : space-between;  
`
export const PhoneNumber = styled.div`
  font-weight: bold;
`
export const SubDetail = styled.div``
