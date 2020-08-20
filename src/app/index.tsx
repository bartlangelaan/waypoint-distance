import React from "react";
import { render } from "react-dom";
import screenfull from "screenfull";
import styles from "./index.css";
import { Tracker } from "./tracker";

function App() {
  return (
    <>
      <div className={styles.header}>Pirate Camp 2020</div>
      <Tracker latitude={52.002889} longitude={4.437897} />
    </>
  );
}

const appDiv = document.getElementById("app");
if (!appDiv) throw new Error("No appdiv");

render(<App />, appDiv);

appDiv.addEventListener("click", () => {
  if (screenfull.isEnabled) {
    screenfull.request();
  }
});
