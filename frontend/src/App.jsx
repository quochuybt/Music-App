import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout } from "./features/auth/authSlice";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleUnauthorized = () => dispatch(logout());
    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, [dispatch]);

  return (
    <>
      <AppRoutes />
      <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
    </>
  );
}
