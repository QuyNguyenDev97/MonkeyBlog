import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import BlogBanner from "../module/blog/BlogBanner";
import BlogFeature from "../module/blog/BlogFeature";
import BlogLikeMost from "../module/blog/BlogLikeMost";
import BlogNewest from "../module/blog/BlogNewest";
import AllPost from "../module/post/AllPost";

const HomePageStyles = styled.div``;

const BlogPage = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <HomePageStyles>
      <BlogBanner></BlogBanner>
      <BlogFeature></BlogFeature>
      <BlogNewest></BlogNewest>
      <BlogLikeMost></BlogLikeMost>
      <AllPost></AllPost>
    </HomePageStyles>
  );
};

export default BlogPage;
