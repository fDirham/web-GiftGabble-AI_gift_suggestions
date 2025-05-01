import useScreenSize from "./useScreenSize";

export default function useScreenDevice() {
  const screenSize = useScreenSize();

  const isMobile = screenSize.width < 421;

  const isTablet = !isMobile && screenSize.width < 769;

  const isDesktop = !isTablet && !isMobile;

  return { isMobile, isTablet, isDesktop };
}
