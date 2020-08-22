import React, { useState, useEffect, useRef } from "react";
import useGeolocation from "react-hook-geolocation";
import { getDistance } from "geolib";
import useSound from "use-sound";
import closerSound from "../../sounds/closer.wav";
import updateSound from "../../sounds/update.mp3";
import styles from "./index.css";
import { logStateChange } from "../event";

interface Props {
  latitude: number;
  longitude: number;
}
export function Tracker(props: Props) {
  const [playCloserSound] = useSound(closerSound);

  const [playFurtherSound] = useSound(updateSound);
  const [playUpdateSound] = useSound(updateSound, { volume: 0.2 });
  const geolocation = useGeolocation({ enableHighAccuracy: true });
  const now = useNow();

  const lastDistance = useRef<number | null>(null);
  const lastTimestamp = useRef<number | null>(null);

  const distance =
    geolocation.latitude &&
    getDistance(geolocation, {
      latitude: props.latitude,
      longitude: props.longitude,
    });

  const timeAgo =
    geolocation.timestamp &&
    Math.max(0, Math.floor((now - geolocation.timestamp) / 1000));

  useEffect(() => {
    if (
      lastDistance.current !== null &&
      distance !== null &&
      distance < lastDistance.current
    ) {
      playCloserSound();
    } else if (
      lastDistance.current !== null &&
      distance !== null &&
      distance > lastDistance.current
    ) {
      playFurtherSound();
    } else if (
      lastTimestamp.current !== null &&
      geolocation.timestamp !== null &&
      geolocation.timestamp > lastTimestamp.current
    ) {
      playUpdateSound();
    } else if (
      (lastTimestamp.current === null && geolocation.timestamp !== null) ||
      (lastDistance.current === null && distance !== null)
    ) {
      playUpdateSound();
    }
    lastTimestamp.current = geolocation.timestamp;
    lastDistance.current = distance;
  });

  useEffect(() => {
    logStateChange(
      "geolocation error",
      !geolocation.error && !geolocation.latitude
        ? "no signal (yet)"
        : JSON.stringify(geolocation.error)
    );
  }, [geolocation.error, !geolocation.latitude]);

  useEffect(() => {
    function update() {
      logStateChange("distance", JSON.stringify(distance));
    }
    const i = setInterval(update, 15000);
    return () => clearInterval(i);
  }, []);

  if (!geolocation.latitude || timeAgo === null) {
    if (geolocation.error) {
      return (
        <div className={styles.error}>
          <div>
            <div>
              Error: {geolocation.error}.<br />
              <br />
              Make a screenshot and contact captain Bart.
            </div>
          </div>
        </div>
      );
    }
    return <div className={styles.localizing}>Locating...</div>;
  }

  return (
    <>
      <div className={styles.distance}>
        <div className={styles.number}>{distance}</div>
        <div className={styles.distanceSub}>meters to go</div>
      </div>
      <div className={styles.timeAgo}>
        {timeAgo.toString().padStart(2, "0")}s old
      </div>
      <div className={styles.accuracy}>
        Accuracy: {Math.ceil(geolocation.accuracy)}m
      </div>
    </>
  );
}

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
