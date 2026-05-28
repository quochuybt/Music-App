import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminTopbar />
        <main className="mx-auto max-w-7xl px-4 py-6 lg:px-6"><Outlet /></main>
      </div>
    </div>
  );
}
