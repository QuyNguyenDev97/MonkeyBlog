import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../component/button/Button";
import Radio from "../../component/checkbox/Radio";
import Field from "../../component/field/Field";
import FieldCheckboxes from "../../component/field/FieldCheckboxes";
import ImageUpload from "../../component/image/ImageUpload";
import Input from "../../component/input/Input";
import Label from "../../component/label/Label";
import { auth, db } from "../../firebase-data/firebaseConfig";
import useFirebaseImage from "../../hook/useFirebaseImage";
import { userRole, userStatus } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";
import { toast } from "react-toastify";
import slugify from "slugify";
import IconTogglePassword from "../../component/icon/IconTogglePassword";
import Textarea from "../../component/textarea/Textarea";

const UserAddNew = () => {
  const {
    control,
    setValue,
    handleSubmit,
    getValues,
    formState: { isValid, isSubmitting },
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
  const [togglePassword, setTogglePassword] = useState(false);
  const {
    image,
    progress,
    handleSelectImage,
    handleDeleteImage,
    handleResetUpload,
  } = useFirebaseImage(setValue, getValues);
  const handleCreateUser = async (values) => {
    if (!isValid) return;
    try {
      const colRef = collection(db, "users");
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      await updateProfile(auth.currentUser, {
        displayName: values.firstname,
      });
      await addDoc(colRef, {
        fullname: values.fullname,
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
        description: values.description,
        bookMark: [],
        username: slugify(values.username || values.fullname, {
          lower: true,
          replacement: "",
          trim: true,
        }),
        avatar: image,
        status: Number(values.status),
        role: Number(values.role),
        createAt: serverTimestamp(),
      });
      toast.success("created user successfully !");
      handleResetUpload();
      reset({
        firstname: "",
        lastname: "",
        fullname: "",
        email: "",
        password: "",
        username: "",
        description: "",
        status: Number(userStatus.PENDING),
        role: Number(userRole.USER),
      });
    } catch (error) {
      toast.error("created user failed !");
    }
  };
  return (
    <div>
      <DashboardHeading
        title="New user"
        desc="Add new user to system"
      ></DashboardHeading>
      <form autoComplete="off" onSubmit={handleSubmit(handleCreateUser)}>
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
        <div className="form-layout">
          <Field>
            <Label>Full Name</Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>User Name</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>E-mail</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              type={togglePassword ? "text" : "password"}
              placeholder="Inter your password..."
              control={control}
            >
              <IconTogglePassword
                togglePassword={togglePassword}
                onClick={() => setTogglePassword(!togglePassword)}
              ></IconTogglePassword>
            </Input>
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
        <Field>
          <Label>Decription</Label>
          <Textarea
            name="description"
            placeholder="Enter your description..."
            control={control}
          ></Textarea>
        </Field>
        <Button disabled={isSubmitting} isLoading={isSubmitting} type="submit">
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;
