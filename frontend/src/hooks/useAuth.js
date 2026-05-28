import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

export const useAuth = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return { ...auth, logout: () => dispatch(logout()) };
};
