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
const PostItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .post {
    &-image {
      height: 202px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 16px;
    }
    &-title {
      margin-bottom: 8px;
    }
  }
`;

const PostItem = ({ data }) => {
  const { changeDate } = useChangeDate();
  if (!data) return;
  return (
    <PostItemStyles className="px-3 py-5 rounded-md shadow-lg sm:p-5 bg-green-50">
      <PostImage
        className="border border-gray-200"
        url={data?.image}
        alt="none"
        to={data?.slug}
      ></PostImage>
      <div className="flex w-full">
        <PostCategory className="" to={`/category/${data?.category?.slug}`}>
          {data?.category?.name}
        </PostCategory>
        <ToggleBookMark
          className="block ml-auto text-xl"
          title={data?.title}
        ></ToggleBookMark>
      </div>
      <PostTitle
        to={`/blog/${data?.slug}`}
        lineCap="!line-clamp-2"
        className="h-[60px]"
      >
        {data?.title}
      </PostTitle>
      <Postdecription className="mb-5 line-clamp-2 h-[50px]">
        {data?.description ||
          " Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid voluptate, rerum fugit architecto aut molestiae voluptatem maxime necessitatibus unde provident cum minus? Repellendus, illo? Autem rerum aut at numquam explicabo."}
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
    </PostItemStyles>
  );
};

export default PostItem;
