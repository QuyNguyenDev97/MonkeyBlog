import React from "react";
import useChangeDate from "../../hook/useChangeDate";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import Postdecription from "./Postdecription";
import ToggleBookMark from "../../component/icon/ToggleBookMark";
import { defaultAvatar } from "../../utils/constants";

const PostNewestItem = ({ data = {} }) => {
  const { changeDate } = useChangeDate();
  return (
    <div className="flex items-center pb-5 pr-5 border-b border-gray-300 sm:border-none sm:rounded-lg sm:gap-y-5 sm:p-5 sm:flex-col gap-x-4">
      <div className="w-[200px] sm:w-full sm:h-[200px] h-[180px] rounded-xl flex-shrink-0">
        <PostImage
          className="w-full h-full rounded-xl"
          url={data?.image}
          alt=""
        ></PostImage>
      </div>
      <div className="w-full">
        <div className="flex w-full mb-5">
          <PostCategory to={`/category/${data?.category?.slug}`}>
            {data?.category?.name}
          </PostCategory>
          <ToggleBookMark
            className="block ml-auto text-xl"
            title={data?.title}
          ></ToggleBookMark>
        </div>
        <PostTitle
          lineCap="!line-clamp-1 sm:!line-clamp-2 "
          className="mb-3 sm:mb-5 line-clamp-2 sm:h-[54px]"
          to={`/blog/${data.slug}`}
        >
          {data?.title}
        </PostTitle>
        <Postdecription className="mb-3 sm:mb-5 line-clamp-1 sm:line-clamp-3 sm:h-[72px]">
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
    </div>
  );
};

export default PostNewestItem;
