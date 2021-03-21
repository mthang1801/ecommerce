import styled from "styled-components";

export const Wrapper = styled.div`
  width : 90vw; 
  max-width : 600px;
  margin: 2rem auto;
  display : flex;
  flex-direction : column;
  justify-content : center;
  align-items :center;
`

export const CardHolderName = styled.div`
  margin : 1rem auto;
  width : 21rem;
  & input{
    width : 100%;
    padding: 0.6rem ;
    outline : none ; 
    border : 1px solid #bdbdbd;
    font-size : 1rem;
    border-radius : 0.2em;    
    background-color: white;
    border: 1px solid #bdbdbd;
    &:focus{
      border : 2px solid var(--indigo-1);
    }
  }
`