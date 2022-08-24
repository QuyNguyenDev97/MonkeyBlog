import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useLayoutEffect, useState } from "react";
import ToggleBookMark from "../component/icon/ToggleBookMark";
import { useAuth } from "../context/authContext";
import { db } from "../firebase-data/firebaseConfig";
import useChangeDate from "../hook/useChangeDate";
import Heading from "../layout/Heading";
import PostCategory from "../module/post/PostCategory";
import Postdecription from "../module/post/Postdecription";
import PostMeta from "../module/post/PostMeta";
import PostTitle from "../module/post/PostTitle";
import { defaultAvatar } from "../utils/constants";

const BookmarkPage = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState([]);
  const { changeDate } = useChangeDate();
  const { userInfo } = useAuth();

  useEffect(() => {
    setTitle(userInfo.bookMark);
  }, [userInfo.bookMark]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    if (title && title.length > 0) {
      const colRef = collection(db, "posts");
      const queries = query(colRef, where("title", "in", title));
      onSnapshot(queries, (snapshot) => {
        const result = [];
        snapshot.forEach((doc) => {
          result.push({
            ...doc.data(),
          });
        });
        setPosts(result);
      });
    } else if (title && title.length <= 0) {
      setPosts([]);
    }
  }, [title]);

  return (
    <div className="my-10">
      <div className="container">
        <Heading>Yours Bookmark</Heading>
        <div className="">
          {posts.length > 0 &&
            posts.map((post) => (
              <div
                key={post?.title}
                className="flex p-10 mb-10 rounded-lg sm:p-5 sm:flex-col sm:gap-y-5 gap-x-10 bg-green-50"
              >
                <div className="w-[400px] sm:mx-auto sm:w-[280px] sm:h-[200px] h-[300px] rounded-lg">
                  <img
                    src={post?.image}
                    alt="none"
                    className="w-full h-full rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex">
                    <PostCategory className="mb-5">
                      {post?.category?.name}
                    </PostCategory>
                    <ToggleBookMark
                      className="ml-auto text-2xl"
                      title={post?.title}
                    ></ToggleBookMark>
                  </div>
                  <PostTitle lineCap="!line-clamp-2" className="h-[56px] mb-5">
                    {post?.title}
                  </PostTitle>
                  <Postdecription className="block sm:line-clamp-2 sm:h-[50px] line-clamp-5 h-[120px] mb-5">
                    {post?.title}
                  </Postdecription>
                  <div className="flex items-center gap-x-5">
                    <div className="w-10 h-10 border border-gray-200 rounded-full">
                      <img
                        className="w-full h-full rounded-full"
                        src={post?.user?.avatar || defaultAvatar}
                        alt="avatar"
                      />
                    </div>
                    <div className="">
                      <PostMeta
                        author={post?.user?.fullname}
                        date={changeDate(post?.createdAt?.seconds)}
                      ></PostMeta>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {posts.length <= 0 && (
            <div className="h-[300px] flex items-center justify-center bg-green-50 rounded-md">
              <i className="text-2xl font-medium text-gray-300">
                Dont have any bookmark
              </i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarkPage;
