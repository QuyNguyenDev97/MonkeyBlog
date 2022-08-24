import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../component/button/Button";
import { db } from "../../firebase-data/firebaseConfig";
import useChangeDate from "../../hook/useChangeDate";
import { defaultAvatar } from "../../utils/constants";
import PostCategory from "../post/PostCategory";
import PostMeta from "../post/PostMeta";

const HomeFeaturePost = () => {
  const [post, setPost] = useState([]);
  const { changeDate } = useChangeDate();
  const navigate = useNavigate();
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", true),
      limit(6)
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
    <div className="container bg-[#111827] sm:!p-5 !p-20 !mb-20 rounded-lg">
      <div className="mb-10 text-center">
        <h2 className="mb-10 font-medium uppercase text-primary">
          FROM THE COMMUNITY
        </h2>
        <p className="text-5xl font-extrabold text-white sm:text-3xl">
          Featured articles today
        </p>
      </div>
      <div className="grid grid-cols-3 grid-rows-2 gap-5 mb-10 sm:grid-cols-1 lg:grid-cols-2 lg:grid-rows-3">
        {post.length > 0 &&
          post.map((item) => {
            return (
              <div key={item?.id} className="p-5 rounded-lg bg-green-50">
                <div className="max-w-[300px] h-[200px] rounded-lg mb-5 border-2 border-gray-200">
                  <img
                    src={item.image}
                    alt="none"
                    className="w-full h-full rounded-lg"
                  />
                </div>
                <div className="">
                  <PostCategory
                    className="mb-5"
                    to={`/category/${item?.category?.slug}`}
                  >
                    {item?.category?.name}
                  </PostCategory>
                  <h2
                    className="mb-5 text-lg font-bold line-clamp-2 h-[60px] cursor-pointer"
                    onClick={() => navigate(`/blog/${item?.slug}`)}
                  >
                    {item?.title}
                  </h2>
                  <p className="line-clamp-2 h-[44px] mb-5">
                    {item?.description ||
                      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et"}
                  </p>
                  <div className="flex items-center gap-x-5">
                    <div className="w-10 h-10 border border-gray-200 rounded-full">
                      <img
                        className="w-full h-full rounded-full"
                        src={item?.user?.avatar || defaultAvatar}
                        alt="avatar"
                      />
                    </div>
                    <div className="">
                      <PostMeta
                        author={item?.user?.fullname}
                        date={changeDate(item?.createdAt?.seconds)}
                      ></PostMeta>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <Button to="/blog" className="mx-auto max-w-[200px]">
        See more post
      </Button>
    </div>
  );
};

export default HomeFeaturePost;
