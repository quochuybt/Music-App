import { zodResolver } from "@hookform/resolvers/zod";
import { Music2 } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { register as registerUser } from "../../features/auth/authSlice";
import { registerSchema } from "../../utils/validators";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(registerSchema) });
  const onSubmit = async (values) => {
    const res = await dispatch(registerUser(values));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Đăng ký thành công");
      navigate("/login");
    } else toast.error(res.payload);
  };
  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 p-4 dark:bg-slate-950">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-md bg-cyan-500 text-white"><Music2 /></div>
          <div><h1 className="text-xl font-bold">Tạo tài khoản</h1><p className="text-sm text-slate-500">Bắt đầu nghe nhạc Việt</p></div>
        </div>
        <div className="space-y-4">
          <Input label="Họ tên" {...register("fullName")} error={errors.fullName?.message} />
          <Input label="Email" {...register("email")} error={errors.email?.message} />
          <Input label="Mật khẩu" type="password" {...register("password")} error={errors.password?.message} />
          <Input label="Xác nhận mật khẩu" type="password" {...register("confirmPassword")} error={errors.confirmPassword?.message} />
          <Button className="w-full" disabled={loading}>{loading ? "Đang xử lý..." : "Đăng ký"}</Button>
        </div>
        <p className="mt-5 text-center text-sm text-slate-500">Đã có tài khoản? <Link className="font-semibold text-violet-600" to="/login">Đăng nhập</Link></p>
      </form>
    </div>
  );
}
