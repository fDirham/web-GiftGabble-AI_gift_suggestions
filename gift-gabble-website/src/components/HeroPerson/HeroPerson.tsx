import styles from "./HeroPerson.module.scss";
import { Amaranth } from "next/font/google";

const amaranth = Amaranth({ subsets: ["latin"], weight: "400" });

export default function HeroPerson() {
  const nameList = [
    "friends",
    "partner",
    "parents",
    "boyfriend",
    "best-friend",
    "family",
    "mom",
    "girlfriend",
    "dad",
  ];

  const renderNames = () => {
    const newNameList = [...nameList, ...nameList];

    return newNameList.map((nameStr, i) => {
      return (
        <h1 className={styles.personText} key={`${i}-name`}>
          {nameStr}
        </h1>
      );
    });
  };

  return (
    <div className={`${styles.container} ${amaranth.className}`}>
      <div className={styles.scrollContainer}>{renderNames()}</div>
    </div>
  );
}
