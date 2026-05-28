import { zodResolver } from "@hookform/resolvers/zod";
import { Music2 } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { login } from "../../features/auth/authSlice";
import { loginSchema } from "../../utils/validators";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const loading = useSelector((state) => state.auth.loading);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values) => {
    const res = await dispatch(login(values));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Đăng nhập thành công");
      navigate(location.state?.from?.pathname || "/");
    } else toast.error(res.payload);
  };

  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 p-4 dark:bg-slate-950">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-md bg-violet-600 text-white"><Music2 /></div>
          <div><h1 className="text-xl font-bold">Đăng nhập</h1><p className="text-sm text-slate-500">Trở lại VietMusic</p></div>
        </div>
        <div className="space-y-4">
          <Input label="Email" {...register("email")} error={errors.email?.message} />
          <Input label="Mật khẩu" type="password" {...register("password")} error={errors.password?.message} />
          <Button className="w-full" disabled={loading}>{loading ? "Đang xử lý..." : "Đăng nhập"}</Button>
        </div>
        <p className="mt-5 text-center text-sm text-slate-500">Chưa có tài khoản? <Link className="font-semibold text-violet-600" to="/register">Đăng ký</Link></p>
      </form>
    </div>
  );
}
