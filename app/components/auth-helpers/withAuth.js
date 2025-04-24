"use client";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { setPathUrl } from "@/app/redux/storage/storageSlice";
import { parseJsonCookie } from "@/app/utils";

export default function withAuth(Component, params) {
  return function WithAuth(props) {
    const router = useRouter();
    const dispatch = useDispatch();

    useLayoutEffect(() => {
      try {
        const userToken = parseJsonCookie("zenrthUserToken");

        if (!userToken || Object.keys(userToken).length === 0) {
          if (params?.path) {
            dispatch(setPathUrl({ pathUrl: params?.path }));
          }

          router.push("/login");
        }
      } catch (error) {
        console.error("Error parsing userToken:", error);
        router.push("/login");
      }
    }, [router, dispatch]); // ✅ include `dispatch` in dependency array

    return <Component {...props} />;
  };
}
