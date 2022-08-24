import React from "react";
import styled from "styled-components";

const AuthenPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  background-image: url("./bgform2.png");
  .form-wrapper {
    z-index: 99;
    padding: 40px;
    max-width: 700px;
    background-color: #e7f7e8;
    margin: 0 auto;
    border-radius: 12px;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: 800;
    font-size: 24px;
    line-height: 150%;
    margin-bottom: 28px;
  }
  .description {
    font-weight: 300;
    font-size: 16px;
    line-height: 150%;
    text-align: center;
    margin-bottom: 24px;
  }
  .form {
    margin: 0 auto;
  }
  .have-account {
    margin-bottom: 20px;
    a {
      display: inline-block;
      font-weight: 500;
      color: ${(props) => props.theme.primary};
    }
  }
`;
const AuthenPage = ({ children, title = "", description = "" }) => {
  return (
    <AuthenPageStyles className="sm:!p-5">
      <div className="overlay"></div>
      <div className="form-wrapper">
        <div className="container">
          <h2 className="heading sm:!text-xl">{title}</h2>
          <p className="description sm:!text-base sm:hidden">{description}</p>
        </div>
        {children}
      </div>
    </AuthenPageStyles>
  );
};

export default AuthenPage;
