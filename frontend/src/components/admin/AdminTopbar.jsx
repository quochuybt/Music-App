import { Link } from "react-router-dom";
import Button from "../common/Button";

export default function AdminTopbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#080b10]/82 px-4 py-4 backdrop-blur-xl lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="page-kicker">Admin console</p>
          <h1 className="text-lg font-bold text-white">Quản trị VietMusic</h1>
        </div>
        <Link to="/"><Button variant="secondary">Trang người dùng</Button></Link>
      </div>
    </header>
  );
}
