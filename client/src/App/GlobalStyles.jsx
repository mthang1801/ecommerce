import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root{
  --indigo-1 : #3949ab;
  --indigo-2 : #283593;
  --indigo-3 : #1a237e;  
  --blue-1 : #1e88e5;
  --blue-2 : #1565c0;
  --blue-3 : #0d47a1;
  --light-blue-1 : #039be5;
  --light-blue-2 : #0277bd;
  --light-blue-3 : #01579b;
  --cyan-1 : #00acc1;
  --cyan-2 : #00838f;
  --cyan-3 : #006064;
  --green-1 : #43a047;
  --green-2 : #2e7d32;
  --green-3: #1b5e20;
  --red-1: #e53935 ;   
  --red-2: #c62828 ;   
  --red-3: #b71c1c ;   
  --light-gray-1: #f5f5f5 ;
  --light-gray-2: #e0e0e0 ;
  --light-gray-3: #9e9e9e  ;
  --gray-1 : #616161;
  --gray-2 : #424242;
  --gray-3 : #212121;

  --color-background-default: #f0f0f0;
  --color-background-default-secondary : #b4b4b4;
  --color-text-default : #000;  

  --color-background-dark : #2c2c2c;
  --color-background-dark-secondary : #0e0d0d; 
  --color-text-dark : #fff;
  --color-hover-dark : var(--gray-dark);

  --color-card-dark : #2d2f31;    
  --color-card-default : #fff;
  --color-hover-default : var(--light);
  
  --color-border-dark : #0e0f10; 
  --color-border-default : #e8e8e8;
  --fontFamily-sans: Montserrat, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --fontFamily-serif: "Merriweather", "Georgia", Cambria, "Times New Roman",
    Times, serif;
  --fontFamily: system-ui,-apple-system,BlinkMacSystemFont,Roboto,Ubuntu,"Helvetica Neue",sans-serif;
  --gradient: linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0));  
  --lightShadow: 0px 1px 1.5px 1.5px rgba(0, 0, 0, 0.1);
  --mediumShadow : 2px 3px 3px 1px rgba(0,0,0,0.2);
  --darkShadow: 4px 10px 5px 1px rgba(0, 0, 0, 0.3);
  --mainTransition : all 0.15s; 
  }
  *{
    padding : 0; 
    margin : 0 ; 
    box-sizing: border-box; 
  }
  html{
    line-height: var(--lineHeight-normal);
    font-size: var(--fontSize-root);    
    -webkit-text-size-adjust: 100%; /* 2 */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    font-family: var(--fontFamily);            
    font-weight: 400 !important;
    font-size: 16px;    
    width : 100vw;
    overflow-x : hidden;
  }    
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
   
  a{
    text-decoration: none;
  }
    
  .slick-next:before, .slick-prev:before{
    font-size : 30px;
  }
    
  .pagination{
    display : flex ; 
    justify-content : center;
    align-items : center; 
    list-style: none ;
  }
  
  .pagination-item{
    margin : 0 2px;
  }
  .pagination-link, .pagination-margin, .pagination-break{
    outline : none ;
    border: none ; 
    padding : 0.4rem 0.8rem;   
    font-weight: bold ;  
    cursor : pointer; 
    color : #192a56;
  }
  
  .pagination-margin{
    vertical-align: middle;
    font-size : 1.1em;
  }
  
  .pagination-link:hover, .pagination-margin:hover , .pagination-break:hover{  
    color :#3498db ; 
  }
  
  .active-link{
    padding : 0.4rem 0.8rem ;  
    border-radius: 3px;
    color : white;
    background-color : #192a56;
  }
  [role=button]{
    outline:none;
  }
`;
