import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase-data/firebaseConfig";
import Heading from "../../layout/Heading";
import AllPostItem from "./AllPostItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Scrollbar } from "swiper";
import "swiper/css/scrollbar";

const AllPost = () => {
  const [posts, setPosts] = useState([]);
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
      setPosts(result);
    });
  }, []);
  return (
    <div className="container rounded-lg">
      <Heading>All Posts</Heading>
      <div className="h-[3000px]  mb-10">
        <Swiper
          slidesPerView={10}
          grabCursor={true}
          spaceBetween={20}
          loop={true}
          loopFillGroupWithBlank={true}
          direction={"vertical"}
          scrollbar={{
            hide: false,
          }}
          modules={[Scrollbar]}
          className="mySwiper"
        >
          {posts.length > 0 &&
            posts.map((post) => (
              <SwiperSlide key={post.id}>
                <AllPostItem data={post}></AllPostItem>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default AllPost;
