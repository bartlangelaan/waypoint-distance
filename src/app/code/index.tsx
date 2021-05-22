import React, { useState } from "react";
import styles from "./index.css";
import useSound from "use-sound";
import wrongSound from "../../sounds/wrong.mp3";
import correctSound from "../../sounds/correct.wav";
import clickSound from "../../sounds/click.wav";
import { log } from "../event";

const codes: { [code: string]: [number, number] } = {
  /** Het rood wit hekje op de groenekade */
  "111": [51.999129, 4.438883],

  /** Het straatbordje meerweg in de oude lede */
  "330": [51.999129, 4.438883],

  /** De brug in de groenzoom */
  "123": [51.998807, 4.447876],

  /** Het hekje in de groenzoom */
  "456": [51.995597, 4.447891],
  "789": [51.995597, 4.447891],

  /** De Soete Suikerbol */
  "010": [52.006216, 4.450273],

  /** De voordeur van Rebecca */
  // "666": [],

  /** De voordeur van Thea */
  "888": [52.011688, 4.452114],

  /** De voordeur van Eja */
  "777": [52.013099, 4.447311],

  /** De elektriciteitskast op de Floralaan */
  "999": [52.007959, 4.442592],

  /** De handbal */
  "042": [52.002874, 4.437968],
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
