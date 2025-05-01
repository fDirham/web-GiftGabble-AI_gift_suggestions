import useSessionStorage from "./useSessionStorage";

export default function useAnalyticsSessionId() {
  const defaultSessionId = "???";
  const [
    analyticsSessionId,
    setAnalyticsSessionId,
    isAnalyticsSessionIdLoaded,
  ] = useSessionStorage<string>("customAnalyticsSessionId", defaultSessionId);

  return {
    analyticsSessionId,
    setAnalyticsSessionId,
    isAnalyticsSessionIdLoaded,
  };
}
