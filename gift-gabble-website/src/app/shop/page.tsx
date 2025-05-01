"use client";

import styles from "./page.module.scss";
import useFormResponse from "@/hooks/useFormResponse";
import PageWrapper from "@/components/PageWrapper";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect } from "react";
import AmazonProductListRender from "@/components/AmazonProductListRender";
import useProductMap from "@/hooks/useProductMap";
import { Amaranth } from "next/font/google";
import useScrollUp from "@/hooks/useScrollUp";
import useAnalyticsSessionId from "@/hooks/useAnalyticsSessionId";
import { useAnalyticsAPI } from "@/utilities/useAPI";
import Link from "next/link";

const amaranth = Amaranth({ subsets: ["latin"], weight: "700" });
function getAmazonSearchLink(idea: string) {
  const kStr = idea.toLowerCase().trim().split(" ").join("+");
  return `https://www.amazon.com/s?k=${kStr}&linkCode=ll2&tag=fbdlabs-20`;
}

export default function ShopPage() {
  const { formResponse, isFormResponseLoaded, isFormResponseEmpty } =
    useFormResponse();
  const { analyticsSessionId } = useAnalyticsSessionId();
  const searchParams = useSearchParams();
  const idea = searchParams.get("q");
  const router = useRouter();
  useScrollUp();

  const { productMap, isProductMapLoaded } = useProductMap();

  const amazonProductList = idea ? productMap[idea] : [];

  useEffect(() => {
    if (isFormResponseLoaded && isFormResponseEmpty) {
      router.replace("/");
    }
  }, [isFormResponseLoaded, isFormResponseEmpty]);

  useEffect(() => {
    if (idea && isProductMapLoaded && !amazonProductList.length) {
      window.alert("Something went wrong, please try again later");
      console.error("Empty shop product list");
      router.back();
    }
  }, [isProductMapLoaded, idea, amazonProductList]);

  const logSearchClick = useCallback(() => {
    useAnalyticsAPI({
      actionType: "sc",
      sessionId: analyticsSessionId,
    });
  }, [analyticsSessionId]);

  if (!idea || !isFormResponseLoaded || !isProductMapLoaded) return null;

  return (
    <Suspense>
      <PageWrapper isBlankBG>
        <Link href={"/ideas"}>{"<-"} Go back to ideas</Link>
        <h1 className={styles.title}>
          You can buy <span className={styles.ideaText}>"{idea}"</span> for your{" "}
          <span className={[amaranth.className, styles.whoText].join(" ")}>
            {formResponse.who}
          </span>
          {" from "}
          <a
            href={getAmazonSearchLink(idea)}
            target="_blank"
            className={styles.amazonText}
            onClick={logSearchClick}
          >
            Amazon
          </a>
        </h1>

        <p className={styles.disclaimerText}>
          DISCLAIMER: As an Amazon Associate I earn from qualifying purchases.
          Clicking on any product below takes you to an Amazon page.
        </p>
        <div className={styles.inAmazonContainer}>
          <a
            href={getAmazonSearchLink(idea)}
            target="_blank"
            onClick={logSearchClick}
          >
            Shop directly in Amazon
          </a>
        </div>

        <AmazonProductListRender
          amazonProductList={amazonProductList}
          isLoading={false}
          sessionId={analyticsSessionId}
        />
      </PageWrapper>
    </Suspense>
  );
}
