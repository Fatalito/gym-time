import React, {useEffect} from "react";
import getIntervals from "../Intervals";
import getHumanFormat from "../helper/getHumanFormat";
import useSpeech from "../hooks/useSpeech";
import useTimer from "../hooks/useTimer";
import useKey from "../hooks/useKey";
import usePause from "../hooks/usePause";
// import useVoice from '../hooks/useVoice'

const Timer = () => {
  const sets = getIntervals();
  const intervals = sets.intervals;

  const voice = useSpeech();
  const [togglePause, paused, pauseTime] = usePause(voice);
  const [start, elapsed] = useTimer(voice);
  useKey(togglePause, 32);
  useEffect(() => {
    let wakeLock = null;

    const requestWakeLock = async () => {
      try {
        if (document.hidden) return;
        wakeLock = await navigator.wakeLock.request("screen");
        wakeLock.addEventListener("release", () => {
          wakeLock = null;
          console.log("Wake Lock was released");
        });
        console.log("Wake Lock is active");
      } catch (err) {
        console.error(`${err.name}, ${err.message}`);
      }
    };
    requestWakeLock();
    const releaseWakeLock = () => {
      console.log(document.hidden);
      if (!wakeLock || document.hidden) {
        wakeLock = null;
        return;
      }

      try {
        wakeLock.release();
        wakeLock = null;
      } catch (err) {
        console.error(`${err.name}, ${err.message}`);
      }
    };
    return releaseWakeLock();
  }, [document.hidden]);
  const totalTime = getHumanFormat(sets.totalTimeMs);
  const secondsTotal = totalTime.seconds;

  const pausedTimeMs = pauseTime();

  const elapsedWithoutPauseMs = elapsed - pausedTimeMs;
  // console.log({elapsedWithoutPauseMs, elapsed, pausedTimeMs});
  const pausedTime = getHumanFormat(pausedTimeMs);

  const time = getHumanFormat(elapsedWithoutPauseMs);

  const finishTime = new Date(
    start.getTime() + sets.totalTimeMs + pausedTimeMs
  );

  const left = intervals.filter((t) => t.time > time.seconds);

  // console.log({time, s: time.seconds, intervals, left});

  const currentTime = Math.min(...left.map((i) => i.time));

  const exo = left[0];
  // const exo = intervals.find((i) => i.time === currentTime);
  // console.log({exo, intervals, currentTime});

  const nextExo = left[1] || "fini";

  // console.log({exo, nextExo, s: time.seconds});

  if (voice) {
    if (currentTime - time.seconds === 1) {
      voice(nextExo.name);
    }
  }

  return (
    <div style={{backgroundColor: paused ? "lightsalmon" : ""}}>
      <button onClick={() => {}}> go</button>
      <p style={{fontSize: 2 + "em"}}>
        START<b> {start.toLocaleTimeString()}</b>
      </p>
      <p style={{fontSize: 2 + "em"}}>
        LAST PAUSE<b> {pausedTime.seconds}</b>
      </p>
      <p style={{fontSize: 2 + "em"}}>
        TOTAL PAUSE<b> {pausedTime.seconds}</b>
      </p>
      <p style={{fontSize: 2 + "em"}}>
        FINISH<b> {finishTime.toLocaleTimeString()}</b>
      </p>
      <p style={{fontSize: 2 + "em"}}>
        TIME{" "}
        <b>
          {time.seconds} / {secondsTotal}
        </b>
      </p>
      <p style={{fontSize: 2 + "em"}}>
        MINUTES{" "}
        <b>
          {time.minutes}:{time.secondsForMinutes}
        </b>
        /
        <b>
          {totalTime.minutes}:{totalTime.secondsForMinutes}
        </b>
      </p>
      <p style={{fontSize: 5 + "em"}}>
        {exo.name} <b>{currentTime - time.seconds}</b>
      </p>
      <p style={{fontSize: 3 + "em"}}>{nextExo.name} </p>
    </div>
  );
};

export default Timer;
