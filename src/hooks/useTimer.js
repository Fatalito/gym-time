import {useEffect, useState} from "react";

export default () => {
  const [elapsed, setElapsed] = useState(0);
  const [start] = useState(new Date());

  useEffect(() => {
    const tick = () => {
      setElapsed(new Date() - start);
    };
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [start]);

  return [start, elapsed];
};
