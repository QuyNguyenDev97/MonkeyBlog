import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import useFirebaseImage from "../../hook/useFirebaseImage";
import ImageUploader from "quill-image-uploader";
import { toast } from "react-toastify";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { imgbbAPI, postStatus } from "../../utils/constants";
import Radio from "../../component/checkbox/Radio";
import Field from "../../component/field/Field";
import Label from "../../component/label/Label";
import Toggle from "../../component/toggle/Toggle";
import Option from "../../component/dropdown/Option";
import List from "../../component/dropdown/List";
import Select from "../../component/dropdown/Select";
import Dropdown from "../../component/dropdown/Dropdown";
import ImageUpload from "../../component/image/ImageUpload";
import Input from "../../component/input/Input";
import { db } from "../../firebase-data/firebaseConfig";
import Button from "../../component/button/Button";
import DashboardHeading from "../dashboard/DashboardHeading";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../context/authContext";

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

Quill.register("modules/imageUploader", ImageUploader);

const PostUpdateForUser = ({ postId, hidden }) => {
  const { userInfo } = useAuth();
  const [content, setContent] = useState("");
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

  //   hangleImagePost
  const deletePostImage = async () => {
    const colRef = doc(db, "post", postId);
    await updateDoc(colRef, {
      avatar: "",
    });
  };
  const imageUrl = getValues("image");
  const imageName = getValues("image_name");
  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, imageName, deletePostImage);
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  // end handleImagePost

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

  //   handleCategory
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const handleClickOption = async (item) => {
    const colRef = doc(db, "categories", item.id);
    const docDate = await getDoc(colRef);
    setValue("category", {
      id: docDate.id,
      ...docDate.data(),
    });
    setSelectCategory(item);
  };

  useEffect(() => {
    async function getCategory() {
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
    getCategory();
  }, []);
  //   end handleCategory

  // get current post
  useEffect(() => {
    async function getData() {
      if (!postId) return;
      const docRef = doc(db, "posts", postId);
      const currentDoc = await getDoc(docRef);
      if (currentDoc.data()) {
        reset(currentDoc.data());
        setSelectCategory(currentDoc.data()?.category || "");
        setContent(currentDoc.data()?.content || "");
      }
    }
    getData();
  }, [postId, reset]);
  // end get current post

  useEffect(() => {
    document.title = "Monkey blogging - Update post";
  }, []);

  const updatePostHandler = async (values) => {
    if (errors.length > 0) return;
    const docRef = doc(db, "posts", postId);
    await updateDoc(docRef, {
      content: values.content,
      image: values.image,
      description: values.description || values.title,
      status: Number(values.status),
      ...values,
    });
    toast.success("Update post successfully!");
  };

  useEffect(() => {
    setValue("content", content);
  }, [content, setValue]);

  useEffect(() => {
    setValue("image", image);
  }, [image, setValue]);

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
    <div>
      <DashboardHeading
        title="Update Post"
        desc={`Update your post content id: ${postId}`}
        hidden={true}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(updatePostHandler)}>
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
              value={content}
              onChange={setContent}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="mx-auto"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Update post
        </Button>
      </form>
    </div>
  );
};

export default PostUpdateForUser;
