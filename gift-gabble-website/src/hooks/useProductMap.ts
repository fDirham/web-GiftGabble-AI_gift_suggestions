import { AmazonProductObj } from "@/utilities/customTypes";
import useSessionStorage from "./useSessionStorage";
import { useCallback } from "react";

export default function useProductMap() {
  const [productMap, setProductMap, isProductMapLoaded, resetProductMap] =
    useSessionStorage<{
      [idea: string]: AmazonProductObj[];
    }>("productMap", {});

  const addToProductMap = useCallback(
    (k: string, productList: AmazonProductObj[]) => {
      if (isProductMapLoaded)
        setProductMap((curr) => {
          return { ...curr, [k]: productList };
        });
    },
    [productMap, setProductMap, isProductMapLoaded]
  );

  return {
    productMap,
    isProductMapLoaded,
    setProductMap,
    resetProductMap,
    addToProductMap,
  };
}
