import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import React from "react";
import Postdecription from "./Postdecription";
import ToggleBookMark from "../../component/icon/ToggleBookMark";
import { defaultAvatar } from "../../utils/constants";
import useChangeDate from "../../hook/useChangeDate";

const PostFeatureItem = ({ data }) => {
  const { changeDate } = useChangeDate();
  return (
    <div className="p-5 rounded-lg shadow-lg bg-green-50">
      <PostImage
        className="h-[200px] sm:w-full mx-auto w-[320px] mb-5 rounded-lg border border-gray-200"
        url={data?.image}
        alt="unsplash"
      ></PostImage>
      <div className="post-content">
        <div className="flex">
          <PostCategory
            to={`/category/${data?.category?.slug}`}
            className="mb-5"
          >
            {data?.category?.name}
          </PostCategory>
          <ToggleBookMark
            className="ml-auto text-xl"
            title={data?.title}
          ></ToggleBookMark>
        </div>
        <div>
          <PostTitle
            to={data?.slug}
            className="h-[54px] mb-5"
            size="medium"
            lineCap="!line-clamp-2"
          >
            {data?.title}
          </PostTitle>
          <Postdecription className="mb-5 line-clamp-3 h-[72px]">
            {data?.description ||
              "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ea itaque, atque ipsum dignissimos eos ipsam reiciendis dolores dolor, adipisci, voluptatum possimus odit ad suscipit nulla delectus eligendi sed fuga."}
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
    </div>
  );
};

export default PostFeatureItem;
