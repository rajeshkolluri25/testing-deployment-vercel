// components/custom/LoginDrawer.jsx

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "../../components/ui/drawer";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useLoginRequestMutation } from "../../../app/redux/authentication";

import { setAdminCookie } from "../../components/auth-helpers/cookie";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setAdminData } from "../../../app/redux/authentication/authUserSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
const schema = yup.object().shape({
  account: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
});

export const LoginDrawer = ({ onLogin }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [logInApi] = useLoginRequestMutation();
  const [loader, setLoader] = useState(false);

  // const onSubmit = async (details) => {
  //   setLoader(true);
  //   logInApi(details)
  //     .then((response) => {
  //       setLoader(false);
  //       if (response?.data?.statusCode == 200) {
  //         const tokenData = response?.data?.data;
  //         console.log("Token data", tokenData);
  //         setAdminCookie("zenrthAdminToken", tokenData, 7);
  //         setAdminCookie(
  //           "adminToken",
  //           { token_detail: tokenData?.token_detail },
  //           7
  //         );
  //         dispatch(setAdminData(tokenData));
  //         toast.success("Successfully logged in");
  //         setLoginOpen?.(false);
  //         reset();
  //       } else if (response?.error?.data?.statusCode === 500) {
  //         toast.error(response?.error?.data?.message || "Something went wrong");
  //       }
  //     })
  //     .catch((err) => {
  //       setLoader(false);
  //       console.error("Login error", err);
  //       toast.error("Login failed. Please try again.");
  //     });
  // };
  const onSubmit = async (details) => {
    setLoader(true);

    logInApi(details)
      .then((response) => {
        setLoader(false);

        const statusCode = response?.data?.statusCode;
        const tokenData = response?.data?.data;

        if (statusCode === 200 && tokenData?.token_detail) {
          console.log("Token data", tokenData);
          setAdminCookie("zenrthAdminToken", tokenData, 7);
          setAdminCookie(
            "adminToken",
            { token_detail: tokenData?.token_detail },
            7
          );
          dispatch(setAdminData(tokenData));
          toast.success("Successfully logged in");
          router.push("/");
          reset();
          return;
        }
        toast.error(
          response?.data?.message || "Login failed. Please try again."
        );
      })
      .catch((err) => {
        setLoader(false);
        console.error("Login error", err);
        toast.error("Login failed. Please try again.");
      });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2">
          Login
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Login</DrawerTitle>
          <DrawerDescription>
            Enter your credentials to access the dashboard.
          </DrawerDescription>
        </DrawerHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="px-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="account"
              type="email"
              placeholder="example@mail.com"
              {...register("account")}
            />
            {errors.account && (
              <p className="text-sm text-red-500">{errors.account.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <DrawerFooter>
            <Button type="submit" disabled={loader}>
              {loader ? "Logging in..." : "Login"}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
