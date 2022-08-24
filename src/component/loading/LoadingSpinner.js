import React from "react";
import styled from "styled-components";
const LoadingSpinnerStyles = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border: ${(props) => props.borderSize} solid white;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-radius: 100rem;
  display: inline-block;
  animation: spinner 1s infinite linear;
  @keyframes spinner {
    100% {
      transform: rotate(360deg);
    }
  }
`;
const LoadingSpinner = ({
  size = "40px",
  borderSize = "5px",
  className = "",
}) => {
  return (
    <LoadingSpinnerStyles
      className={className}
      size={size}
      borderSize={borderSize}
    ></LoadingSpinnerStyles>
  );
};

export default LoadingSpinner;
