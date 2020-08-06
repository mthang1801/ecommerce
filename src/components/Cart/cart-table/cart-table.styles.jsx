import styled from "styled-components";
import {darken} from "polished";
export const CartTableContainer = styled.div`  
  width : 100%;
  display : flex ; 
  flex-direction : column;
  margin : 2rem auto;  
`

export const TableHeader = styled.div`
  width : 100%;
  display : flex ;  
  font-size : 1.1em;
  font-weight : bold ; 
  padding-bottom :2rem;
  border-bottom : 1px solid #ccc;
  margin: 2rem auto;
`
export const TableBody = styled.div`
  width : 100%;
  display : flex ; 
  flex-direction : column;
  padding-bottom : 1rem;
  border-bottom : 1px solid #ccc;
`

export const TableFooter = styled.div`  
  width : 100%;
  display : flex ; 
  font-size : 1.2em;
`

export const Row = styled.div`
  width :${({product}) => product ? "40%" : "12%"};      
  display  : flex ; 
  align-items : center; 
  justify-content : ${({product}) => product ? "flex-start" : "center"};
  padding : 1rem ;
  ${TableHeader} &{
    justify-content : center;
  };
  color : ${({totalPrice}) => totalPrice ? "blue" : "inherit"};
  
`


export const TableRow = styled.div`
  width : 100%;
  display : flex;   
  &:nth-child(odd){
    background-color : #f7faff;
    cursor : pointer;
    &:hover{
      background-color : ${darken("0.05","#f7faff")};
    }
  }
  &:nth-child(even){
    background-color : #fff5f2;
    cursor : pointer;
    &:hover{
      background-color : ${darken("0.05","#fff5f2")};
    }
  }
` 
export const  Image = styled.img`
  width : 10rem;
  height :  10rem ;
` 
export const  Name = styled.div`
  width : ; 
  font-weight : bold ; 
  margin-left : 1.5rem;
  white-space : wrap;  
  overflow : hidden ;
  text-overflow : ellipsis;
` 

export const BtnRemove = styled.span`
  font-size : 2em;
  font-weight : bold ;
  cursor : pointer;
  &:hover{
    color : red;
  }
`