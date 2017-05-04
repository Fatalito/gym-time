import React, { Component } from 'react';
import getIntervals from './Intervals';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

class Timer extends Component {
  constructor(props) {
    super(props);
    const sets = getIntervals();
    const speechSynthesis = window.speechSynthesis;

    this.state = {
      elapsed: 0,
      start: new Date(),
      intervals: sets.intervals,
      totalTime: sets.totalTime,
      minutesTotal: (sets.totalTime / 60).toFixed(0),
      secondsTotal: (sets.totalTime % 60).toFixed(0),
      synth: speechSynthesis,
      voices: speechSynthesis.getVoices()
    };

    this.tick = this.tick.bind(this);
  }

  tick(){
    this.setState({elapsed: new Date() - this.state.start});
  }

  componentDidMount(){
    this.timer = setInterval(this.tick, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  render() {
    const elapsed = Math.round(this.state.elapsed / 100);
    const seconds = (elapsed / 10).toFixed(0);
    const minutes = Math.floor(seconds / 60);
    const secondsForMinutes = (seconds % 60).toFixed(0);

    const left = this.state.intervals
                             .map(i => i.time)
                             .filter(t => t > seconds)

    const currentTime = Math.min(...left)
    const exo = this.state.intervals.find(i => i.time === currentTime)

    const leftWithoutCurrent = left.filter(i => i !== currentTime)
    const nextTime = Math.min(...leftWithoutCurrent)
    const nextExo = this.state.intervals.find(i => i.time === nextTime)

    if (this.state.voices) {
        const voice = this.state.voices[getRandomInt(0, this.state.voices.length-1)];
        if(currentTime - seconds === 1){
          var utterThis = new SpeechSynthesisUtterance(nextExo.name)
          utterThis.voice = voice;
          this.state.synth.speak(utterThis);
        }
    }

    var finishTime = new Date(this.state.start);
     finishTime.setSeconds(finishTime.getSeconds() + this.state.totalTime)
    return (
        <div>
         <p style={{fontSize: 2+'em'}}>FINISH TIME <b>{finishTime.toISOString()} </b></p>
         <p style={{fontSize: 2+'em'}}>TIME <b>{seconds} / {this.state.totalTime}</b></p>
         <p style={{fontSize: 2+'em'}}>MINUTES <b>{minutes}:{secondsForMinutes}</b>/
          <b>{this.state.minutesTotal}:{this.state.secondsTotal}</b></p>
         <p style={{fontSize: 5+'em'}}>{exo.name} <b>{currentTime - seconds}</b></p>
         <p style={{fontSize: 3+'em'}}>{nextExo.name} </p>
        </div>
    );
  }
}

export default Timer;


