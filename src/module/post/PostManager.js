import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ActionEdit from "../../component/action/ActionEdit";
import ActionView from "../../component/action/ActionView";
import Button from "../../component/button/Button";
import LabelStatus from "../../component/label/LabelStatus";
import Table from "../../component/table/Table";

import { db } from "../../firebase-data/firebaseConfig";
import useChangeDate from "../../hook/useChangeDate";
import DashboardHeading from "../dashboard/DashboardHeading";
import { postStatus } from "../../utils/constants";
import ActionDelete from "../../component/action/ActionDelete";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";

const PostManage = () => {
  const { userInfo } = useAuth();

  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const { changeDate } = useChangeDate();
  const [posts, setPosts] = useState([]);
  const handleSearchCategori = debounce((e) => {
    const searchValues = e.target.value;
    setFilter(searchValues);
  }, 500);
  const handleDeletePost = (postId) => {
    const deleteRef = doc(db, "posts", postId);
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
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("title", ">=", filter),
      where("title", "<=", filter + "utf8")
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
      setPosts(result);
    });
  }, [filter]);
  // const { userInfo } = useAuth();
  // if (userInfo.role !== userRole.ADMIN) return null;
  return (
    <div>
      <DashboardHeading title="Post" desc="Manage your Post">
        <div className="flex flex-1 mt-auto rounded-2xl max-w-[300px]">
          <input
            type="text"
            className="block w-full px-5 py-4 border-2 border-gray-300 rounded-2xl"
            placeholder="Search post ..."
            onChange={handleSearchCategori}
          />
        </div>
      </DashboardHeading>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Status</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts &&
            posts.map((post) => (
              <tr key={post?.id}>
                <td title={post?.id}> {post.id.slice(0, 5) + "..."}</td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <img
                      src={post?.image}
                      alt=""
                      className="w-[66px] h-[55px] rounded object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold" title={post?.title}>
                        {post?.title.slice(0, 20) + "..."}
                      </h3>
                      <time className="text-sm text-gray-500">
                        {"Date: " + changeDate(post?.createdAt?.seconds)}
                      </time>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-gray-500">{post?.category?.name}</span>
                </td>
                <td>
                  {" "}
                  {(post?.status === postStatus.Approved && (
                    <LabelStatus type="success">Approved</LabelStatus>
                  )) ||
                    (post?.status === postStatus.Pending && (
                      <LabelStatus type="danger">Pending</LabelStatus>
                    )) ||
                    (post?.status === postStatus.Reject && (
                      <LabelStatus type="warning">Reject</LabelStatus>
                    ))}
                </td>
                <td>
                  <span className="text-gray-500">{post?.user?.username}</span>
                </td>
                <td>
                  <div className="flex items-center text-gray-500 gap-x-3">
                    <ActionView
                      onClick={() => navigate(`/blog/${post.slug}`)}
                    ></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-post?id=${post.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeletePost(post.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Button
        onClick={() => {
          if (!userInfo.description || !userInfo.avatar) {
            toast.error(
              "Please update your information before adding new post !"
            );
            navigate("/profile");
            return;
          }
          navigate("/manage/add-post");
        }}
      >
        Add new post
      </Button>
    </div>
  );
};

export default PostManage;
