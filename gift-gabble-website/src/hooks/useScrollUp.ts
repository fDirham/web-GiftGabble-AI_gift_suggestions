import { useEffect } from "react";

export default function useScrollUp() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);
}
