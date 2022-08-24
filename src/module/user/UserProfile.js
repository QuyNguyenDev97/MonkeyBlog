import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ActionEdit from "../../component/action/ActionEdit";
import ActionView from "../../component/action/ActionView";
import Button from "../../component/button/Button";
import Field from "../../component/field/Field";
import ImageUpload from "../../component/image/ImageUpload";
import Input from "../../component/input/Input";
import Label from "../../component/label/Label";
import Table from "../../component/table/Table";
import Textarea from "../../component/textarea/Textarea";
import { useAuth } from "../../context/authContext";
import { auth, db } from "../../firebase-data/firebaseConfig";
import useChangeDate from "../../hook/useChangeDate";
import useFirebaseImage from "../../hook/useFirebaseImage";
import Heading from "../../layout/Heading";
import { userRole, userStatus } from "../../utils/constants";
import PostAddNewForUser from "../post/PostAddNewForUser";
import PostUpdateForUser from "../post/PostUpdateForUser";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ActionDelete from "../../component/action/ActionDelete";

const schema = yup.object({
  firstname: yup
    .string()
    .min(3, "Your first name must be at least 4 characters")
    .required("Please inter your first name"),
  lastname: yup
    .string()
    .min(3, "Your last name must be at least 4 characters")
    .required("Please inter your last name"),
  description: yup
    .string()
    .min(10, "Your description must be at least 10 characters")
    .required("Please inter your description"),
});

