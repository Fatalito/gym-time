import {useState} from 'react'

import getRandomInt from '../helper/getRandomInt'

export default () => {
  const synth = window.speechSynthesis;
  const [voices] = useState(synth.getVoices());

  const utter = (name, voiceId) => {
    const utterThis = new SpeechSynthesisUtterance(name)
    utterThis.voice = voices[voiceId];
    synth.speak(utterThis);
  }

  const utterRandom = (name) => {
     utter(name, getRandomInt(0, voices.length-1))
  }

  return voices ? utterRandom : undefined;
}


