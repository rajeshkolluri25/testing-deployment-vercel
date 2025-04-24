import dynamic from "next/dynamic";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import Messages from "../pages/Messages";

// const DynamicPageSignUP = dynamic(() =>
//   import("../components/authentication/signup")
// );

const page = () => {
  return (
    <>
      <DashboardLayout>
      <Messages />
      </DashboardLayout>
    </>
  );
};

export default page;
