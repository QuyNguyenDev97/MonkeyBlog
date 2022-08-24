import React from "react";
import styled from "styled-components";
import ToggleBookMark from "../../component/icon/ToggleBookMark";
import useChangeDate from "../../hook/useChangeDate";
import { defaultAvatar } from "../../utils/constants";
import PostCategory from "./PostCategory";
import Postdecription from "./Postdecription";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostNewestLargeStyles = styled.div`
  padding: 20px;
  border-radius: 12px;
  height: 700px;
  min-width: 550px;
  .post {
    &-image {
      display: block;
      margin-bottom: 16px;
      height: 433px;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 16px;
    }
    &-title {
      margin-bottom: 12px;
    }
  }
`;

const PostNewestLarge = ({ data = {} }) => {
  const { changeDate } = useChangeDate();
  if (!data.image)
    return (
      <PostNewestLargeStyles className="bg-green-50">
        <div className="w-full h-full rounded-md animate-skeleton"></div>
      </PostNewestLargeStyles>
    );
  return (
    <PostNewestLargeStyles className="shadow-lg bg-green-50">
      <PostImage url={data?.image} alt=""></PostImage>
      <div className="flex">
        <PostCategory className="mb-5" to={`/category/${data?.category?.slug}`}>
          {data?.category?.name}
        </PostCategory>
        <ToggleBookMark
          className="ml-auto text-xl"
          title={data?.title}
        ></ToggleBookMark>
      </div>
      <PostTitle size="large" to={`/blog/${data.slug}`} lineCap="!line-clamp-2">
        {data?.title}
      </PostTitle>
      <Postdecription className="mb-5 line-clamp-1">
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
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
