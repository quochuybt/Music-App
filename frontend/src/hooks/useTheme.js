import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";

export const useTheme = () => {
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  return { mode, toggleTheme: () => dispatch(toggleTheme()) };
};
