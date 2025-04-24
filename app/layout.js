"use client";
import Providers from "./redux/configuration/providers";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
// const DynamicFooter = dynamic(() => import("./components/footer"));
// const DynamicHeader = dynamic(() => import("./components/header"));

export default function RootLayout({ children }) {
  const path = usePathname();

  const isDynamicRoute = (path) => {
    const dynamicRoutes = [
      "/set-new-password/",
      // "/create-request/",
      // "/becomeADonor/",
      // "/create-campaign/",
    ];

    return dynamicRoutes.some((route) => path.startsWith(route));
  };

  // const routesToHideHeader = [
  //   "/verify-email",
  //   "/forgot-password",
  //   "/login",
  //   "/signin",
  //   "/signup",
  //   "/verify-number",
  //   "/tells-us-about",
  //   "/set-new-password",
  //   // "/sell-property",
  //   // "/sell-property/[id]",
  // ];
  // const routesToHideFooter = [
  //   "/sell-property",
  //   "/sell-property/[id]",
  //   "/verify-email",
  //   "/forgot-password",
  //   "/login",
  //   "/signin",
  //   "/signup",
  //   "/verify-number",
  //   "/tells-us-about",
  //   "/set-new-password",
  //   "/sell-property",
  //   "/sell-property/[id]",
  //   // "/login",
  //   // "/create-request",
  //   // "/signupEmail",
  //   // "/verifyOtp",
  //   // "/verifyEmail",
  //   // "/exploreRequests",
  //   // "/myOrganizations/createOrganization",
  //   // "/userInfo",
  //   // "/loginMultipleEmails",
  //   // "/forgotPassword",
  //   // "/addOrganization",
  //   // "/create-campaign",
  //   // "/create-campaign/[id]",
  //   // "/createProfile",
  //   // "/doctor-overView",
  //   // "/settings/user-profile",
  //   // "/hospital-overView",
  //   // "/testScroll",
  // ];

  // const shouldHideHeader =
  //   routesToHideHeader.includes(path) || isDynamicRoute(path);
  // const shouldHideFooter =
  //   routesToHideFooter.includes(path) || isDynamicRoute(path);
  return (
    <html lang="en">
      <body>
        <Providers>
          <ToastContainer />
          {/* {!shouldHideHeader && <DynamicHeader />} */}
          {children}
          {/* {!shouldHideFooter && <DynamicFooter />} */}
        </Providers>
      </body>
    </html>
  );
}
