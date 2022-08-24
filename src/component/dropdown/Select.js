import React, { Fragment } from "react";
import { useDropdown } from "./dropdownContext";

const Select = ({ placeholder = "Please select an option", children }) => {
  const { show, toggle } = useDropdown();
  return (
    <Fragment>
      <div
        className="flex items-center justify-between p-5 bg-[#E7ECF3] rounded cursor-pointer font-medium"
        onClick={toggle}
      >
        <span>{placeholder}</span>
        <span>
          {show ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </span>
      </div>
    </Fragment>
  );
};

export default Select;
