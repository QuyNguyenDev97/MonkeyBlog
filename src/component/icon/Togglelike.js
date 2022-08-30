import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { db } from "../../firebase-data/firebaseConfig";

const Togglelike = ({ title = "" }) => {
  const [like, setLike] = useState(false);
  const { userInfo } = useAuth();
  const [numberOfLikes, setNumberOflike] = useState(0);
  const [emailUserLike, setEmailUserLike] = useState([]);
  const [postId, setPostId] = useState("");
  const handleToogle = async () => {
    if (!userInfo.email) return;
    const docRef = doc(db, "posts", postId);
    const filter = emailUserLike.filter((item) => item !== userInfo?.email);
    if (!like) {
      await updateDoc(docRef, {
        likes: numberOfLikes + 1,
        peopleLike: [...emailUserLike, userInfo.email],
      });
    } else {
      await updateDoc(docRef, {
        likes: numberOfLikes <= 0 ? 0 : numberOfLikes - 1,
        peopleLike: emailUserLike.length <= 0 ? [] : [...filter],
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!userInfo.email) return;
      const colRef = collection(db, "posts");
      const queries = query(colRef, where("title", "==", title));
      onSnapshot(queries, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setPostId(doc?.id);
          setNumberOflike(doc?.data()?.likes);
          setEmailUserLike([...doc.data().peopleLike] || []);
          setLike(doc?.data()?.peopleLike.includes(userInfo.email));
        });
      });
    };
    fetchData();
  }, [title, userInfo.email]);
  return (
    <div onClick={handleToogle} className="cursor-pointer">
      {like ? (
        <p className="text-red-500">
          <i className="fa-solid fa-heart"></i>
        </p>
      ) : (
        <p className="text-red-500">
          <i className="fa-regular fa-heart"></i>
        </p>
      )}
    </div>
  );
};

export default Togglelike;
