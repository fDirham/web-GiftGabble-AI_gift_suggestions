import useSessionStorage from "./useSessionStorage";
import { useCallback } from "react";

export default function useImageMap() {
  const [imageMap, setImageMap, isImageMapLoaded, resetImageMap] =
    useSessionStorage<{
      [idea: string]: string[];
    }>("imageMap", {});

  const addToImageMap = useCallback(
    (k: string, imageList: string[]) => {
      if (isImageMapLoaded)
        setImageMap((curr) => {
          return { ...curr, [k]: imageList };
        });
    },
    [imageMap, setImageMap, isImageMapLoaded]
  );

  return {
    imageMap,
    isImageMapLoaded,
    setImageMap,
    resetImageMap,
    addToImageMap,
  };
}
