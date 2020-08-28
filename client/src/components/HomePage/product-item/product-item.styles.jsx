import styled from "styled-components";
import {Link} from "react-router-dom";
export const Backdrop = styled.div`
  display : none ; 
  position : absolute; 
  top : 0; 
  left : 0 ; 
  right : 0 ; 
  bottom : 0 ;
  background-color : rgba(0,0,0,0.2);
  z-index:  1;
`

export const ProductBtns = styled.div`
  position : absolute;   
  top : 50%;   
  transform : translateY(-50%);
  width : 100%; 
  display : flex ;   
  justify-content : center;
  z-index : 2 ;
  visibility : hidden; 
  transform : translateY(100%);
  transition : all 0.3s;
`

export const ProductItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;  
  width: 100%;
  height: 31.5%;
  overflow:  hidden ; 
  position : relative; 
  padding : 0.5rem 1rem;   
  cursor : pointer ;
  border-radius : 7px;
  &:hover{    
    background-color: #eee;
    ${Backdrop}{
      display: block; 
      backdrop-filter: blur(2px);
    };    
    ${ProductBtns}{
      visibility : visible; 
      transform : translateY(0);
    }
  };
  z-index: 0;
`;



export const ProductImageContainer = styled.div`
  margin: auto;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: -1;
`;
export const ProductImage = styled.img`
  width: 8rem;
  height: 8rem;
  z-index: -1;
`;
export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  height : 100%;
  width: 60%;
  margin-left : 12px;
  text-align: left;  
  justify-content : center;
  line-height : 2; 
`;
export const ProductName = styled.span`
  width: 80%;
  font-weight: bold;
  font-size: 1.2em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const ProductDiscountPrice = styled.span`
  color: red;
  font-weight: bold;
  font-size: 1.1em;
  position : relative; 
`;

export const OriginalPrice = styled.span`
  font-size: ${({ discount }) => (discount ? "1em" : "1.1em")};
  text-decoration: ${({ discount }) => (discount ? "line-through" : "none")};
  color: ${({ discount }) => (discount ? "#ccc" : "000")};
  font-weight: bold;
`;

export const DiscountBrand = styled.div`
  position: absolute;
  top: 15%;
  right: 5%;
  width: 25%;
  height: 2rem;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  background-color: #dd2222;
  color: white;
  font-weight: bold;
  z-index: -1; 
  &:before{
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    border: 10px solid;
    top: 0;
    left: 0;
    transform: translateX(-50%);
    border: 1rem solid;
    border-color: #dd2222 transparent #dd2222 transparent;
  };
  &:after{
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    border: 10px solid;
    top: 0;
    right: 0;
    transform: translateX(50%);
    border: 1rem solid;
    border-color: #dd2222 transparent #dd2222 transparent;
  }
`




export const Button = styled(Link)`
  color : inherit ; 
  background-color white;
  cursor : pointer;
  border-radius : 50%; 
  padding : 1rem ;
  display : flex ; 
  justify-content : center;
  align-items :center;
  font-size : 1.4em;
  &:hover{
    background-color : #7fad39;
    color : white ;
  };
  box-shadow : 0 2px 4px rgba(0,0,0,0.15);
  margin: 0 1rem;
`