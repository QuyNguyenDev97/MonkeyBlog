import React from "react";
import styled from "styled-components";

const LabelStyles = styled.label`
  color: #1f2937;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
`;
const Label = ({ className = "", htmlFor = "", children, ...props }) => {
  return (
    <LabelStyles className={className} htmlFor={htmlFor} {...props}>
      {children}
    </LabelStyles>
  );
};

export default Label;
