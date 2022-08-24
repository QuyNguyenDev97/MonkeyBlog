import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../component/button/Button";
import Radio from "../../component/checkbox/Radio";
import Field from "../../component/field/Field";
import FieldCheckboxes from "../../component/field/FieldCheckboxes";
import ImageUpload from "../../component/image/ImageUpload";
import Input from "../../component/input/Input";
import Label from "../../component/label/Label";
import { db } from "../../firebase-data/firebaseConfig";
import useFirebaseImage from "../../hook/useFirebaseImage";
import { userRole, userStatus } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";
import { toast } from "react-toastify";
import Textarea from "../../component/textarea/Textarea";

const UserUpdate = () => {
  const {
    control,
    setValue,
    handleSubmit,
    getValues,
    formState: { isSubmitting, errors },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      username: "",
      status: Number(userStatus.PENDING),
      role: Number(userRole.USER),
    },
  });

  const watchRole = watch("role");
  const watchStatus = watch("status");
  const imageUrl = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";

  const [params] = useSearchParams();
  const navigate = useNavigate();
  const userId = params.get("id");
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
    const { role, status, description } = values;
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
      status: Number(status),
      role: Number(role),
      avatar: image,
    });
    toast.success("Update user successfully !");
    navigate("/manage/user");
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const colRef = doc(db, "users", userId);
  //     const userData = await getDoc(colRef);
  //     const userRef = collection(db, "posts");
  //     const queries = query(userRef, where("user.email", "==", email));
  //     onSnapshot(queries, (snapshot) => {
  //       snapshot.forEach(async (docRef) => {
  //         const postRef = doc(db, "posts", docRef.id);
  //         setNewUser({
  //           avatar: userData?.data().avatar,
  //           ...docRef.data().user,
  //         });
  //         await updateDoc(postRef, {
  //           user: newUser,
  //         });
  //       });
  //     });
  //   };
  //   fetchData();
  // }, [email, newUser, userId]);

  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);

  useEffect(() => {
    async function updateUser() {
      const colRef = doc(db, "users", userId);
      const currentDoc = await getDoc(colRef, "users", userId);
      reset(currentDoc.data());
    }
    updateUser();
  }, [reset, userId]);
  if (!userId) return null;
  return (
    <div>
      <DashboardHeading
        title="Update user"
        desc={`Update users information id : ${userId}`}
      ></DashboardHeading>
      <form autoComplete="off" onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="mb-10 w-[200px] h-[200px] mx-auto rounded-full">
          <ImageUpload
            onChange={handleSelectImage}
            handleDeleteImage={handleDeleteImage}
            hasProgress={false}
            progress={progress}
            image={image}
            className="!rounded-full "
          ></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label htmlFor="firstname">First Name</Label>
            <Input
              name="firstname"
              placeholder="Enter your first name"
              control={control}
            ></Input>
          </Field>
          <Field htmlFor="lastname">
            <Label>Last Name</Label>
            <Input
              name="lastname"
              placeholder="Enter your last name"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="mb-20">
          <Field>
            <Label htmlFor="username">User Name</Label>
            <Input
              name="username"
              placeholder="Enter your user name"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="mb-20">
          <Field>
            <Label htmlFor="description">Decription</Label>
            <Textarea
              name="description"
              placeholder="Enter your description..."
              control={control}
            ></Textarea>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.PENDING}
                value={userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.BAN}
                value={userStatus.BAN}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.ADMIN}
                value={userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.MOD}
                value={userRole.MOD}
              >
                Mod
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.USER}
                value={userRole.USER}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button disabled={isSubmitting} isLoading={isSubmitting} type="submit">
          Update this user
        </Button>
      </form>
    </div>
  );
};

export default UserUpdate;
