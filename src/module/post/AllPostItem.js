import React from "react";
import ToggleBookMark from "../../component/icon/ToggleBookMark";
import useChangeDate from "../../hook/useChangeDate";
import { defaultAvatar } from "../../utils/constants";
import PostCategory from "./PostCategory";
import Postdecription from "./Postdecription";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const AllPostItem = ({ data }) => {
  const { changeDate } = useChangeDate();
  return (
    <div className="flex justify-between px-5 pt-5 pb-10 border-b border-gray-200 rounded-md bg-green-50">
      <div className="w-1/2 sm:w-full">
        <div className="flex">
          <PostCategory
            className="mb-5"
            to={`/category/${data?.category?.slug}`}
          >
            {data?.category?.name}
          </PostCategory>
          <ToggleBookMark
            className="ml-auto text-xl"
            title={data?.title}
          ></ToggleBookMark>
        </div>
        <PostTitle
          lineCap="line-clamp-1"
          className="mb-5"
          to={`/blog/${data?.slug}`}
        >
          {data?.title}
        </PostTitle>
        <Postdecription className="mb-5 line-clamp-3 h-[74px]">
          {data?.description}
        </Postdecription>
        <div className="flex items-center gap-x-5">
          <div className="w-10 h-10 border border-gray-200 rounded-full">
            <img
              className="w-full h-full rounded-full"
              src={data?.user?.avatar || defaultAvatar}
              alt="avatar"
            />
          </div>
          <div className="">
            <PostMeta
              author={data?.user?.fullname}
              date={changeDate(data?.createdAt?.seconds)}
            ></PostMeta>
          </div>
        </div>
      </div>
      <div className="flex sm:hidden">
        <div className="rounded-lg w-[400px] h-[240px] border border-gray-300">
          <img
            className="w-full h-full rounded-lg"
            src={data?.image}
            alt="none"
          />
        </div>
      </div>
    </div>
  );
};

export default AllPostItem;
