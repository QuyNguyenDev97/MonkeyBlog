import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/authContext";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import SignInPage from "../../pages/SignInPage";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { userRole } from "../../utils/constants";
import { useEffect } from "react";
import useWindowDimensions from "../../hook/useWindowDimensions";

const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  .dashboard {
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 20px;
      color: ${(props) => props.theme.primary};
      letter-spacing: 1px;
    }
    &-short-desc {
      font-weight: bold;
      font-size: 20px;
      color: ${(props) => props.theme.gray4B};
    }
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
      align-items: start;
    }
  }
`;

const DashboardLayout = ({ children }) => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  useEffect(() => {
    if (width < 1330) {
      toast.error("please use this feature on a larger screen (PC/latop) !");
      navigate("/");
    }
    if (!userInfo || !userInfo.role) {
      toast.error("You must be logged !");
      navigate("/sign-in");
    }
    if (userInfo.role !== userRole.ADMIN) {
      toast.error("You are not a admin !");
      navigate("/");
    }
  }, [navigate, userInfo, width]);

  return (
    <>
      <Header></Header>
      <DashboardStyles>
        <div className="dashboard-main">
          <Sidebar></Sidebar>
          <div className="dashboard-children">
            <Outlet></Outlet>
          </div>
        </div>
      </DashboardStyles>
      <Footer></Footer>
    </>
  );
};

export default DashboardLayout;
