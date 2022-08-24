import React from "react";
import styled from "styled-components";
import { useController } from "react-hook-form";
const InputStyles = styled.div`
  width: 100%;
  position: relative;
  .input {
    width: 100%;
    padding: 20px;
    padding: ${(props) => (props.hasIcon ? "20px 60px 20px 20px" : "20px")};
    background-color: ${(props) => props.theme.grayLight};
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s linear;
    border: 2px solid transparent;
  }
  .input:focus {
    background-color: white;
    border-color: ${(props) => props.theme.accent};
  }
  .input::-webkit-input-placeholder {
    color: #b1b5c4;
  }
  .input::-moz-input-placeholder {
    color: #b1b5c4;
  }
  .input-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
    cursor: pointer;
  }
`;

const Input = ({
  name = "",
  type = "",
  children,
  control,
  className = "",
  ...props
}) => {
  const { field } = useController({ control, name, defaultValue: "" });
  return (
    <InputStyles hasIcon={children ? true : false}>
      <input
        className={`input ${className}`}
        type={type}
        name={name}
        id={name}
        {...props}
        {...field}
      />
      {children ? <div className="input-icon">{children}</div> : null}
    </InputStyles>
  );
};

export default Input;
