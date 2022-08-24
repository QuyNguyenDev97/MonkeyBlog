import React, { useState } from "react";
import { DropdownProvider } from "./dropdownContext";
import Select from "./Select";

const Dropdown = ({ children, ...props }) => {
  return (
    <DropdownProvider {...props}>
      <div className="relative inline-block w-full">{children}</div>
    </DropdownProvider>
  );
};

export default Dropdown;
