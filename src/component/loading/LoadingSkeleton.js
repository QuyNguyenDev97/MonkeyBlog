import React from "react";

const LoadingSkeleton = () => {
  return (
    <div>
      <div className="w-[350px] p-5 bg-green-50 rounded-md">
        <div className="rounded-md h-[200px] animate-skeleton mb-5"></div>
        <div className="h-[30px] rounded-md animate-skeleton mb-5"></div>
        <div className="h-[50px] rounded-md animate-skeleton mb-5"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
