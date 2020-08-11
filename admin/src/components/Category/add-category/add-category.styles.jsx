import styled from "styled-components";

export const AddCategoryContainer = styled.div`
  width : 100%; 
  display : flex ; 
  justify-content : space-between;
`

export const DisplayImage = styled.div`
  margin : auto;
  max-width : 25vw; 
  max-heihgt : 25vh;
  & > img{
    max-width : 100%; 
    min-height : 100%;
  }
`

