import React from "react";
import styled from "styled-components";
import LoadingSpinner from "../loading/LoadingSpinner";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const ButtonStyles = styled.button`
  padding: 0 20px;
  line-height: 1;
  color: #fff;
  background: linear-gradient(107.61deg, #00a7b4 15.59%, #a4d96c 87.25%);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  width: 100%;
  font-size: 18px;
  height: ${(props) => props.height || "66px"};
  :disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
const Button = ({
  type = "button",
  onClick = () => {},
  children = "",
  isLoading,
  to,
  className = "",
  hasBorder = "",
  ...props
}) => {
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  if (to !== undefined && typeof to === "string") {
    return (
      <NavLink className={`block  ${hasBorder}`} to={to}>
        <ButtonStyles type={type} className={className} {...props}>
          {child}
        </ButtonStyles>
      </NavLink>
    );
  }
  return (
    <ButtonStyles
      type={type}
      onClick={onClick}
      className={className}
      {...props}
    >
      {child}
    </ButtonStyles>
  );
};
Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};
export default Button;
