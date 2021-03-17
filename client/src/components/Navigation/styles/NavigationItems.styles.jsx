import styled from "styled-components";

export const Row = styled.div`
  line-height: 1.7;
  color : var(--color-text-default);
  margin-bottom : 1rem;
  & a{
    display : flex;
    align-items : center;    
    font-size :1rem;
    & > svg{
      transform : scale(1.5);
      margin-right: 0.5rem;
    }& > span:last-child{
      @media screen and (min-width: 992px){
        display : none ; 
      }
    }    
  }
  @media screen and (min-width:992px){
    margin-bottom : 0rem;
  }
`;

export const SmallView = styled.div`
  display : block;
  @media screen and (min-width: 768px){
    display : none ; 
  }
`
