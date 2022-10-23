// import { useEffect } from 'react';

// export default function useVoice(action) {
// const getRecognition = () => {
//   const grammar = '#JSGF V1.0; grammar actions; public <actions> = start | stop | next ;'
//   const speechRecognitionList = new SpeechGrammarList();
//   speechRecognitionList.addFromString(grammar, 1);
//   const recognition = new SpeechRecognition();
//   recognition.grammars = speechRecognitionList;
//   recognition.continuous = false;
//   recognition.lang = 'en-US';
//   recognition.interimResults = false;
//   recognition.maxAlternatives = 1;
//   recognition.onresult = (event) => {
//     const receiveDaction = event.results[0][0].transcript;
//     if (receiveDaction === 'start'
//      || receiveDaction === 'stop'){
//       action();
//      }
//   }
// }


//   useEffect(() => {
//     const recognition = getRecognition();
//     recognition.start();

//     return () => recognition.stop();;
//   }, []);
// }


