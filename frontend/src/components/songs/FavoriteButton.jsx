import { Heart } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { favoriteApi } from "../../api/favoriteApi";
import Button from "../common/Button";
import { useAuth } from "../../hooks/useAuth";

export default function FavoriteButton({ songId, size = "md" }) {
  const { isAuthenticated } = useAuth();
  const [active, setActive] = useState(false);
  const toggle = async () => {
    if (!isAuthenticated) return toast.error("Vui lòng đăng nhập");
    try {
      if (active) {
        await favoriteApi.remove(songId);
        setActive(false);
        toast.success("Đã bỏ yêu thích");
      } else {
        await favoriteApi.add(songId);
        setActive(true);
        toast.success("Đã thêm vào yêu thích");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Không thực hiện được");
    }
  };
  const buttonClass = size === "sm" ? "h-9 w-9 px-0" : "h-11 w-11 px-0";
  const iconSize = size === "sm" ? 18 : 21;
  return (
    <Button variant="ghost" className={buttonClass} onClick={toggle} title="Yêu thích">
      <Heart size={iconSize} className={active ? "fill-rose-500 text-rose-500" : ""} />
    </Button>
  );
}
