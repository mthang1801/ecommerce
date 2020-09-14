import styled from "styled-components"

export const CommentReviewsItemWrapper = styled.div`
  width : 100%; 
  height: 100%; 
  margin: 0.5rem 0;
  overflow : hidden ;
  text-overflow : ellipsis;   
`
export const Row = styled.div`
width : 100%;
display : flex; 
justify-content : space-between;  
`

export const Image = styled.img`
  width : 60px;
  height: 60px;
  margin-right: 1rem;
`
export const CommentText = styled.div`
  flex : 1 ; 
  font-size : 0.9em;
`
export const ButtonLink = styled.span`
  font-size : 0.85em; 
  cursor: pointer;
  color : #3949ab;
  margin : 0 5px;
  &:first-child{
    margin-left: 0; 
    
  }
  &:last-child{
    margin-right: 0;
  }
  &:hover{
    color : #1a237e;
  }
`

export const ReadMore = styled.span`
  cursor : poiter ; 
  font-size : 0.85em; 
  cursor: pointer;
  color : #3949ab;
  margin : 0 5px;
  &:hover{
    color : #1a237e;
  }
`