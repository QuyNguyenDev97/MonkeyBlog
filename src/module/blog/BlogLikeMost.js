import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { db } from "../../firebase-data/firebaseConfig";
import Heading from "../../layout/Heading";
import PostItem from "../post/PostItem";

const BlogLikeMost = () => {
  const [post, setPost] = useState([]);
  const filterPosts = post.filter((post) => post.likes > 0);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(colRef, where("status", "==", 1));
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
    <div className="container !mb-20">
      <Heading>Favorite Posts</Heading>
      <div>
        {filterPosts.length <= 3 &&
          filterPosts.length > 0 &&
          filterPosts.map((item) => (
            <div className="grid grid-cols-3 gap-x-5" key={item.id}>
              <PostItem data={item}></PostItem>
            </div>
          ))}
        {/* {filterPosts.length <= 0 && (
          <div className="h-[300px] flex items-center justify-center bg-green-50 rounded-md">
            <i className="text-2xl font-medium text-gray-300">
              Dont have any related posts
            </i>
          </div>
        )} */}
        <div className="sm:hidden">
          {filterPosts.length > 3 && (
            <Swiper
              slidesPerView={3}
              grabCursor={true}
              spaceBetween={20}
              loop={true}
              loopFillGroupWithBlank={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
            >
              {filterPosts.map((item) => (
                <SwiperSlide key={item.id}>
                  <PostItem data={item}></PostItem>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        <div className="hidden sm:block">
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
            >
              {filterPosts.map((item) => (
                <SwiperSlide key={item.id}>
                  <PostItem data={item}></PostItem>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogLikeMost;
