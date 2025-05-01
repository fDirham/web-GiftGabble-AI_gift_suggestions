import React from "react";
import styles from "./page.module.scss";
import PageWrapper from "@/components/PageWrapper";

export default function AboutPage() {
  return (
    <PageWrapper isBlankBG centerContainerClassName={styles.container}>
      <h1>ABOUT</h1>
      <p>
        Use Gift Gabble to find gift ideas for your loved ones! Simply fill in a
        short form and we'll take care of the rest.{" "}
      </p>
      <p>
        Using AI, we'll find gift ideas that we think your loved one will like +
        links to amazon product pages for those ideas.
      </p>
      <a href="mailto:fbdlabs@outlook.com">Contact</a>

      <h1>How to use Gift Gabble?</h1>
      <ol>
        <li>
          Fill in the short form on the home page. Be as descriptive as
          possible.
        </li>
        <li>
          Gift Gabble will show you ideas. Generate as many as you want and then
          choose the on you love the most.
        </li>
        <li>
          Click on a product to go to Amazon and buy. Alternatively, you can
          click on the link to search in Amazon directly.
        </li>
      </ol>
    </PageWrapper>
  );
}
