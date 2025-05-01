import React, { useEffect, useRef, useState } from "react";
import styles from "./LoadingGif.module.scss";
import { randomIntFromInterval } from "@/utilities/helpers";

const GIF_LIST = [
  "https://giphy.com/embed/l3nWhI38IWDofyDrW",
  "https://giphy.com/embed/cnB7XLeVM9X9BjYB2C",
  "https://giphy.com/embed/iNQ2cIve8rUqI",
  "https://giphy.com/embed/26Ff6khK7g0TQvSUM",
  "https://giphy.com/embed/H5Ooe4b04mkawWC8KN",
  "https://giphy.com/embed/3o7TKILKwQCtphbl7y",
  "https://giphy.com/embed/l0MYHq0IFikDrVQOc",
  "https://giphy.com/embed/JIX9t2j0ZTN9S",
  "https://giphy.com/embed/I1U0mhh9sVf2u4Qz8g",
  "https://giphy.com/embed/xULW8vRQrlIPRfiEog",
  "https://giphy.com/embed/26hiu3mZVquuykwhy",
  "https://giphy.com/embed/IwTWTsUzmIicM",
];

const DEFAULT_INTERVAL_DELAY = 2500;

type LoadingGifProps = {
  intervalDelay?: number;
  className?: string;
  gifClassName?: string;
};
export default function LoadingGif(props: LoadingGifProps) {
  const [gifIdx, setGifIdx] = useState(0);

  const gifHistory = useRef<number[]>([0]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setGifIdx((currIdx) => {
          if (gifHistory.current.length >= GIF_LIST.length) {
            const newIdx = randomIntFromInterval(0, GIF_LIST.length);
            gifHistory.current = [newIdx];
            return newIdx;
          }

          let randomIdx = -1;

          while (true) {
            randomIdx = randomIntFromInterval(0, GIF_LIST.length);
            if (randomIdx == currIdx) continue;
            if (gifHistory.current.includes(randomIdx)) continue;
            break;
          }

          const newHistory = [...gifHistory.current, randomIdx];
          gifHistory.current = newHistory;

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
    <div className={[styles.container, props.className].join(" ")}>
      <iframe
        src={GIF_LIST[gifIdx]}
        className={[styles.gifEmbed, props.gifClassName].join(" ")}
        allowFullScreen
      ></iframe>
    </div>
  );
}
