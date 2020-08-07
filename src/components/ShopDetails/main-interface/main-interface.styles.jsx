import styled from "styled-components";

export const MainInterfaceContainer = styled.div`
  width : 100%;
  display : flex ;   
`

export const Grid = styled.div`
  width : ${({w40}) => w40 ? "40%" : "60%"};
`