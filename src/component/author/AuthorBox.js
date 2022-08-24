import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase-data/firebaseConfig";
import { defaultAvatar } from "../../utils/constants";

const AuthorBox = ({ userId = "" }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchUserData() {
      const docRef = doc(db, "users", userId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.data()) {
        setUser(docSnapshot.data());
      }
    }
    fetchUserData();
  }, [userId]);
  if (!userId || !user.username) return null;
  return (
    <div className="shadow-xl author sm:!w-[300px] sm:flex-col sm:justify-center sm:items-center">
      <div className="author-image sm:!w-[280px]">
        <img
          src={user?.avatar || defaultAvatar}
          alt=""
          className="w-full h-full"
        />
      </div>
      <div className="author-content">
        <h3 className="text-green-500 author-name">{user?.fullname}</h3>
        <p className="author-desc">
          {user?.description ||
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis ab recusandae eos ipsam labore sunt, vel facilis odit enim eveniet expedita accusamus maiores voluptatem cupiditate omnis! Inventore quam culpa illo."}{" "}
        </p>
      </div>
    </div>
  );
};

export default AuthorBox;
