import { Link } from "react-router-dom";
import Button from "../common/Button";

export default function AdminTopbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 lg:px-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase text-slate-500">Admin console</p>
          <h1 className="text-lg font-bold">Quản trị VietMusic</h1>
        </div>
        <Link to="/"><Button variant="ghost">Trang người dùng</Button></Link>
      </div>
    </header>
  );
}
