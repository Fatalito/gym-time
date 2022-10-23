import {useSetState} from "./useSetState";

export default (action) => {
  const [paused, setPaused, getPaused] = useSetState(false);
  const [pauses, setPauses, getPauses] = useSetState([]);

  const addPause = () => {
    // console.log("addpause", {paused});
    setPaused(true);
    action("pause");
    const newPause = {start: new Date()};

    setPauses([...pauses, newPause]);
    // console.log("addpause", {pauses, newPause});
  };

  const endPause = async () => {
    // console.log("endPause", {paused});
    setPaused(false);
    action("pause end");
    const sPauses = await getPauses();
    const latestPause = sPauses.slice(-1)[0];
    // console.log("endPause", {latestPause, pauses});

    latestPause.elapsed = new Date() - latestPause.start;
    // console.log("updateding elapsed", latestPause.elapsed, [
    //   ...pauses.slice(0, pauses.length - 1),
    //   latestPause,
    // ]);
    setPauses([...pauses.slice(0, pauses.length - 1), latestPause]);
  };

  const togglePause = async () => {
    // console.log("tooglePause", {r: await getPaused()});
    if (await getPaused()) {
      endPause();
    } else {
      addPause();
    }
  };

  const pauseTime = () => {
    // const sPauses = await getPauses();
    // const sPaused = await getPaused();
    let res = pauses.reduce((a, b) => a + b.elapsed, 0) || 0;
    if (paused && pauses.length > 0) {
      const latestPause = pauses.slice(-1)[0];
      // console.log("pauseTime in ", {res, latestPause});

      res += new Date() - latestPause.start;
    }
    // console.log("pauseTime", {res});
    return res;
  };

  return [togglePause, paused, pauseTime];
};
