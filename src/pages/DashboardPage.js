import { screen } from "@testing-library/react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-data/firebaseConfig";
import DashboardHeading from "../module/dashboard/DashboardHeading";
const DashboardPage = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState(0);
  const [category, setCategory] = useState(0);
  const [user, setUser] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  console.log("DashboardPage ~ windowWidth", windowWidth);

  useEffect(() => {
    const colRef = collection(db, "posts");
    onSnapshot(colRef, (snapshot) => {
      setPost(snapshot.docs.length);
    });
  }, [setPost]);

  useEffect(() => {
    const colRef = collection(db, "categories");
    onSnapshot(colRef, (snapshot) => {
      setCategory(snapshot.docs.length);
    });
  }, [setCategory]);

  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshot) => {
      setUser(snapshot.docs.length);
    });
  }, [setUser]);

  useEffect(() => {
    setWindowWidth(window.screen.width);
    window.scroll(0, 0);
  }, []);

  return (
    <div>
      <DashboardHeading
        title="Dashboard"
        desc="Manage your Page"
      ></DashboardHeading>
      <div className="flex items-center justify-center px-5 pt-10 pb-40 gap-x-10 ">
        <div
          className="flex items-center p-10 rounded-lg shadow-md cursor-pointer bg-green-50 gap-x-10"
          onClick={() => navigate("/manage/user")}
        >
          <div className="text-gray-300 text-8xl">
            <i className="fa-regular fa-address-card"></i>
          </div>
          <div className="text-gray-400">
            <p className="mb-5 text-xl font-medium">Total users</p>
            <span className="text-2xl font-bold text-gray-500">{user}</span>
          </div>
        </div>
        <div
          className="flex items-center p-10 rounded-lg shadow-md cursor-pointer bg-green-50 gap-x-10"
          onClick={() => navigate("/manage/post")}
        >
          <div className="text-gray-300 text-8xl">
            <i className="fa-solid fa-blog"></i>
          </div>
          <div className="text-gray-400">
            <p className="mb-5 text-xl font-medium">Total Post</p>
            <span className="text-2xl font-bold text-gray-500">{post}</span>
          </div>
        </div>
        <div
          className="flex items-center p-10 rounded-lg shadow-md cursor-pointer bg-green-50 gap-x-10"
          onClick={() => navigate("/manage/category")}
        >
          <div className="text-gray-300 text-8xl">
            <i className="fa-solid fa-tags"></i>
          </div>
          <div className="text-gray-400">
            <p className="mb-5 text-xl font-medium">Total category</p>
            <span className="text-2xl font-bold text-gray-500">{category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
