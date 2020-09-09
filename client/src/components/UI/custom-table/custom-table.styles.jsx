import styled from "styled-components";

export const Table = styled.table`
  width : 100%;
`
export const Thead = styled.div`
  font-weight : bold; 
  text-align :center;
`

export const Row = styled.div`
  display : flex; 
  width : 100%;  
  justify-content : flex-start;
  align-items: center;
  text-align:center;
`

export const Th = styled.span`
  width : ${({width}) => width ? `${width}%` : "auto"}
`
export const Td = styled.span`
  width : ${({width}) => width ? `${width}%` : "auto"};
  text-align : center;
`
export const Tbody = styled.div``