
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
