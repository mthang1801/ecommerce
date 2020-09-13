import styled from "styled-components";

export const CommentReviewsWrapper = styled.div`
  width : 100%; 
  height : 100%;  
`

export const TextArea = styled.textarea`
  width : 100%; 
  height:  5rem ; 
  padding : 0.75rem 1.25rem; 
  outline : none ; 
  border-radius: 5px; 
  border : 1.5px solid #198cf0; 
  &:focus {
    border :  1.5px solid #0e7fe1; 
  };
  resize : none ; 
  font-family : Roboto, sans serif;
`