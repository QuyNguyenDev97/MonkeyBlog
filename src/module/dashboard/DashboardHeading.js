import React from "react";

const DashboardHeading = ({
  title = "",
  desc = "",
  hidden = false,
  children,
}) => {
  return (
    <div
      className={`flex items-start justify-between mb-10 ${
        hidden ? "hidden" : ""
      }`}
    >
      <div>
        <h1 className="dashboard-heading">{title}</h1>
        <p className="dashboard-short-desc">{desc}</p>
      </div>
      {children}
    </div>
  );
};

export default DashboardHeading;
