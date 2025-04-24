import dynamic from "next/dynamic";
import AddProperty from "../pages/AddProperty";
import { DashboardLayout } from "../components/layout/DashboardLayout";

// const DynamicPageSignUP = dynamic(() =>
//   import("../components/authentication/signup")
// );

const page = () => {
  return (
    <>
      <DashboardLayout>
        <AddProperty />
      </DashboardLayout>
    </>
  );
};

export default page;
