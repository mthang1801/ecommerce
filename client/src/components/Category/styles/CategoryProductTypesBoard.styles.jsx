import styled from "styled-components";

export const Wrapper = styled.div`  
  display : grid;
  grid-template-columns : repeat(3,1fr);
  width : 70vw; 
  height : 100%;
  min-height: 60vh;
  max-height: 80vh;    
  overflow : auto;
  background-color : white;
`