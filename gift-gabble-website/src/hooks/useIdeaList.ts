import { useCallback } from "react";
import useSessionStorage from "./useSessionStorage";

export default function useIdeaList() {
  const [ideaList, setIdeaList, _isIdeaListLoaded, _resetIdeaList] =
    useSessionStorage<string[]>("ideaList", []);

  const [shownIdx, setShownIdx, isShownIdxLoaded, resetShownIdx] =
    useSessionStorage<number>("ideaListShownIdx", 0);

  const resetIdeaList = useCallback(() => {
    _resetIdeaList();
    resetShownIdx();
  }, [resetShownIdx, _resetIdeaList]);

  return {
    ideaList,
    setIdeaList,
    isIdeaListLoaded: _isIdeaListLoaded && isShownIdxLoaded,
    shownIdx,
    setShownIdx,
    resetIdeaList,
  };
}
