import {createGlobalStyle} from "styled-components"

export default createGlobalStyle`
  *{
    padding : 0; 
    margin : 0 ; 
    box-sizing: border-box; 
  }
  body{    
    font-size : 16px ; 
    line-height : 1.6;    
    @media screen and (max-width: 992px){
      font-size : 14px;
    }
    @media screen and (max-width : 768px){
      font-size : 12px;
    }
    @media screen and (max-width: 500px){
      font-size : 10px;
    }
`;
