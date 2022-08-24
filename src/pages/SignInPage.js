import React, { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { NavLink, useNavigate } from "react-router-dom";
import AuthenPage from "./AuthenPage";
import Field from "../component/field/Field";
import Label from "../component/label/Label";
import Input from "../component/input/Input";
import IconTogglePassword from "../component/icon/IconTogglePassword";
import Button from "../component/button/Button";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-data/firebaseConfig";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  email: yup
    .string()
    .email("Please inter valid email address")
    .required("Please inter your email"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters")
    .required("Please inter your password"),
});

// resolver: yupResolver(schema),

//  useEffect(() => {
//    const errorArr = Object.values(errors);
//    if (errorArr.length > 0 && isSubmitting) {
//      toast.error(errorArr[0]?.message, {
//        pauseOnHover: false,
//      });
//    }
//  }, [errors, isSubmitting]);

const SignInPage = () => {
  const { userInfo } = useAuth();
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

  const handleSignIn = async (values) => {
    if (!isValid) return;
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast.success("Login successful!");
      navigate("/blog");
    } catch (error) {
      toast.error("The e-mail or password you entered is incorrect !");
    }
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
    document.title = "Login Page";
    if (userInfo?.email) {
      navigate("/");
    } else {
      navigate("/sign-in");
    }
  }, [navigate, userInfo?.email]);
  return (
    <AuthenPage
      title="Sign in to continue access"
      description="Welcome ! Enter your details to get signed in to your account"
    >
      <form
        className="form"
        autoComplete="off"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Field>
          <Label className="!text-lg" htmlFor="email">
            Email
          </Label>
          <Input
            name="email"
            type="text"
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
          You don't have a account ? <NavLink to="/sign-up">Register</NavLink>
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
          Sign In
        </Button>
      </form>
    </AuthenPage>
  );
};

export default SignInPage;
