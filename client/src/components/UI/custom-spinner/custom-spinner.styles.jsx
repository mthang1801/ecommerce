import styled from "styled-components"
export const SpinnerOverlay = styled.div`
  height: ${({smallScreen}) => smallScreen ? "60vh" : "100%"};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SpinnerContainer = styled.div`
  display: inline-block;
  width: 75px;
  height: 75px;
  border: 3px solid #ccc;
  border-radius: 50%;
  border-top-color: rgba(75,75,75,0.8);
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;