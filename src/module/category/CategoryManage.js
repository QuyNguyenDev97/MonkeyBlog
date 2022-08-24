import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Swal from "sweetalert2";
import { debounce } from "lodash";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ActionDelete from "../../component/action/ActionDelete";
import ActionEdit from "../../component/action/ActionEdit";
import ActionView from "../../component/action/ActionView";
import Button from "../../component/button/Button";
import LabelStatus from "../../component/label/LabelStatus";
import Table from "../../component/table/Table";
import { db } from "../../firebase-data/firebaseConfig";
import { categoryStatus } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useNavigate } from "react-router-dom";
import useUpperFirstLetter from "../../hook/useUpperFirstLetter";

const CategoryManage = () => {
  const { handleValues } = useUpperFirstLetter();
  const [category, setCategory] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const handleDeleteCategory = async (docId) => {
    const deleteRef = doc(db, "categories", docId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(deleteRef);
        Swal.fire("Deleted!", "Your category has been deleted.", "success");
      }
    });
  };
  const handleUpdateCategory = async (docId) => {
    navigate(`/manage/update-category?id=${docId}`);
  };
  const handleSearchCategori = debounce((e) => {
    const searchValues = handleValues(e.target.value);
    setFilter(searchValues);
  }, 500);
  useEffect(() => {
    const colRef = collection(db, "categories");
    const queries = query(
      colRef,
      where("name", ">=", filter),
      where("name", "<=", filter + "utf8")
    );
    const newCollection = filter ? queries : colRef;
    onSnapshot(newCollection, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) =>
        result.push({
          id: doc.id,
          ...doc.data(),
        })
      );
      setCategory(result);
    });
  }, [filter]);

  return (
    <div>
      <DashboardHeading title="Categories" desc="Manage your category">
        <div className="flex flex-1 mt-auto rounded-2xl max-w-[300px]">
          <input
            type="text"
            className="block w-full px-5 py-4 border-2 border-gray-300 rounded-2xl"
            placeholder="Search categories ..."
            onChange={handleSearchCategori}
          />
        </div>
      </DashboardHeading>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {category.length > 0 &&
            category.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <div className="italic text-gray-400">{item.slug}</div>
                </td>
                <td>
                  {(item.status === categoryStatus.APPROVED && (
                    <LabelStatus type="success">Approved</LabelStatus>
                  )) ||
                    (item.status === categoryStatus.UNAPPROVED && (
                      <LabelStatus type="warning">Unapproved</LabelStatus>
                    ))}
                </td>
                <td>
                  <div className="flex items-center gap-x-3">
                    {/* <ActionView></ActionView> */}
                    <ActionEdit
                      onClick={() => handleUpdateCategory(item.id)}
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeleteCategory(item.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Button to="/manage/add-category">Create new category</Button>
    </div>
  );
};

export default CategoryManage;
