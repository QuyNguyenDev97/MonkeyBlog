import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ActionDelete from "../../component/action/ActionDelete";
import ActionEdit from "../../component/action/ActionEdit";
import LabelStatus from "../../component/label/LabelStatus";
import Table from "../../component/table/Table";
import { useAuth } from "../../context/authContext";
import { db } from "../../firebase-data/firebaseConfig";
import { defaultAvatar, userRole, userStatus } from "../../utils/constants";

const UserTable = ({ filter }) => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  // const handleDeleteUser = async (user) => {
  //   if (userInfo?.role !== userRole.ADMIN) {
  //     Swal.fire("Failed", "You have no right to do this action", "warning");
  //     return;
  //   }
  //   const colRef = doc(db, "users", user.id);
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       await deleteDoc(colRef);
  //       toast.success("Delete user successfully");
  //       Swal.fire("Deleted!", "The user has been deleted.", "success");
  //     }
  //   });
  // };
  const handleUpdateUser = async (user) => {
    navigate(`/manage/update-user?id=${user.id}`);
  };
  useEffect(() => {
    const colRef = collection(db, "users");
    const queries = query(
      colRef,
      where("email", ">=", filter),
      where("email", "<=", filter + "utf8")
    );
    const newCollection = filter ? queries : colRef;
    onSnapshot(newCollection, (snapshot) => {
      const result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserList(result);
    });
  }, [filter]);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Infor</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 &&
            userList.map((user) => (
              <tr key={user?.id}>
                <td title={user?.id}>{user?.id.slice(0, 5) + "..."}</td>
                <td>
                  <div className="flex items-center gap-x-3">
                    {user.avatar ? (
                      <img
                        src={user?.avatar}
                        alt="avatar"
                        className="object-cover w-10 h-10 rounded-md"
                      />
                    ) : (
                      <img
                        src={defaultAvatar}
                        alt="avatar"
                        className="object-cover w-10 h-10 rounded-md"
                      />
                    )}

                    <div className="whitespace-nowrap">
                      <h3 className="">{user?.fullname}</h3>
                      <time className="text-sm text-gray-400">
                        {new Date(
                          user?.createAt?.seconds * 1000
                        ).toLocaleDateString("vi-VI")}
                      </time>
                    </div>
                  </div>
                </td>
                <td>{user?.username}</td>
                <td title={user?.email}>{user?.email.slice(0, 5) + "..."}</td>
                <td>
                  {(user?.status === userStatus.ACTIVE && (
                    <LabelStatus type="success">Active</LabelStatus>
                  )) ||
                    (user?.status === userStatus.BAN && (
                      <LabelStatus type="danger">Ban</LabelStatus>
                    )) ||
                    (user?.status === userStatus.PENDING && (
                      <LabelStatus type="warning">Pending</LabelStatus>
                    ))}
                </td>
                <td>
                  {(user?.role === userRole.ADMIN && <p>Admin</p>) ||
                    (user?.role === userRole.USER && <p>User</p>) ||
                    (user?.role === userRole.MOD && <p>Mod</p>)}
                </td>

                <td>
                  {" "}
                  <div className="flex items-center gap-x-3">
                    {/* <ActionView></ActionView> */}
                    <ActionEdit
                      onClick={() => handleUpdateUser(user)}
                    ></ActionEdit>
                    {/* <ActionDelete
                      onClick={() => handleDeleteUser(user)}
                    ></ActionDelete> */}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
