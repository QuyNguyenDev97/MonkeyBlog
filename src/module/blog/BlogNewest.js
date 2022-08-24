import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase-data/firebaseConfig";
import Heading from "../../layout/Heading";
import PostNewestItem from "../post/PostNewestItem";
import PostNewestLarge from "../post/PostNewestLarge";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Scrollbar, Pagination, Navigation } from "swiper";
import "swiper/css/scrollbar";

const HomeNewestStyles = styled.div`
  height: 100%;
  .layout {
    display: flex;
    gap: 40px;
    margin-bottom: 64px;
    align-items: start;
  }
  .sidebar {
    height: 700px;
    padding: 20px 20px;
    border-radius: 16px;
    --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
      0 8px 10px -6px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color),
      0 8px 10px -6px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
`;

const BlogNewest = () => {
  const [post, setPost] = useState([]);
  const postLarge = post[0];
  const postSmall = post.slice(1, post.length);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", false)
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
  return (
    <HomeNewestStyles className="home-block ">
      <div className="container sm:hidden">
        <Heading>Newlest Post</Heading>
        <div className="layout sm:!flex-col">
          <PostNewestLarge data={postLarge}></PostNewestLarge>
          <div className="bg-pink-50 sidebar">
            <Swiper
              slidesPerView={3}
              grabCursor={true}
              loop={true}
              loopFillGroupWithBlank={true}
              direction={"vertical"}
              scrollbar={{
                hide: false,
              }}
              modules={[Scrollbar]}
              className="mySwiper"
            >
              {postSmall.length > 0 &&
                postSmall.map((post) => (
                  <SwiperSlide key={post.id}>
                    <PostNewestItem data={post}></PostNewestItem>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
      <div className="container hidden sm:block">
        <div className="w-full bg-green-50">
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
              post.map((post) => (
                <SwiperSlide key={post.id}>
                  <PostNewestItem data={post}></PostNewestItem>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </HomeNewestStyles>
  );
};

export default BlogNewest;
