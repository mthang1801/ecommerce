import styled from "styled-components";

export const ProductItemContainer = styled.div`
  margin : 1.25rem auto;
  display : flex;
  padding : 1rem;
  flex-direction : column;
  justify-content :center;
  align-items : center;
  width: 100%;
  height: 20rem; 
  border : 1px solid #ccc ;
  box-shadow : 1px 1px 2px rgba(0,0,0,0.15);
  border-radius : 5px;   
`

export const Button = styled.span`
  background-color : rgba(255,255,255,.8);  
  border :1px solid #eee;
  height : 3rem ; 
  width : 3rem ;
  display : flex ; 
  justify-content : center; 
  align-items : center;
  border-radius : 50%;
  cursor : pointer ; 
  &:hover{
    transform : rotate(-360deg);
    background-color : rgb(127,173,57);
    color : white;
  }
  transition : transform 1s;
`

export const ButtonsGroup = styled.div`
  position :absolute; 
  width : 100%;
  max-width : 12rem;
  left : 50%;
  bottom : 15%;    
  font-size : 1.5em;  
  display : flex ; 
  justify-content : space-around;  
  transform : translate(-50%,200%);
  transition : transform .25s;
`

export const ProductItemImageContainer = styled.div`
  width : 100%; 
  max-width : 10rem;
  height: 60%;
  position :relative;   
  overflow : hidden ; 
  cursor : pointer;
  &:hover ${ButtonsGroup}{   
    transform: translate(-50%, 0%);
  }
`

export const ProductDiscount = styled.div`
  position : absolute ; 
  display : flex ;
  justify-content : center;
  align-items : center;
  color : white ;
  width : 3rem;
  height :3rem ;
  background-color :#dd2222; 
  border-radius : 50%;
  top : 0;
  left : 0;
`

export const ProductItemImage = styled.img`
  width : 100%;
  height : 100%;
`
export const ProductItemText = styled.div`
  display : flex ; 
  flex-direction : column;
  text-align : center;
  margin : 1rem auto;
  font-size : 1.1em;
  line-height : 1.6;
  height : 30%;
  width : 100%;
 
`
export const ProductName = styled.p`
  width : 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;  
`
export const ProductPrice = styled.div`
  display : flex ; 
  flex-direction : column;
  justify-content : space-between;
  font-weight : bold ; 
  color : red;
`

export const ProductNewPrice = styled.span``
export const ProductOldPrice = styled.span`
  color : rgba(0,0,0,0.6);
  font-size : 1em;
  text-decoration : line-through;
`

