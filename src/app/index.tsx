import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import screenfull from "screenfull";
import styles from "./index.css";
import { Tracker } from "./tracker";
import { Intro } from "./intro";
import { Code } from "./code";
import { logStateChange } from "./event";

function App() {
  const [started, setStarted] = useState(false);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!screenfull.isEnabled) return;
    function onFullscreenChange() {
      if (screenfull.isEnabled && !screenfull.isFullscreen) setStarted(false);
    }
    screenfull.on("change", onFullscreenChange);
    return () => {
      screenfull.isEnabled && screenfull.off("change", onFullscreenChange);
    };
  }, []);

  useEffect(() => {
    logStateChange("started", JSON.stringify(started));
  }, [started]);

  useEffect(() => {
    logStateChange("coordinates", JSON.stringify(coordinates));
  }, [coordinates]);

  return (
    <>
      <div className={styles.header}>Pirate Camp 2020</div>
      {coordinates && (
        <div className={styles.reset} onClick={() => setCoordinates(null)}>
          X
        </div>
      )}
      {started ? (
        coordinates ? (
          <Tracker latitude={coordinates[0]} longitude={coordinates[1]} />
        ) : (
          <Code onCorrect={setCoordinates} />
        )
      ) : (
        <Intro onStart={() => setStarted(true)} />
      )}
    </>
  );
}

const appDiv = document.getElementById("app");
if (!appDiv) throw new Error("No appdiv");

render(<App />, appDiv);

screen;
