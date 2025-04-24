import dynamic from "next/dynamic";
import Properties from "../pages/Properties";
import { DashboardLayout } from "../components/layout/DashboardLayout";

// const DynamicPageSignUP = dynamic(() =>
//   import("../components/authentication/signup")
// );

const page = () => {
  return (
    <>
      <DashboardLayout>
        <Properties />
      </DashboardLayout>
    </>
  );
};

export default page;
