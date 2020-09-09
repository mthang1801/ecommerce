import styled  from "styled-components";

export const OrderedListPreviewContainer = styled.div`
  width : 100%; 
  border : 1px solid #ccc ; 
  padding : 1rem 2rem;
  border-radius : 10px ; 
  margin-bottom : 2rem;
`

export const Row = styled.div`
  display : flex ; 
  justify-content : space-between ;
  font-size : 1em; 
  margin-bottom : .5rem;
`

export const LeftMainContent = styled.div`
  flex  : 1 ;
`

export const RightMainContent = styled.div`

`

export const MoreOrderedDetails = styled.span`
  color : #1a237e;
  display : flex ; 
  align-items : center;  
  font-size : .95em; 
  cursor : pointer  ;
  &:hover { 
    color : #3949ab;
  }
`
export const OrderedItemDetails = styled.div`
  display : flex  ;
  flex-direction: column;    
  display : block;
`

export const ItemImage = styled.img`
  width: 80px;
  height: 80px;  
`