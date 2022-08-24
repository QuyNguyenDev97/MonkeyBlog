import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#002A30] text-[#4DD2C8] py-20">
      <div className="container flex lg:flex-col ">
        <div className="w-1/2 lg:w-full lg:px-10">
          <div className="flex items-center mb-10 gap-x-4">
            <NavLink className="block w-20 h-20" to="/">
              <img
                className="w-full h-full"
                srcSet="/logo.png 2x"
                alt="monkey-blogging"
              />
            </NavLink>
            <div className="">
              <h2 className="font-bold text-[#F2FFFE]">MonKey Blogging</h2>
              <p className="">The next big thing in blogging</p>
            </div>
          </div>
          <h4 className="max-w-[500px] mb-10 text-[#F2FFFE]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem,
            ut corrupti quis quam quibusdam totam quo odio, non adipisci rem
            sapiente tempore accusamus nisi excepturi. Voluptatem numquam culpa
            voluptate dolore.
          </h4>
          <div className="">
            <p className="mb-5 text-[#F2FFFE]">Sosial</p>
            <ul className="flex gap-x-10">
              <li className="text-3xl">
                <i className="fa-brands fa-facebook"></i>
              </li>
              <li className="text-3xl">
                <i className="fa-brands fa-github"></i>
              </li>
              <li className="text-3xl">
                <i className="fa-brands fa-tiktok"></i>
              </li>
              <li className="text-3xl">
                <i className="fa-solid fa-envelope"></i>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex w-1/2 p-10 sm:gap-y-5 sm:flex-col lg:w-full gap-x-20">
          <div className="w-1/2 ">
            <h4 className="text-[#F2FFFE] mb-5">Contact</h4>
            <div className="flex mb-5 gap-x-5">
              <i className="fa-solid fa-phone"></i>
              <p className="">0969721829</p>
            </div>
            <div className="flex mb-5 gap-x-5">
              <i className="fa-solid fa-envelope"></i>
              <p className="">quynguyendev@gmail.com</p>
            </div>
            <div className="flex gap-x-5">
              <i className="fa-solid fa-location-pin"></i>
              <p className="">
                46Ka Cu Lao Thuong,Vinh Tho,Nha Trang,Khanh Hoa
              </p>
            </div>
          </div>
          <div className="w-1/2 ">
            <h4 className="text-[#F2FFFE] mb-5">Sitemap</h4>
            <div className="flex mb-5 gap-x-5">
              <i className="fa-solid fa-house"></i>
              <p className="">Home</p>
            </div>
            <div className="flex mb-5 gap-x-5">
              <i className="fa-solid fa-blog"></i>
              <p className="">Blog</p>
            </div>
            <div className="flex gap-x-5">
              <i className="fa-solid fa-address-card"></i>
              <p className="">Contact</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
