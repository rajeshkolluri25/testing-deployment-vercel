import dynamic from "next/dynamic";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import Users from "../pages/Users";

// const DynamicPageSignUP = dynamic(() =>
//   import("../components/authentication/signup")
// );

const page = () => {
  return (
    <>
      <DashboardLayout>
      <Users />
      </DashboardLayout>
    </>
  );
};

export default page;
