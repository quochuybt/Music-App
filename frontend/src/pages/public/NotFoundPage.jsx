import { Link } from "react-router-dom";
import Button from "../../components/common/Button";

export default function NotFoundPage() {
  return (
    <div className="grid min-h-[56vh] place-items-center text-center">
      <div className="app-surface max-w-md rounded-[2rem] p-8">
        <h1 className="text-5xl font-extrabold text-white">404</h1>
        <p className="mb-5 mt-2 text-slate-400">Trang không tồn tại.</p>
        <Link to="/"><Button>Về trang chủ</Button></Link>
      </div>
    </div>
  );
}
