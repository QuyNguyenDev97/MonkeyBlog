import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authContext";
import { db } from "../../firebase-data/firebaseConfig";

const ToggleBookMark = ({ title = "", className = "" }) => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [hasBookMark, setHasBookMark] = useState(false);
  const [bookMarkList, setBookMarkList] = useState([]);
  const handleAddBookMark = async () => {
    if (!userInfo) {
      navigate("/sign-in");
      toast.error("Please login to use this feature", {
        pauseOnHover: false,
      });
      return;
    }
    const docRef = doc(db, "users", userInfo?.uid);
    const filter = bookMarkList.filter((item) => item !== title);
    if (!hasBookMark) {
      setHasBookMark(true);
      await updateDoc(docRef, {
        bookMark: [...bookMarkList, title],
      });
      toast.success("The post has been added to the bookmark list", {
        pauseOnHover: false,
      });
    } else {
      setHasBookMark(false);
      await updateDoc(docRef, {
        bookMark: bookMarkList.length <= 0 ? [] : [...filter],
      });
      toast.error("The post has been removed from the bookmark list", {
        pauseOnHover: false,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!userInfo || !userInfo.email) return;
      const colRef = collection(db, "users");
      const queries = query(colRef, where("email", "==", userInfo?.email));
      onSnapshot(queries, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setBookMarkList([...doc?.data()?.bookMark] || []);
          setHasBookMark([...doc?.data()?.bookMark].includes(title));
        });
      });
    };
    fetchData();
  }, [title, userInfo?.email]);

  return (
    <div
      className={`cursor-pointer ${className}`}
      onClick={handleAddBookMark}
      title="add to bookmark"
    >
      {hasBookMark ? (
        <p className="font-thin text-green-300">
          <i className="fa-solid fa-bookmark"></i>
        </p>
      ) : (
        <p className="font-thin text-green-300 ">
          <i className="fa-regular fa-bookmark"></i>
        </p>
      )}
    </div>
  );
};

export default ToggleBookMark;
