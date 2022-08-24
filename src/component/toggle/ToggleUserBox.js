import { signOut } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { auth } from "../../firebase-data/firebaseConfig";
import { defaultAvatar, userRole } from "../../utils/constants";
import { toast } from "react-toastify";
import SearchBox from "../SearchBox";

const ToggleUserBox = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const [open, setOpen] = useState(false);
  const toggleElement = useRef(null);
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        toast.success("You have been signed out !");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    const handleToggle = (e) => {
      if (toggleElement.current && !toggleElement.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleToggle);
    return () => {
      document.removeEventListener("click", handleToggle);
    };
  }, []);
  return (
    <>
      <div className="relative w-[200px] sm:w-auto" ref={toggleElement}>
        <div
          className="flex items-center flex-1 gap-2 cursor-pointer "
          onClick={() => setOpen(!open)}
        >
          <div className="w-[40px] h-[40px] rounded-full">
            <img
              src={userInfo.avatar || defaultAvatar}
              alt="none"
              className="w-full h-full rounded-full"
            />
          </div>
          <p className="whitespace-nowrap text-slate-700 sm:hidden">
            Wellcome !{" "}
            <span className="text-green-500">{userInfo.firstname}</span>
          </p>
        </div>
        {open && (
          <div
            className="w-[240px]  sm:w-full sm:fixed sm:top-[90px] sm:rounded-none group transition-all absolute px-6 py-2 
          top-[50px] left-0 right-0 sm:left-0  lg:-left-10 bg-white shadow-custome whitespace-nowrap rounded-xl z-[99]"
          >
            <div className="flex items-center gap-x-2">
              <img
                src={userInfo.avatar || defaultAvatar}
                alt="none"
                className="w-10 h-10 rounded-full"
              />
              <div className="py-2">
                <p className="text-base font-semibold">{userInfo.fullname}</p>
                {userInfo.role === userRole.ADMIN && (
                  <i className="text-sm text-slate-500">Admin</i>
                )}
                {userInfo.role === userRole.MOD && (
                  <i className="text-sm text-slate-500">Moder</i>
                )}
                {userInfo.role === userRole.USER && (
                  <i className="text-sm text-slate-500">User Member</i>
                )}
              </div>
            </div>
            <SearchBox className="hidden sm:block"></SearchBox>
            <NavLink
              to="/profile"
              onClick={() => setOpen(false)}
              className="block p-2 border-t cursor-pointer hover:text-secondary border-stone-200"
            >
              Personal page
            </NavLink>
            <NavLink
              onClick={() => setOpen(false)}
              to="/bookmark"
              className="block p-2 border-t cursor-pointer hover:text-secondary border-stone-200"
            >
              Your Bookmark
            </NavLink>
            {userInfo.role === userRole.ADMIN ? (
              <NavLink
                to={"/manage/dashboard"}
                onClick={() => setOpen(false)}
                className="block p-2 border-t cursor-pointer border-stone-200 hover:text-secondary"
              >
                Management Page
              </NavLink>
            ) : (
              <p className="p-2 border-t text-slate-300 border-stone-200">
                Management Page
              </p>
            )}
            <p
              onClick={handleSignout}
              className="p-2 border-t cursor-pointer border-stone-200 hover:text-secondary"
            >
              Log out
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ToggleUserBox;
