import React, { useEffect } from "react";
import Input from "../component/input/Input";
import Label from "../component/label/Label";
import Field from "../component/field/Field";
import Button from "../component/button/Button";
import AuthenPage from "./AuthenPage";
import IconTogglePassword from "../component/icon/IconTogglePassword";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase-data/firebaseConfig";
import { NavLink, useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import slugify from "slugify";
import { userRole, userStatus } from "../utils/constants";

const schema = yup.object({
  firstname: yup.string().required("Please inter your first name"),
  lastname: yup.string().required("Please inter your last name"),
  email: yup
    .string()
    .email("Please inter valid email address")
    .required("Please inter your email"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters")
    .required("Please inter your password"),
});
const SignUpPage = () => {
  const navigate = useNavigate();
  const [togglePassword, setTogglePassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleSignUp = async (values) => {
    if (!isValid) return;
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    const cloneFirstname =
      values.firstname[0].toUpperCase() + values.firstname.substring(1);
    const cloneLastname =
      values.lastname[0].toUpperCase() + values.lastname.substring(1);

    await setDoc(doc(db, "users", auth.currentUser.uid), {
      fullname: cloneFirstname + " " + cloneLastname,
      firstname: cloneFirstname,
      lastname: cloneLastname,
      email: values.email,
      password: values.password,
      username: slugify(values.firstname + " " + values.lastname, {
        lower: true,
      }),
      avatar: "",
      bookMark: [],
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createAt: serverTimestamp(),
    });
    navigate("/blog");
    toast.success("Registration successful!");
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
    document.title = "Register Page";
  }, []);
  return (
    <AuthenPage
      title="Get started in minutes"
      description="First, let's create your account. Once your account has been created you can choose the billing plan that is right for you and link your account with a server provider."
    >
      <form
        className="form"
        autoComplete="off"
        onSubmit={handleSubmit(handleSignUp)}
        noValidate
      >
        <div className="flex sm:mb-10 sm:flex-col gap-x-10">
          <Field className="flex-1">
            <Label className="!text-lg" htmlFor="firstname">
              First Name
            </Label>
            <Input
              name="firstname"
              type="text"
              placeholder="Inter your first name..."
              control={control}
              className="!bg-white"
            ></Input>
          </Field>
          <Field className="flex-1">
            <Label className="!text-lg" htmlFor="lastname">
              Last Name
            </Label>
            <Input
              name="lastname"
              type="text"
              placeholder="Inter your last name..."
              control={control}
              className="!bg-white"
            ></Input>
          </Field>
        </div>
        <Field>
          <Label className="!text-lg" htmlFor="email">
            E-mail
          </Label>
          <Input
            name="email"
            type="email"
            placeholder="Inter your email..."
            control={control}
            className="!bg-white"
          ></Input>
        </Field>
        <Field>
          <Label className="!text-lg" htmlFor="password">
            Password
          </Label>
          <Input
            name="password"
            type={togglePassword ? "text" : "password"}
            placeholder="Inter your password..."
            control={control}
            className="!bg-white"
          >
            <IconTogglePassword
              togglePassword={togglePassword}
              onClick={() => setTogglePassword(!togglePassword)}
            ></IconTogglePassword>
          </Input>
        </Field>
        <div className="have-account">
          You already have a account ? <NavLink to="/sign-in">Login</NavLink>
        </div>
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          style={{
            maxWidth: 350,
            margin: "0 auto",
          }}
        >
          Sign Up
        </Button>
      </form>
    </AuthenPage>
  );
};

export default SignUpPage;
