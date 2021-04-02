import styled, {keyframes} from "styled-components";

export const CommentReviewsItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0.5rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Avatar = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 1rem;
`;
export const CommentText = styled.div`
  flex: 1;
  font-size: 0.9em;
`;
export const ButtonLink = styled.span`
  font-size: 0.85em;
  cursor: pointer;
  color: #3949ab;
  margin: 0 5px;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    color: #1a237e;
  }
  position: relative;
  height: 1.5rem;
`;

export const ReadMore = styled.span`
  cursor: poiter;
  font-size: 0.85em;
  cursor: pointer;
  color: #3949ab;
  margin: 0 5px;
  &:hover {
    color: #1a237e;
  }
`;
export const ResponseComment = styled.form`
  width : 100%; 
  display : flex; 
  flex-direction : column ;  
  align-items : flex-start; 
`
const textAreaAnimation = keyframes`
  0%{
    width : 0 ; 
    padding : 0 ;
    height : 0 ; 
    opacity : 0; 
  }
  100%{
    height: 5rem; 
    opacity : 1;
    padding: 0.75rem 1.25rem;
    width: 100%;
  }
`
export const TextArea = styled.textarea`
  height: 5rem; 
  float : right;  
  font-size: 0.9em; 
  border: 1.5px solid #198cf0;
  outline: none;
  border-radius: 5px;
  padding: 0.75rem 1.25rem;
  width : 100%; 
  &:focus {
    border-color: #004a8a;
  }
  resize: none;  
  &::after{
    content : "", 
    display : table,  
    clear : both;
  };
  animation : ${textAreaAnimation} ${({timeShowResponse}) => timeShowResponse ? `${timeShowResponse}ms` : "700ms"}; 
`;

export const ResponseWrapper = styled.div`
  width : 100%; 
  display : flex;  
  flex-direction : column; 
  & > *{
    margin : 1rem 0;
  }
`