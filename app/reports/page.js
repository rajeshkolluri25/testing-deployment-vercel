import dynamic from "next/dynamic";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import Reports from "../pages/Reports";

// const DynamicPageSignUP = dynamic(() =>
//   import("../components/authentication/signup")
// );

const page = () => {
  return (
    <>
      <DashboardLayout>
        <Reports />
      </DashboardLayout>
    </>
  );
};

export default page;
