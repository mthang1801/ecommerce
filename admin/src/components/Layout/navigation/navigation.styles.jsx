import styled  from "styled-components";
import {darken} from "polished";
export const NavigationContainer = styled.main`  
  width : 250px;
  height : 100%;
  min-height: 95vh;
  background-color : #130f40;
  color : ${darken("0.2", "white")};
  padding : 1rem ;
`