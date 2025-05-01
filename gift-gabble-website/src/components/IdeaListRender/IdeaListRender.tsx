"use client";

import styles from "./IdeaListRender.module.scss";
import RotatingImage from "../RotatingImage";
import { useAnalyticsAPI } from "@/utilities/useAPI";
import { useEffect, useRef, useState } from "react";

type IdeaListRenderProps = {
  ideaList: string[];
  isLoading: boolean;
  imageMap: { [idea: string]: string[] };
  sessionId: string;
};

export default function IdeaListRender(props: IdeaListRenderProps) {
  const [imgSwitchIdx, setImgSwitchIdx] = useState(0);

  const imgSwitchIdxInterval = useRef<ReturnType<typeof setInterval> | null>(
    null
  );
  const SWITCH_INTERVAL = 5000;
  useEffect(() => {
    if (!imgSwitchIdxInterval.current) {
      imgSwitchIdxInterval.current = setInterval(() => {
        setImgSwitchIdx((curr) => {
          const newCurr = curr + 1;
          const MAX_SWITCH_IDX = 2000;
          if (newCurr > MAX_SWITCH_IDX) return 0;
          return newCurr;
        });
      }, SWITCH_INTERVAL);
    }

    return () => {
      if (imgSwitchIdxInterval.current) {
        clearInterval(imgSwitchIdxInterval.current);
      }
    };
  }, []);

  const renderIdeaList = () => {
    const toReturn = props.ideaList.map((idea, idx) => {
      const imageList = props.imageMap[idea] ? props.imageMap[idea] : [];
      if (!props.isLoading && !imageList.length) return null;
      return (
        <IdeaBlock
          idea={idea}
          key={idea}
          imageList={imageList}
          isLoading={props.isLoading}
          pureLoading={false}
          orderIdx={idx}
          sessionId={props.sessionId}
          imgSwitchIdx={imgSwitchIdx}
        ></IdeaBlock>
      );
    });

    if (props.isLoading) {
      for (let i = 0; i < 10; i++) {
        const toAdd = (
          <IdeaBlock key={"loading-idea-" + i} pureLoading></IdeaBlock>
        );

        toReturn.push(toAdd);
      }
    }

    return toReturn;
  };

  return <div className={styles.container}>{renderIdeaList()}</div>;
}

type IdeaBlockProps =
  | {
      pureLoading: false;
      idea: string;
      imageList: string[];
      isLoading?: boolean;
      orderIdx: number;
      sessionId: string;
      imgSwitchIdx: number;
    }
  | {
      pureLoading: true;
    };

function IdeaBlock(props: IdeaBlockProps) {
  const imageList = props.pureLoading ? [] : props.imageList;

  function handleClick() {
    if (props.pureLoading || props.isLoading) return false;

    useAnalyticsAPI({
      actionType: "ic",
      idea: props.idea,
      ideaIdx: props.orderIdx,
      sessionId: props.sessionId,
    });

    return true;
  }

  const renderImg = () => {
    if (props.pureLoading || (props.isLoading && !imageList.length)) {
      return null;
    }
    if (!imageList.length) {
      return (
        <img src="/unknown_gift.png" alt="" className={styles.monoIdeaImg} />
      );
    }
    if (imageList.length == 1) {
      return <img src={imageList[0]} alt="" className={styles.monoIdeaImg} />;
    }
    return (
      <RotatingImage
        imageList={imageList}
        imgIdx={props.imgSwitchIdx}
      ></RotatingImage>
    );
  };

  const cnIdeaBlockContainer = () => {
    const toReturn = ["hiddenLink", styles.ideaBlockContainer];
    if (props.pureLoading || props.isLoading) {
      toReturn.push(styles.loading);
    }
    return toReturn.join(" ");
  };

  const cnIdeaImgContainer = () => {
    const toReturn = [styles.ideaImgContainer];
    if (props.pureLoading) {
      toReturn.push(styles.loading);
    } else if (props.isLoading && !imageList.length) {
      toReturn.push(styles.ideaLoading);
    }
    return toReturn.join(" ");
  };

  const cnIdeaText = () => {
    const toReturn = [styles.ideaText];
    if (props.pureLoading) {
      toReturn.push(styles.loading);
    }
    return toReturn.join(" ");
  };

  if (props.pureLoading)
    return (
      <div className={cnIdeaBlockContainer()}>
        <div className={cnIdeaImgContainer()}>{renderImg()}</div>
        <span className={cnIdeaText()}>_______</span>
      </div>
    );

  const ideaStr = props.pureLoading ? "________" : props.idea;
  const kStr = ideaStr
    .toLowerCase()
    .trim()
    .split(" ")
    .join("+")
    .replaceAll("?", "%3F")
    .replaceAll("?", "%26");
  const searchLink = `https://www.amazon.com/s?k=${kStr}&linkCode=ll2&tag=fbdlabs-20`;

  return (
    <a
      className={cnIdeaBlockContainer()}
      onClick={handleClick}
      href={searchLink}
      target="_blank"
    >
      <div className={cnIdeaImgContainer()}>{renderImg()}</div>
      <span className={cnIdeaText()}>{ideaStr}</span>
    </a>
  );
}
