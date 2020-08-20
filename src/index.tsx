import React, { useState, useEffect, useRef } from "react";
import { render } from "react-dom";
import useGeolocation from "react-hook-geolocation";
import { getDistance } from "geolib";
import screenfull from "screenfull";
import useSound from "use-sound";
import closerSound from "./closer.wav";
import updateSound from "./update.mp3";

function App() {
  const [playCloserSound] = useSound(closerSound);

  const [playFurtherSound] = useSound(updateSound);
  const [playUpdateSound] = useSound(updateSound, { volume: 0.2 });
  const geolocation = useGeolocation({ enableHighAccuracy: true });
  const now = useNow();

  const lastDistance = useRef<number>();
  const lastTimestamp = useRef<number>();

  const distance =
    geolocation.latitude &&
    getDistance(geolocation, {
      latitude: 52.002889,
      longitude: 4.437897,
    });

  const timeAgo =
    geolocation.timestamp &&
    Math.max(0, Math.floor((now - geolocation.timestamp) / 1000));

  useEffect(() => {
    if (lastDistance.current && distance && distance < lastDistance.current) {
      playCloserSound();
    } else if (
      lastDistance.current &&
      distance &&
      distance > lastDistance.current
    ) {
      playFurtherSound();
    } else if (
      lastTimestamp.current &&
      geolocation.timestamp &&
      geolocation.timestamp > lastTimestamp.current
    ) {
      playUpdateSound();
    } else if (
      typeof lastTimestamp.current === "undefined" ||
      typeof lastDistance.current === "undefined"
    ) {
      playUpdateSound();
    }
    lastTimestamp.current = geolocation.timestamp || undefined;
    lastDistance.current = distance || undefined;
  });

  if (!geolocation.latitude) {
    if (geolocation.error) {
      return <>Error: {geolocation.error}</>;
    }
    return <>Lokaliseren...</>;
  }

  return (
    <>
      <div id="header">Pirate Camp 2020</div>
      <div id="distance">
        <div id="number">{distance}</div>
        <div id="distanceSub">meters to go</div>
      </div>
      <div id="timeAgo">{timeAgo.toString().padStart(2, "0")}s old</div>
      <div id="accuracy">Accuracy: {Math.ceil(geolocation.accuracy)}m</div>
    </>
  );
}

const appDiv = document.getElementById("app");
if (!appDiv) throw new Error("No appdiv");

render(<App />, appDiv);

function useNow() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const i = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(i);
  });
  return now.getTime();
}

appDiv.addEventListener("click", () => {
  if (screenfull.isEnabled) {
    screenfull.request();
  }
});
