import React from "react";
import styled from "styled-components";
import { useController } from "react-hook-form";
const TextareaStyles = styled.div`
  width: 100%;
  position: relative;
  .textarea {
    resize: none;
    width: 100%;
    padding: 20px;
    padding: ${(props) => (props.hasIcon ? "20px 60px 20px 20px" : "20px")};
    background-color: ${(props) => props.theme.grayLight};
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s linear;
    border: 2px solid transparent;
  }
  .textarea:focus {
    background-color: white;
    border-color: ${(props) => props.theme.accent};
  }
  .textarea::-webkit-input-placeholder {
    color: #b1b5c4;
  }
  .textarea::-moz-input-placeholder {
    color: #b1b5c4;
  }
`;

const Textarea = ({
  name = "",
  id = "",
  type = "text",
  children,
  control,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <TextareaStyles>
      <textarea
        className="p-5 textarea"
        name={name}
        id={name}
        {...props}
        {...field}
      />
    </TextareaStyles>
  );
};

export default Textarea;
