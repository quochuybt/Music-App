import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export default function AdminLayout() {
  return (
    <div className="min-h-[100dvh] text-slate-50">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminTopbar />
        <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8"><Outlet /></main>
      </div>
    </div>
  );
}
