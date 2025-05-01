"use client";

import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import PageWrapper from "@/components/PageWrapper";
import SearchForm from "@/components/SearchForm";
import HeroPerson from "@/components/HeroPerson";
import { FormResponse } from "@/utilities/customTypes";
import { useAnalyticsAPI } from "@/utilities/useAPI";
import useAnalyticsSessionId from "@/hooks/useAnalyticsSessionId";
import { useEffect } from "react";
import { randomFiveDigit } from "@/utilities/helpers";

export default function Home() {
  const router = useRouter();
  const {
    analyticsSessionId,
    setAnalyticsSessionId,
    isAnalyticsSessionIdLoaded,
  } = useAnalyticsSessionId();

  useEffect(() => {
    const defaultSessionId = new Date().toISOString() + randomFiveDigit();
    setAnalyticsSessionId(defaultSessionId); // Initialize id
  }, [isAnalyticsSessionIdLoaded]);

  async function handleSearch(formResponse: FormResponse) {
    useAnalyticsAPI({
      actionType: "fr",
      formResponse,
      sessionId: analyticsSessionId,
    });

    router.push("/ideas");
  }

  return (
    <PageWrapper>
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>
            FIND A <b>GIFT</b> FOR YOUR
          </h1>
          <HeroPerson />
          <h1 className={styles.heroTitle}>
            IN <b>SECONDS</b>
          </h1>
        </div>

        <span className={styles.explainText}>
          Fill the form below to get free gift ideas and shopping options <br />
          {"No sign ups required!"}
        </span>
        <SearchForm onGo={handleSearch} />
      </div>
    </PageWrapper>
  );
}
