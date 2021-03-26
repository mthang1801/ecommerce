import styled from "styled-components";

export const AdminAddContainer = styled.div`
  width : 100%; 
  display : flex ; 
  justify-content : space-between;
  max-width : 1000px;
  margin : auto;
  & form{
    max-width : 700px;
  }
`

export const DisplayImage = styled.div`
  margin : auto;
  max-width : 300px; 
  max-heihgt : 300px;
  & > img{
    max-width : 100%; 
    min-height : 100%;
  }
`

