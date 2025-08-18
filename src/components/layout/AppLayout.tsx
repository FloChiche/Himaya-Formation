import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/layout/app-sidebar";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar fixe à gauche */}
      <AppSidebar />

      {/* Zone de contenu à droite */}
      <div className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </div>
    </div>
  );
}
