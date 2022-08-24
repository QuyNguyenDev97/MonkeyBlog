import React from "react";
import styled from "styled-components";

const FieldStyles = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  align-items: flex-start;
  margin-bottom: 40px;
  :last-child {
    margin-bottom: 0;
  }
`;
const Field = ({ children, className = "" }) => {
  return <FieldStyles className={className}>{children}</FieldStyles>;
};

export default Field;
