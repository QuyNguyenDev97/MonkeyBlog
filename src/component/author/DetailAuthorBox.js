import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase-data/firebaseConfig";
import useChangeDate from "../../hook/useChangeDate";
import { defaultAvatar } from "../../utils/constants";
import ToggleBookMark from "../icon/ToggleBookMark";
import Togglelike from "../icon/Togglelike";

const DetailAuthorBox = ({ userId = "", title = "", avatar = "" }) => {
  const { changeDate } = useChangeDate();
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
    <div className="flex items-center gap-x-5">
      <div className="rounded-full w-[50px] h-[50px]">
        <img
          className="w-full h-full rounded-full"
          src={avatar || defaultAvatar}
          alt=""
        />
      </div>
      <div className="flex items-center gap-x-10">
        <div className="">
          <h3 className="text-lg font-medium">{user?.fullname}</h3>
          <p className="">{changeDate(user?.createAt?.seconds)}</p>
        </div>
        <div className="flex text-xl gap-x-10">
          <Togglelike title={title}></Togglelike>
          <ToggleBookMark
            userData={user}
            title={title}
            userId={userId}
          ></ToggleBookMark>
          <p>
            <i className="fa-solid fa-share-from-square"></i>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailAuthorBox;
