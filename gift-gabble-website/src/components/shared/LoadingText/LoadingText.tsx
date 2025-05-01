import React, { useEffect, useRef, useState } from "react";
import styles from "./LoadingText.module.scss";
import { randomIntFromInterval } from "@/utilities/helpers";

const DEFAULT_INTERVAL_DELAY = 2500;

type LoadingTextProps = {
  intervalDelay?: number;
  textList: string[];
  className?: string;
};
export default function LoadingText(props: LoadingTextProps) {
  const [textIdx, setTextIdx] = useState(0);

  const textHistory = useRef<number[]>([0]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTextIdx((currIdx) => {
          if (textHistory.current.length >= props.textList.length) {
            const newIdx = randomIntFromInterval(0, props.textList.length);
            textHistory.current = [newIdx];
            return newIdx;
          }

          let randomIdx = -1;

          while (true) {
            randomIdx = randomIntFromInterval(0, props.textList.length);
            if (randomIdx == currIdx) continue;
            if (textHistory.current.includes(randomIdx)) continue;
            break;
          }

          const newHistory = [...textHistory.current, randomIdx];
          textHistory.current = newHistory;

          return randomIdx;
        });
      }, props.intervalDelay || DEFAULT_INTERVAL_DELAY);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return (
    <span className={[styles.text, props.className].join(" ")}>
      {props.textList[textIdx]}
    </span>
  );
}
