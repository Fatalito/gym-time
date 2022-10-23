import {useEffect} from "react";

export default function useKey(action, keyCode) {
  useEffect(() => {
    const keyPress = (e) => {
      console.log("firing", {e});
      if (e.keyCode === keyCode) {
        e.preventDefault();
        action();
      }
    };
    document.addEventListener("keyup", keyPress, true);
    return () => window.removeEventListener("keyup", keyPress);
  }, []);
}
