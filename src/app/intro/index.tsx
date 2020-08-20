import React from "react";
import styles from "./index.css";
import screenfull from "screenfull";

interface Props {
  onStart: () => void;
}
export function Intro(props: Props) {
  function onStart() {
    if (screenfull.isEnabled) {
      screenfull.request();
    }
    props.onStart();
  }
  return (
    <div className={styles.start} onClick={onStart}>
      Enter
    </div>
  );
}
