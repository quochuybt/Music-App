import { useDispatch, useSelector } from "react-redux";
import { playSongWithHistory, setQueue, togglePlay } from "../features/player/playerSlice";

export const usePlayer = () => {
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();
  return {
    ...player,
    play: (song, queue = []) => {
      if (queue.length) dispatch(setQueue(queue));
      dispatch(playSongWithHistory(song));
    },
    toggle: () => dispatch(togglePlay()),
  };
};
