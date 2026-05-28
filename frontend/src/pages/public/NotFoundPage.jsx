import { Link } from "react-router-dom";
import Button from "../../components/common/Button";

export default function NotFoundPage() {
  return <div className="grid min-h-[50vh] place-items-center text-center"><div><h1 className="text-4xl font-bold">404</h1><p className="mb-4 mt-2 text-slate-500">Trang không tồn tại.</p><Link to="/"><Button>Về trang chủ</Button></Link></div></div>;
}