const UserProfile = () => {
  const { userInfo } = useAuth();
  const scollElement = useRef();
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState("");
  const [update, setUpdate] = useState(false);
  const { changeDate } = useChangeDate();
  const {
    control,
    setValue,
    handleSubmit,
    getValues,
    formState: { isValid, isSubmitting, errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      lastname: "",
      firstname: "",
      description: "",
    },
  });
  const navigate = useNavigate();
  const imageUrl = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  const userId = userInfo?.uid;
  const deleteAvatar = async () => {
    const colRef = doc(db, "users", userId);
    await updateDoc(colRef, {
      avatar: "",
    });
  };
  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, imageName, deleteAvatar);
  const handleUpdateUser = async (values) => {
    if (errors.length > 0) return;
    const { description } = values;
    const cloneFirstname =
      values.firstname[0].toUpperCase() + values.firstname.substring(1);
    const cloneLastname =
      values.lastname[0].toUpperCase() + values.lastname.substring(1);
    const colRef = doc(db, "users", userId);
    await updateDoc(colRef, {
      fullname: cloneFirstname + " " + cloneLastname,
      firstname: cloneFirstname,
      lastname: cloneLastname,
      description,
      avatar: image,
    });
    toast.success("Update user successfully !");
  };
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  useEffect(() => {
    const colRef = collection(db, "users");
    const queries = query(colRef, where("email", "==", userInfo?.email || ""));
    onSnapshot(queries, (snapshot) => {
      const result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserData(result);
    });
  }, [userInfo.email]);

  const handleDeleteUser = async () => {
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      userInfo.password
    );
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
        const resultFb = await reauthenticateWithCredential(
          auth.currentUser,
          credential
        );
        const colRef = doc(db, "users", userData[0]?.id);
        await deleteDoc(colRef);
        await deleteUser(resultFb.user);
        Swal.fire("Deleted!", "Your account has been deleted.", "success");
        navigate("/");
      }
    });
  };

  const handleShowUpdatePostForm = (postId) => {
    window.scrollTo(0, scollElement?.current?.offsetTop - "120");
    setPostId(postId);
    setUpdate(true);
  };

  const handleShowAddPostForm = () => {
    window.scrollTo(0, scollElement?.current?.offsetTop - "120");
    setUpdate(false);
  };

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
    setUpdate(false);
  };

  useEffect(() => {
    const errorArr = Object.values(errors);
    if (errorArr.length > 0 && isSubmitting) {
      toast.error(errorArr[0]?.message, {
        pauseOnHover: false,
      });
    }
  }, [errors, isSubmitting]);

  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);

  useEffect(() => {
    async function updateUser() {
      if (!userId) return;
      const colRef = doc(db, "users", userId);
      const currentDoc = await getDoc(colRef, "users", userId);
      reset(currentDoc.data());
    }
    updateUser();
  }, [reset, userId]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const userEmail = userInfo?.email;
    const queries = query(colRef, where("emailUser", "==", userEmail || ""));
    onSnapshot(queries, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) =>
        result.push({
          id: doc.id,
          ...doc.data(),
        })
      );
      setPosts(result);
    });
  }, [userInfo?.email]);
  if (!userInfo) return null;
  return (
    <div className="container">
      <form autoComplete="off" onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="flex py-10 mb-10 sm:flex-col gap-x-10">
          <div className="p-10 rounded-lg shadow-lg bg-gray-50">
            <div className="w-[300px] sm:w-full lg:w-full sm:h-[300px] h-[300px] mb-5">
              <ImageUpload
                onChange={handleSelectImage}
                handleDeleteImage={handleDeleteImage}
                hasProgress={false}
                progress={progress}
                image={image}
                className=""
              ></ImageUpload>
            </div>
            <div className="flex flex-col p-5 text-lg font-normal gap-x-20 whitespace-nowrap">
              <div className="flex items-center justify-between">
                <p className="font-medium">Name</p>
                <p className="text-base font-medium text-gray-400">
                  {userInfo?.fullname}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium">E-mail</p>
                <p className="text-base font-medium text-gray-400">
                  {userInfo?.email}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium">Status</p>
                <p className="text-base font-medium text-gray-400">
                  {userInfo?.status === userStatus.ACTIVE && "Active"}
                  {userInfo?.status === userStatus.BAN && "Ban"}
                  {userInfo?.status === userStatus.PENDING && "Pending"}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium">Role</p>
                <p className="text-base font-medium text-gray-400">
                  {userInfo?.role === userRole.ADMIN && "Admin"}
                  {userInfo?.role === userRole.MOD && "Moder"}
                  {userInfo?.role === userRole.USER && "User Member"}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium">Create at</p>
                <p className="text-base font-medium text-gray-400">
                  {changeDate(userInfo?.createAt?.seconds)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 px-10 py-10 shadow-lg rounded-xl bg-green-50">
            <div className="mb-10 ">
              <div className="form-layout sm:!block">
                <Field>
                  <Label>First Name</Label>
                  <Input
                    name="firstname"
                    placeholder="Enter your firstname"
                    control={control}
                  ></Input>
                </Field>
                <Field>
                  <Label>Last Name</Label>
                  <Input
                    name="lastname"
                    placeholder="Enter your lastname"
                    control={control}
                  ></Input>
                </Field>
              </div>
              <Field>
                <Label>Decription</Label>
                <Textarea
                  name="description"
                  placeholder="Enter your description..."
                  control={control}
                ></Textarea>
              </Field>
            </div>
            <div className="flex justify-between gap-x-2">
              <Button
                className="max-w-[180px] lg:!text-xs lg:max-w-[80px] lg:max-h-[40px] sm:max-w-[80px] sm:max-h-[40px] sm:!text-xs max-h-[60px]"
                disabled={isSubmitting}
                isLoading={isSubmitting}
                type="submit"
              >
                Update User
              </Button>
              <Button
                className="max-w-[180px] max-h-[60px] lg:!text-xs lg:max-w-[80px] lg:max-h-[40px] !bg-none !bg-red-500 sm:max-w-[80px] sm:max-h-[40px] sm:!text-xs"
                type="button"
                onClick={handleDeleteUser}
              >
                Delete User
              </Button>
              <Button
                className="max-w-[180px] max-h-[60px] lg:!text-xs lg:max-w-[80px] lg:max-h-[40px] !bg-none !bg-blue-500 sm:max-w-[80px] sm:max-h-[40px] sm:!text-xs"
                type="button"
                onClick={() => {
                  if (!userInfo.description || !userInfo.avatar) {
                    toast.error(
                      "Please update your information before adding new post !"
                    );
                    window.scroll(0, 0);
                    return;
                  }
                  handleShowAddPostForm();
                }}
              >
                Add Post
              </Button>
            </div>
          </div>
        </div>
      </form>
      <div className="mb-20">
        <Heading>Your posts</Heading>
        {posts.length <= 0 && (
          <div className="h-[300px] rounded-xl flex items-center justify-center bg-green-50 shadow-custome mb-10">
            <p className="text-2xl text-gray-400">You dont have any posts !</p>
          </div>
        )}
        {posts.length > 0 && (
          <Table className="h-[300px] !bg-green-50 shadow-custome mb-10">
            <thead>
              <tr>
                <th className="sm:hidden lg:hidden">Id</th>
                <th>Post</th>
                <th className="sm:hidden lg:hidden">Category</th>
                <th className="sm:hidden lg:hidden">Author</th>
                <th className="sm:hidden">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts &&
                posts.map((post) => (
                  <tr key={post?.id}>
                    <td className="sm:hidden lg:hidden" title={post?.id}>
                      {post?.id.slice(0, 5) + "..."}
                    </td>
                    <td>
                      <div className="flex items-center gap-x-3">
                        <img
                          src={post?.image}
                          alt=""
                          className="w-[66px] h-[55px] rounded object-cover"
                        />
                        <div className="flex-1">
                          <h3
                            className="font-semibold cursor-pointer sm:text-xs"
                            title={post?.title}
                            onClick={() => navigate(`/blog/${post?.slug}`)}
                          >
                            {post?.title.slice(0, 30) + "..."}
                          </h3>
                          <time className="text-sm text-gray-500">
                            {"Date: " + changeDate(post?.createdAt?.seconds)}
                          </time>
                        </div>
                      </div>
                    </td>
                    <td className="sm:hidden lg:hidden">
                      <span className="text-gray-500 ">
                        {post?.category?.name}
                      </span>
                    </td>
                    <td className="sm:hidden lg:hidden">
                      <span className="text-gray-500 ">
                        {post?.user?.username}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center text-gray-500 sm:hidden gap-x-3">
                        <ActionView
                          onClick={() => navigate(`/blog/${post?.slug}`)}
                        ></ActionView>
                        <ActionEdit
                          onClick={() => handleShowUpdatePostForm(post?.id)}
                        ></ActionEdit>
                        <ActionDelete
                          onClick={() => handleDeletePost(post?.id)}
                        ></ActionDelete>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </div>
      <div className="update-container" ref={scollElement}>
        {update ? (
          <div className="mb-20">
            <Heading>Update post</Heading>
            <PostUpdateForUser
              hidden={true}
              postId={postId}
            ></PostUpdateForUser>
          </div>
        ) : (
          <div className="mb-20">
            <Heading>Add a new post</Heading>
            <PostAddNewForUser hidden={true}></PostAddNewForUser>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
