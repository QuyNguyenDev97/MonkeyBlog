import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-data/firebaseConfig";
import Postdecription from "../module/post/Postdecription";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import LoadingSpinner from "./loading/LoadingSpinner";

const SearchBox = ({ className }) => {
  const [filter, setFilter] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const element = useRef();
  const toggleElement = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!filter) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("title", ">=", filter),
      where("title", "<=", filter + "utf8")
    );
    const newCollection = queries;
    onSnapshot(newCollection, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) =>
        result.push({
          id: doc.id,
          ...doc.data(),
        })
      );
      setTimeout(() => {
        setIsLoading(false);
        setPosts(result);
      }, 1000);
    });
  }, [filter]);

  useEffect(() => {
    if (posts.length <= 0) {
      setIsLoading(false);
    }
    return;
  }, [posts.length]);

  useEffect(() => {
    const handleToggle = (e) => {
      if (toggleElement.current && !toggleElement.current.contains(e.target)) {
        setFilter("");
        setIsLoading(false);
        element.current.value = "";
      }
    };
    document.addEventListener("click", handleToggle);
    return () => {
      document.removeEventListener("click", handleToggle);
    };
  }, []);

  return (
    <div ref={toggleElement} className={className}>
      <div className="relative max-x-[320px] max-h-[40px]">
        <input
          type="text"
          className="w-full h-full p-2 font-medium rounded-xl focus:border-green-200"
          placeholder="Search posts..."
          ref={element}
          onChange={(e) => {
            setTimeout(() => {
              setFilter(e.target.value);
              setIsLoading(true);
            }, 1000);
          }}
        />
        <div className="absolute p-2 -translate-y-1/2 bg-white cursor-pointer right-1 top-1/2 rounded-xl">
          <svg
            width="18"
            height="17"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="7.66669"
              cy="7.05161"
              rx="6.66669"
              ry="6.05161"
              stroke="#999999"
              strokeWidth="1.5"
            />
            <path
              d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
              stroke="#999999"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
              stroke="#999999"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      <div>
        {filter && (
          <div className="transition-all sm:w-full sm:max-h-full w-[800px] max-h-[600px] fixed p-5 bg-green-50 mx-auto left-0 right-0 top-[80px] rounded-md sm:top-[200px]">
            {posts.length > 0 &&
              !isLoading &&
              posts.map((post) => (
                <div
                  key={post.id}
                  className="flex p-5 border-b border-gray-200 gap-x-10 sm:block"
                >
                  <div className="w-[200px] sm:hidden h-[100px] rounded-md">
                    <img
                      className="w-full h-full rounded-md"
                      src={post?.image}
                      alt="post"
                    />
                  </div>
                  <div className="">
                    <h3
                      className="mb-5 text-lg font-bold cursor-pointer sm:line-clamp-1"
                      onClick={() => {
                        navigate(`/blog/${post?.slug}`);
                        setFilter("");
                        element.current.value = "";
                      }}
                    >
                      {post?.title}
                    </h3>
                    <Postdecription className="line-clamp-2 sm:line-clamp-1 max-w-[600px]">
                      {post?.decription}
                    </Postdecription>
                  </div>
                </div>
              ))}
            {posts.length <= 0 && !isLoading && (
              <div className="w-[800px] sm:w-full fixed left-0 right-0 mx-auto h-[200px] flex items-center justify-center bg-green-50 rounded-md">
                <i className="text-xl font-medium text-gray-300">
                  <i className="fa-solid fa-magnifying-glass"></i> No posts
                  found
                </i>
              </div>
            )}
          </div>
        )}
        {isLoading && filter && (
          <div className="w-[800px] sm:w-full fixed left-0 right-0 mx-auto h-[200px] flex items-center justify-center bg-green-50 rounded-md">
            <LoadingSpinner
              size="60px"
              className="!border-l-green-400 !border-r-green-400"
            ></LoadingSpinner>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
