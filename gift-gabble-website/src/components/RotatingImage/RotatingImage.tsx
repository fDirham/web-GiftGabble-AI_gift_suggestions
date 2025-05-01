import React, { useEffect, useRef, useState } from "react";
import styles from "./RotatingImage.module.scss";
import SafeImage from "../SafeImage";

/**
 * Ideas
 * We render two imgs, one over the other
 * On change, we render an image that has animation to go away in a sec
 * Then after animation, we instantly change top to bottom src and bottom to next
 *
 */
type RotatingImageProps = {
  imageList: string[];
  className?: string;
  imgIdx: number;
};
export default function RotatingImage(props: RotatingImageProps) {
  const { imageList } = props;

  const initialCurrImgIdx = props.imgIdx % props.imageList.length;
  const initialNextImgIdx = (props.imgIdx + 1) % props.imageList.length;
  const [isAnimating, setIsAnimating] = useState(false);
  const [currImg, setCurrImg] = useState(imageList[initialCurrImgIdx]);
  const [nextImg, setNextImg] = useState(imageList[initialNextImgIdx]);
  const [doneFirst, setDoneFirst] = useState(false);

  const animTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (animTimeout.current) {
        clearInterval(animTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!doneFirst) {
      setDoneFirst(true);
      return;
    }

    const newCurrImgIdx = props.imgIdx % props.imageList.length;
    const newNextImgIdx = (props.imgIdx + 1) % props.imageList.length;

    // Start animating image
    setIsAnimating(true);

    if (animTimeout.current) {
      clearTimeout(animTimeout.current);
    }

    animTimeout.current = setTimeout(() => {
      setCurrImg(imageList[newCurrImgIdx]);
      setNextImg(imageList[newNextImgIdx]);
      setIsAnimating(false);
    }, 1500);
  }, [props.imgIdx]);

  const getCurrImgClassName = () => {
    const toReturn = [styles.currImg];
    if (isAnimating) {
      toReturn.push(styles.animImg);
    }
    return toReturn.join(" ");
  };

  return (
    <div className={styles.container}>
      <SafeImage src={currImg} alt="" className={getCurrImgClassName()} />
      <SafeImage src={nextImg} alt="" className={styles.nextImg} />
    </div>
  );
}
