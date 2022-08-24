import React from "react";
import Button from "../../component/button/Button";

const HomeBanner = () => {
  return (
    <div className="container flex lg:flex-col justify-between !py-[80px] !mb-20">
      <div className="w-1/2 lg:w-full">
        <h1 className="mb-10 text-6xl font-extrabold sm:mb-5 sm:text-3xl">
          <span className="text-primary">Home</span> for tech writers and
          readers
        </h1>
        <h2 className="mb-10 text-xl sm:mb-5">
          The hassle-free blogging platform for engineers, thought-leaders, and
          the dev community!
        </h2>
        <h2 className="mb-4 text-xl font-bold">
          Blog on a custom domain, own your content and share your ideas with
          the world.
        </h2>
        <div className="flex items-center">
          <Button
            to="/sign-up"
            className="!w-[200px] sm:!w-[150px] sm:!text-md"
          >
            Get start
          </Button>
          <div className="flex-auto ml-2">
            <img
              alt="background strip"
              src="https://cdn.hashnode.com/res/hashnode/image/upload/v1643231557989/WC495Po6m2.png?auto=compress"
              className="w-full"
            />
          </div>
        </div>
      </div>
      <div className="w-1/2 lg:hidden">
        <div className="ml-auto w-[500px] h-[500px]">
          <img
            src="https://hashnode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1643230111752%2Fuv4w72h8g.png%3Fauto%3Dcompress&w=1920&q=75"
            alt=""
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
