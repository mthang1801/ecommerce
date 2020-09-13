import styled from "styled-components"

export const CommentReviewsItemWrapper = styled.div`
  width : 100%; 
  height: 4rem;  
`

export const Row = styled.div`
  width: 100%;
  display : flex ; 
  justify-content : space-between ; 
`
export const Grid = styled.div`
  width : ${({width}) => `${width}%`};
`

export const Image = styled.img`
  width : 100%;
`
