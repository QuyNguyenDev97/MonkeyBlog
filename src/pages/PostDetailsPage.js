import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { db } from "../firebase-data/firebaseConfig";
import useChangeDate from "../hook/useChangeDate";
import Layout from "../layout/Layout";
import PostCategory from "../module/post/PostCategory";
import PostImage from "../module/post/PostImage";
import parse from "html-react-parser";
import AuthorBox from "../component/author/AuthorBox";
import PostRelated from "../module/post/PostRelated";
import DetailAuthorBox from "../component/author/DetailAuthorBox";
const PostDetailsPageStyles = styled.div`
  padding-top: 80px;
  padding-bottom: 100px;
  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 0 0 20px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 900px;
      margin: 80px auto;
    }
  }
  .author {
    width: 700px;
    margin: 40px auto 80px auto;
    display: flex;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    &-image {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      border-radius: inherit;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
  }
  @media screen and (max-width: 1023.98px) {
    padding-bottom: 40px;
    .post {
      &-header {
        flex-direction: column;
      }
      &-feature {
        height: auto;
      }
      &-heading {
        font-size: 26px;
      }
      &-content {
        margin: 40px 0;
      }
    }
    .author {
      flex-direction: column;
      &-image {
        width: 100%;
        height: auto;
      }
    }
  }
`;

const PostDetailsPage = () => {
  const { slug } = useParams();
  const [postData, setPostData] = useState({});
  console.log("PostDetailsPage ~ postData", postData);
  useEffect(() => {
    async function getData() {
      if (!slug) return;
      const colRef = collection(db, "posts");
      const q = query(colRef, where("slug", "==", slug));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setPostData(doc.data());
      });
    }
    getData();
  }, [slug]);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  if (!slug || !postData.title) return;
  return (
    <PostDetailsPageStyles>
      <div className="container overflow-hidden">
        <div className="post-header">
          <PostImage
            url={postData.image}
            className="shadow-xl post-feature"
          ></PostImage>
          <div className="post-info">
            <h1 className="post-heading">{postData?.title}</h1>
            <PostCategory className="mb-6">
              {postData?.category?.name}
            </PostCategory>
            <DetailAuthorBox
              avatar={postData?.user?.avatar}
              userId={postData?.user?.id}
              title={postData?.title}
            ></DetailAuthorBox>
          </div>
        </div>
        <div className="post-content">
          <div className="entry-content">{parse(postData?.content || "")}</div>
          <AuthorBox userId={postData?.user?.id}></AuthorBox>
        </div>

        <PostRelated
          categoryId={postData?.categoryId}
          currentPost={postData?.title}
        ></PostRelated>
      </div>
    </PostDetailsPageStyles>
  );
};

export default PostDetailsPage;
