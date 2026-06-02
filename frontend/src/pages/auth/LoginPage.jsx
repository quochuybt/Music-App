import { zodResolver } from "@hookform/resolvers/zod";
import { Radio } from "lucide-react";
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
    <div className="grid min-h-[100dvh] place-items-center p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="app-surface w-full max-w-md rounded-[2rem] p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-400 text-slate-950"><Radio /></div>
          <div><h1 className="text-xl font-bold text-white">Đăng nhập</h1><p className="text-sm text-slate-400">Trở lại VietMusic</p></div>
        </div>
        <div className="space-y-4">
          <Input label="Email" {...register("email")} error={errors.email?.message} />
          <Input label="Mật khẩu" type="password" {...register("password")} error={errors.password?.message} />
          <Button className="w-full" disabled={loading}>{loading ? "Đang xử lý..." : "Đăng nhập"}</Button>
        </div>
        <p className="mt-5 text-center text-sm text-slate-400">Chưa có tài khoản? <Link className="font-semibold text-emerald-300" to="/register">Đăng ký</Link></p>
      </form>
    </div>
  );
}
