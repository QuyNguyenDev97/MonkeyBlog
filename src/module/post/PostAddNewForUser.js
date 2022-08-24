import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../component/button/Button";
import Dropdown from "../../component/dropdown/Dropdown";
import Option from "../../component/dropdown/Option";
import Field from "../../component/field/Field";
import Input from "../../component/input/Input";
import Label from "../../component/label/Label";
import { imgbbAPI, userStatus } from "../../utils/constants";
import ImageUpload from "../../component/image/ImageUpload";
import useFirebaseImage from "../../hook/useFirebaseImage";
import Select from "../../component/dropdown/Select";
import List from "../../component/dropdown/List";
import { useEffect } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-data/firebaseConfig";
import slugify from "slugify";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authContext";
import DashboardHeading from "../dashboard/DashboardHeading";
import axios from "axios";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  title: yup
    .string()
    .min(10, "Your title must be at least 10 characters")
    .required("Please inter your title"),
  image: yup.string().required("Please inter a banner image"),
  content: yup
    .string()
    .min(50, "Your content must be at least 50 characters")
    .required("Please inter your content"),
  description: yup
    .string()
    .min(10, "Your content must be at least 10 characters")
    .required("Please inter your post description"),
  category: yup.object().shape({
    name: yup.string().required("Please choose a category"),
  }),
});
const PostAddNewStyles = styled.div``;
Quill.register("modules/imageUploader", ImageUploader);
const PostAddNewForUser = ({ hidden }) => {
  const { userInfo } = useAuth();
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [contentPost, setContentPost] = useState("");
  const {
    formState: { isSubmitting, errors },
    control,
    setValue,
    handleSubmit,
    getValues,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      category: {},
      hot: false,
      image: "",
      content: "",
      description: "",
    },
  });
  const {
    image,
    progress,
    handleSelectImage,
    handleDeleteImage,
    handleResetUpload,
  } = useFirebaseImage(setValue, getValues);
  const addPostHandler = async (values) => {
    console.log("addPostHandler ~ values", values);
    if (errors.length > 0) return;
    if (!userInfo.description || !userInfo.avatar) {
      toast.error("Please update your information before adding new post !");
      window.scroll(0, 0);
      return;
    }
    if (!userInfo.email) return;
    const cloneValues = { ...values };
    cloneValues.slug = slugify(values.slug || values.title, { lower: true });
    cloneValues.status = Number(values.status);
    cloneValues.description = values.description || values.title;
    const colRef = collection(db, "posts");
    await addDoc(colRef, {
      ...cloneValues,
      description: cloneValues.description,
      hot: false,
      status: Number(userStatus?.PENDING),
      emailUser: userInfo?.email,
      nameUser: userInfo?.fullname,
      categoryId: cloneValues?.category?.id,
      userId: cloneValues?.user?.id,
      content: cloneValues?.content,
      image: cloneValues?.image,
      likes: 0,
      peopleLike: [],
      createdAt: serverTimestamp(),
    });
    toast.success("Create new post successfully!");
    reset({
      title: "",
      slug: "",
      status: 2,
      category: {},
      hot: false,
      image: "",
      user: {},
      content: "",
      description: "",
    });
    setContentPost("");
    handleResetUpload();
    setSelectCategory({});
  };
  useEffect(() => {
    if (!errors && errors.length <= 0) return;
    const errorArr = Object.values(errors);
    if (errorArr.length > 0 && errorArr[0].message) {
      toast.error(errorArr[0]?.message, {
        pauseOnHover: false,
      });
      return;
    }
    if (errorArr[0]?.name.message) {
      toast.error(errorArr[0]?.name?.message, {
        pauseOnHover: false,
      });
      return;
    }
  }, [errors]);

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(result);
    }
    getData();
  }, []);

  useEffect(() => {
    document.title = "Monkey blogging - Add new post";
  }, []);

  useEffect(() => {
    setValue("content", contentPost);
  }, [contentPost, setValue]);

  useEffect(() => {
    setValue("image", image);
  }, [image, setValue]);

  useEffect(() => {
    async function fetchUserData() {
      if (!userInfo.email) return;
      const colRef = collection(db, "users");
      const q = query(colRef, where("email", "==", userInfo.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setValue("user", {
          id: doc.id,
          avatar: userInfo.avatar,
          ...doc.data(),
        });
      });
    }
    fetchUserData();
  }, [setValue, userInfo.avatar, userInfo.email]);

  const handleClickOption = async (item) => {
    const colRef = doc(db, "categories", item.id);
    const docDate = await getDoc(colRef);
    setValue("category", {
      id: docDate.id,
      ...docDate.data(),
    });
    setSelectCategory(item);
  };

  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        // imgbbAPI
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);
          const response = await axios({
            method: "post",
            url: imgbbAPI,
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return response.data.data.url;
        },
      },
    }),
    []
  );

  return (
    <PostAddNewStyles>
      <DashboardHeading
        hidden={hidden}
        title="Add new post"
        desc="Add a new post content"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <Field>
          <Label>Post Description</Label>
          <Input
            control={control}
            placeholder="Enter your post description"
            name="description"
          ></Input>
        </Field>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
              className="h-[250px]"
              progress={progress}
              image={image}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Select placeholder="Select the category"></Select>
              <List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Option
                      key={item.id}
                      onClick={() => handleClickOption(item)}
                    >
                      {item.name}
                    </Option>
                  ))}
              </List>
            </Dropdown>
            {selectCategory?.name && (
              <span className="inline-block p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50">
                {selectCategory?.name}
              </span>
            )}
          </Field>
        </div>
        <div className="mb-10">
          <Label>Content</Label>
          <div className="mt-5 entry-content">
            <ReactQuill
              modules={modules}
              placeholder="Type your content here..."
              theme="snow"
              value={contentPost}
              onChange={setContentPost}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="mx-auto"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNewForUser;
