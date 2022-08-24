import { updateProfile } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Button from "../component/button/Button";
import SearchBox from "../component/SearchBox";
import ToggleUserBox from "../component/toggle/ToggleUserBox";
import { useAuth } from "../context/authContext";
import { auth, db } from "../firebase-data/firebaseConfig";

const navbarItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Blog",
    url: "/blog",
  },
  // {
  //   title: "Contact",
  //   url: "/contact",
  // },
];
const HeaderStyles = styled.div`
  padding: 20px 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 80;
  .header-wrapper {
    display: flex;
    justify-content: space-between;
  }
  .header-main {
    display: flex;
    align-items: center;
    column-gap: 40px;
  }
  .logo-wrapper {
    max-width: 40px;
    max-height: 60px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .navbar-list {
    display: flex;
    column-gap: 40px;
    font-weight: 500;
  }
  .navbar-item {
    :hover {
      color: ${(props) => props.theme.primary};
    }
  }
  .header-feature {
    display: flex;
    column-gap: 20px;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
  }
`;
const Header = () => {
  const { userInfo } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const userEmail = userInfo?.email;
  useEffect(() => {
    async function updateUser() {
      if (!userEmail) return null;
      const q = query(collection(db, "users"), where("email", "==", userEmail));
      onSnapshot(q, (querySnapshot) => {
        const result = [];
        querySnapshot.forEach((doc) => {
          result.push(doc.data());
        });
        setDisplayName(result[0]?.fullname);
      });
      await updateProfile(auth.currentUser, {
        displayName,
      });
    }
    updateUser();
  }, [displayName, userEmail]);
  return (
    <div>
      <HeaderStyles className="bg-green-100">
        <div className="container relative">
          <div className=" header-wrapper">
            <div className="header-main">
              <div className="logo-wrapper">
                <NavLink to="/">
                  <img srcSet="/logo.png 2x" alt="monkey-blogging" />
                </NavLink>
              </div>
              <div className="navbar-wrapper">
                <ul className="navbar-list">
                  {navbarItems.length > 0 &&
                    navbarItems.map((item) => (
                      <li className="navbar-item" key={item.title}>
                        <NavLink
                          to={item.url}
                          className="p-2 navbar-item-link hover:border-b-2 border-primary"
                        >
                          {item.title}
                        </NavLink>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="header-feature">
              <SearchBox className="sm:hidden"></SearchBox>
              {!userInfo ? (
                <>
                  <div className="flex items-center gap-5 sm:hidden">
                    <Button
                      style={{
                        maxWidth: "100px",
                        maxHeight: "40px",
                        margin: "0",
                        fontSize: "16px",
                        background: "none",
                        color: "#A4D96C",
                        border: "2px solid #A4D96C",
                      }}
                      type="button"
                      to="/sign-in"
                    >
                      Sign In
                    </Button>
                    <Button
                      style={{
                        maxWidth: "100px",
                        maxHeight: "40px",
                        margin: "0",
                        fontSize: "16px",
                      }}
                      type="button"
                      to="/sign-up"
                    >
                      Sign Up
                    </Button>
                  </div>
                  <div className="items-center hidden gap-5 sm:flex">
                    <Button
                      className="!bg-none !text-primary !p-1 !h-[40px] !text-base"
                      hasBorder="!border !border-primary rounded-lg"
                      type="button"
                      to="/sign-in"
                    >
                      Sign In
                    </Button>
                  </div>
                </>
              ) : (
                <ToggleUserBox></ToggleUserBox>
              )}
            </div>
          </div>
        </div>
      </HeaderStyles>
      <div className="h-[92px]"></div>
    </div>
  );
};

export default Header;
