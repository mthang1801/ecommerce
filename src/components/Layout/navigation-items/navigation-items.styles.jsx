import styled from "styled-components";

export const Option = styled.span`
  width:  ${({ isMobile }) => (isMobile ? "100%" : "auto")};
  position: relative;
  padding: ${({ isMobile }) => (isMobile ? ".5rem" : "0")};   
  margin-bottom : ${({m1}) => m1 ? "1rem" : 0};
  & > a{
    display : flex ; 
    align-items : center;
  };
  & svg{
    font-size : 1.5em;  
    margin-right : .5rem;
  }
`;

export const RowInline = styled.div`
  width: 100%;
  display: flex;
  & > * {
    display: flex;
    width: 50%;    
  }
`;
