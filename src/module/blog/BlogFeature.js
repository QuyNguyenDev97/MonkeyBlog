import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase-data/firebaseConfig";
import Heading from "../../layout/Heading";
import PostFeatureItem from "../post/PostFeatureItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css";
import { Pagination, Navigation } from "swiper";
import LoadingSkeleton from "../../component/loading/LoadingSkeleton";

const HomeFeatureStyles = styled.div``;

const BlogFeature = () => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", true)
    );
    onSnapshot(queries, (snapshot) => {
      const result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPost(result);
    });
  }, []);
  if (!post || post.length === 0) {
    return (
      <div className="home-block">
        <div className="container">
          <Heading>Featured Posts</Heading>
          <div className="grid grid-cols-3 grid-rows-1 lg:grid-cols-2 sm:grid-cols-1 ">
            <LoadingSkeleton></LoadingSkeleton>
            <LoadingSkeleton></LoadingSkeleton>
            <LoadingSkeleton></LoadingSkeleton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <HomeFeatureStyles className="home-block">
      <div className="container sm:hidden">
        <Heading>Featured Posts</Heading>
        <Swiper
          slidesPerView={3}
          grabCursor={true}
          spaceBetween={30}
          loop={true}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {post.length > 0 &&
            post.map((item) => (
              <SwiperSlide key={item.id}>
                <PostFeatureItem data={item}></PostFeatureItem>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="container hidden sm:block">
        <Heading>Featured Posts</Heading>
        <Swiper
          slidesPerView={1}
          grabCursor={true}
          spaceBetween={30}
          loop={true}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {post.length > 0 &&
            post.map((item) => (
              <SwiperSlide key={item.id}>
                <PostFeatureItem data={item}></PostFeatureItem>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </HomeFeatureStyles>
  );
};

export default BlogFeature;
