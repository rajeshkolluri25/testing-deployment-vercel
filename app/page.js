import { DashboardLayout } from "./components/layout/DashboardLayout";
import Index from "./pages/Index";
import "./index.css";

export default function Home() {
  return (
    <>
     <DashboardLayout>
      <Index />
     </DashboardLayout>
    </>
  );
}
