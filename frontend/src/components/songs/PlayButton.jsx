import { Pause, Play } from "lucide-react";
import Button from "../common/Button";
import { usePlayer } from "../../hooks/usePlayer";

export default function PlayButton({ song, queue = [], compact = false, size = "md" }) {
  const { play, toggle, currentSong, isPlaying } = usePlayer();
  const current = currentSong?.id === song?.id;
  const active = current && isPlaying;
  const compactClass = size === "sm" ? "h-9 w-9 px-0" : "h-11 w-11 px-0";
  const iconSize = compact ? (size === "sm" ? 18 : 21) : 18;
  const handleClick = () => {
    if (current) {
      toggle();
      return;
    }
    play(song, queue);
  };

  return (
    <Button className={compact ? compactClass : ""} onClick={handleClick} title={active ? "Pause" : "Play"}>
      {active ? <Pause size={iconSize} /> : <Play size={iconSize} />}
      {!compact && <span>{active ? "Đang phát" : "Phát"}</span>}
    </Button>
  );
}
