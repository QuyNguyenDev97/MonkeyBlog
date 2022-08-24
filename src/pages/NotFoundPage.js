import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Button from "../component/button/Button";

const NotFoundPageStyles = styled.div`
  padding: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  .content {
    font-size: 24px;
    font-weight: 400;
  }
`;
const NotFoundPage = () => {
  return (
    <NotFoundPageStyles>
      <div>
        <NavLink to="/">
          <img srcSet="/logo.png 2x" alt="monkey-blogging"></img>
        </NavLink>
      </div>
      <div className="content">
        <h1>Oops! Page not found</h1>
      </div>
      <Button
        style={{
          maxWidth: "400px",
        }}
        type="button"
      >
        <NavLink to="/">Back to Homepage</NavLink>
      </Button>
    </NotFoundPageStyles>
  );
};

export default NotFoundPage;
