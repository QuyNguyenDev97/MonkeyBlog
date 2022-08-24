import { debounce } from "lodash";
import React, { useState } from "react";
import Button from "../../component/button/Button";
import DashboardHeading from "../dashboard/DashboardHeading";
import UserTable from "./UserTable";

const UserManage = () => {
  const [filter, setFilter] = useState("");
  const handleSearchUser = debounce((e) => {
    const searchValues = e.target.value;
    setFilter(searchValues);
  }, 500);
  return (
    <div>
      <DashboardHeading title="User" desc="Manage users">
        <div className="flex flex-1 mt-auto rounded-2xl max-w-[300px]">
          <input
            type="text"
            className="block w-full px-5 py-4 border-2 border-gray-300 rounded-2xl"
            placeholder="Search users ..."
            onChange={handleSearchUser}
          />
        </div>
      </DashboardHeading>
      <UserTable filter={filter}></UserTable>
      <Button to="/manage/add-user">Create new user</Button>
    </div>
  );
};

export default UserManage;
