import React, { useState } from "react";
import styles from "./index.css";
import useSound from "use-sound";
import wrongSound from "../../sounds/wrong.mp3";
import correctSound from "../../sounds/correct.wav";
import clickSound from "../../sounds/click.wav";
import { log } from "../event";

const codes: { [code: string]: [number, number] } = {
  /** Kantine */
  "000000": [52.002889, 4.437897],
  /** Kuijpershoefke */
  "199823": [51.6327, 5.07895],
  /** Mussenberg */
  "800144": [51.63115, 5.08839],
  "403308": [51.63124, 5.08459],
  /** Loonse Hoek */
  "932770": [51.63048, 5.09728],
  "404039": [51.62919, 5.10084],
  /** D'n Bandschommel */
  "126987": [51.62708, 5.08319],
  "421313": [51.62705, 5.08071],
  /** Moleneind */
  "718645": [51.61973, 5.08324],
  "658651": [51.61805, 5.08393],
  /** Kasteellaan */
  "556065": [51.6251, 5.07257],
  "564236": [51.62679, 5.07529],
  /** Heideweg */
  "580610": [51.62517, 5.06281],
  "615085": [51.62519, 5.06009],
  /** Hertog van Brabantweg */
  "551071": [51.63127, 5.06879],
  "404287": [51.63029, 5.06451],
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
      log(`Code try: ${code}`);

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
        type="tel"
        className={styles.input}
        onChange={(e) => onChange(e.target.value)}
        maxLength={6}
        autoFocus
        placeholder="******"
      />
    </form>
  );
}
