import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { favoriteApi } from "../../api/favoriteApi";
import { useAuth } from "../../hooks/useAuth";
import Button from "../common/Button";

export default function FavoriteButton({ songId, size = "md" }) {
  const { isAuthenticated } = useAuth();
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (!isAuthenticated || !songId) {
      return undefined;
    }

    favoriteApi
      .check(songId)
      .then((isFavorite) => {
        if (!cancelled) setActive(Boolean(isFavorite));
      })
      .catch(() => {
        if (!cancelled) setActive(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, songId]);

  const toggle = async () => {
    if (!isAuthenticated) return toast.error("Vui lòng đăng nhập");
    if (loading || !songId) return;

    const previous = isAuthenticated && active;
    setLoading(true);
    setActive(!previous);

    try {
      if (previous) {
        await favoriteApi.remove(songId);
        toast.success("Đã bỏ yêu thích");
      } else {
        await favoriteApi.add(songId);
        toast.success("Đã thêm vào yêu thích");
      }
    } catch (error) {
      setActive(previous);
      const status = error.response?.status;
      toast.error(status === 401 ? "Phiên đăng nhập đã hết hạn" : error.response?.data?.message || "Không thực hiện được");
    } finally {
      setLoading(false);
    }
  };

  const buttonClass = size === "sm" ? "h-9 w-9 px-0" : size === "lg" ? "h-12 w-12 px-0" : "h-11 w-11 px-0";
  const iconSize = size === "sm" ? 18 : size === "lg" ? 24 : 21;
  const visibleActive = isAuthenticated && active;

  return (
    <Button variant="ghost" className={buttonClass} onClick={toggle} disabled={loading} title={visibleActive ? "Bỏ yêu thích" : "Yêu thích"}>
      <Heart size={iconSize} className={visibleActive ? "fill-rose-500 text-rose-500" : ""} />
    </Button>
  );
}
