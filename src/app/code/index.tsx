import React, { useState } from "react";
import styles from "./index.css";
import useSound from "use-sound";
import wrongSound from "../../sounds/wrong.mp3";
import correctSound from "../../sounds/correct.wav";
import clickSound from "../../sounds/click.wav";

const codes: { [code: string]: [number, number] } = {
  "000000": [52.002889, 4.437897],
};

interface Props {
  onCorrect: (coordinates: [number, number]) => void;
}
export function Code(props: Props) {
  const [playWrongSound] = useSound(wrongSound);
  const [playCorrectSound] = useSound(correctSound);
  const [playClickSound] = useSound(clickSound);

  function onChange(code: string) {
    playClickSound();
    if (code.length >= 6) {
      if (codes[code]) {
        playCorrectSound();
        props.onCorrect(codes[code]);
      } else {
        playWrongSound();
      }
    }
  }

  return (
    <form noValidate>
      <input
        type="text"
        pattern="\d*"
        className={styles.input}
        onChange={(e) => onChange(e.target.value)}
        maxLength={6}
        autoFocus
      />
    </form>
  );
}
