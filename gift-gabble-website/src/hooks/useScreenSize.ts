// useScreenSize.js
import { useState, useEffect } from "react";

const useScreenSize = () => {
  const hasWindow = typeof window !== "undefined";

  const [screenSize, setScreenSize] = useState({
    width: hasWindow ? window.innerWidth : 1920,
    height: hasWindow ? window.innerHeight : 1080,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window?.innerWidth,
        height: window?.innerHeight,
      });
    };
    if (hasWindow) {
      window.addEventListener("resize", handleResize);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if (hasWindow) window?.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
