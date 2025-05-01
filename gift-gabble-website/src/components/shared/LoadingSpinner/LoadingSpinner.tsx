import React from "react";
import styles from "./LoadingSpinner.module.scss";

type LoadingSpinnerProps = {
  className?: string;
};
export default function LoadingSpinner(props: LoadingSpinnerProps) {
  return <div className={styles["dot-flashing"] + " " + props.className}></div>;
}
