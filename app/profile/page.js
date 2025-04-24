import dynamic from "next/dynamic";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import Profile from "../pages/Profile";

// const DynamicPageSignUP = dynamic(() =>
//   import("../components/authentication/signup")
// );

const page = () => {
  return (
    <>
      <DashboardLayout>
        <Profile />
      </DashboardLayout>
    </>
  );
};

export default page;
