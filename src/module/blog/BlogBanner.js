import React from "react";
import styled from "styled-components";
import Button from "../../component/button/Button";

const HomeBannerStyles = styled.div`
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
`;
const BlogBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="container">
        <div className="flex items-center justify-center p-10 mb-20 sm:p-5 gap-x-10 sm:block">
          <div className="w-1/2 h-[400px] sm:hidden">
            <img className="w-full h-full" src="/banner.png" alt="" />
          </div>
          <div className="w-1/2 text-white sm:w-full">
            <h2 className="mb-5 text-5xl font-semibold sm:w-full sm:text-xl">
              Monkey Blogging
            </h2>
            <p className="mb-5">
              Better landing for your startup ! We have created a new product
              that will help designers, developers and companies create websites
              for their startups quickly and easily.
            </p>
            <div className="max-w-[240px] sm:mx-auto">
              <Button to="/sign-up" type="button">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default BlogBanner;
