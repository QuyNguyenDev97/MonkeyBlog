import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase-data/firebaseConfig";
import Heading from "../layout/Heading";
import Layout from "../layout/Layout";
import PostItem from "../module/post/PostItem";

const CategoryPage = () => {
  const [posts, setPosts] = useState([]);
  const params = useParams();
  const category = params.slug.split("-").join(" ");

  useEffect(() => {
    async function fetchData() {
      const docRef = query(
        collection(db, "posts"),
        where("category.slug", "==", params.slug)
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
    }
    fetchData();
  }, [params.slug]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  if (posts.length <= 0) return null;
  return (
    <Layout>
      <div className="container !mb-20">
        <Heading>{category}</Heading>
        <div className="grid grid-cols-3 gap-10 sm:grid-cols-1">
          {posts.map((item) => (
            <PostItem key={item.id} data={item}></PostItem>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
