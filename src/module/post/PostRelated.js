import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { db } from "../../firebase-data/firebaseConfig";
import Heading from "../../layout/Heading";
import PostItem from "./PostItem";

const PostRelated = ({ categoryId = "", currentPost = "" }) => {
  const [posts, setPosts] = useState([]);
  const filterPosts = posts.filter((post) => post.title !== currentPost);
  useEffect(() => {
    const docRef = query(
      collection(db, "posts"),
      where("categoryId", "==", categoryId),
      where("status", "==", 1)
    );
    onSnapshot(docRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(results);
    });
  }, [categoryId, currentPost]);
  if (!categoryId) return null;
  return (
    <div className="post-related">
      <Heading>Related Posts</Heading>
      <div className="">
        {filterPosts.length <= 3 && filterPosts.length > 0 && (
          <div className="grid grid-cols-3 grid-rows-1 sm:gap-y-5 sm:grid-cols-1 gap-x-5">
            {filterPosts.map((item) => (
              <PostItem key={item.id} data={item}></PostItem>
            ))}
          </div>
        )}
        {filterPosts.length <= 0 && (
          <div className="container h-[300px] flex items-center justify-center bg-green-50 rounded-md">
            <i className="text-2xl font-medium text-gray-300">
              Dont have any related posts
            </i>
          </div>
        )}
        {filterPosts.length > 3 && (
          <Swiper
            slidesPerView={4}
            grabCursor={true}
            spaceBetween={20}
            loop={true}
            loopFillGroupWithBlank={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
            className="mySwiper"
          >
            {filterPosts.map((item) => (
              <SwiperSlide key={item.id}>
                <PostItem data={item}></PostItem>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      {/* <div className="hidden sm:block">
        {filterPosts.length <= 3 && filterPosts.length > 0 && (
          <div className="grid grid-cols-1 grid-rows-1 gap-x-5">
            {filterPosts.map((item) => (
              <PostItem key={item.id} data={item}></PostItem>
            ))}
          </div>
        )}
        {filterPosts.length <= 0 && (
          <div className="container h-[300px] flex items-center justify-center bg-green-50 rounded-md">
            <i className="text-2xl font-medium text-gray-300">
              Dont have any related posts
            </i>
          </div>
        )}
        {filterPosts.length > 3 && (
          <Swiper
            slidesPerView={1}
            grabCursor={true}
            spaceBetween={20}
            loop={true}
            loopFillGroupWithBlank={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {filterPosts.map((item) => (
              <SwiperSlide key={item.id}>
                <PostItem data={item}></PostItem>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div> */}
    </div>
  );
};

export default PostRelated;
