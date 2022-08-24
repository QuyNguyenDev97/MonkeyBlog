import React, { useEffect } from "react";
import HomeBanner from "../module/home/HomeBanner";
import HomeFeaturePost from "../module/home/HomeFeaturePost";
import HomeKeyFeature from "../module/home/HomeKeyFeature";
import HomeSlogen from "../module/home/HomeSlogen";

const HomePage = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <HomeBanner></HomeBanner>
      <HomeSlogen></HomeSlogen>
      <HomeKeyFeature></HomeKeyFeature>
      <HomeFeaturePost></HomeFeaturePost>
    </>
  );
};

export default HomePage;
