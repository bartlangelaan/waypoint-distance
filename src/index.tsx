import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import useGeolocation from "react-hook-geolocation";
import { getDistance } from "geolib";
import screenfull from "screenfull";

function App() {
  const geolocation = useGeolocation({ enableHighAccuracy: true });
  const now = useNow();

  if (!geolocation.latitude) {
    if (geolocation.error) {
      return <>Error: {geolocation.error}</>;
    }
    return <>Lokaliseren...</>;
  }

  const distance = getDistance(geolocation, {
    latitude: 52.002889,
    longitude: 4.437897,
  });

  const timeAgo = Math.max(0, Math.floor((now - geolocation.timestamp) / 1000));

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
if (!appDiv) throw new Error('No appdiv');

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
