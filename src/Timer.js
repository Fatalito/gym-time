import React, { Component } from 'react';
import getIntervals from './Intervals';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const getHumanFormat = (timeMs) => {
    const elapsed = Math.round(timeMs/ 100);
    const seconds = (elapsed / 10).toFixed(0);

    return { elapsed: elapsed,
            seconds: seconds,
            minutes: Math.floor(seconds / 60),
            secondsForMinutes:  (seconds % 60).toFixed(0)
    }
}

class Timer extends Component {
  constructor(props) {
    super(props);
    const sets = getIntervals();
    const speechSynthesis = window.speechSynthesis;
    const totalTime = getHumanFormat(sets.totalTimeMs)
    this.state = {
      elapsed: 0,
      start: new Date(),
      intervals: sets.intervals,
      totalTime: totalTime.seconds,
      minutesTotal: totalTime.minutes,
      secondsTotal: totalTime.secondsForMinutes,
      synth: speechSynthesis,
      voices: speechSynthesis.getVoices(),
      pauses: [],
      paused: false
    };
  }

  tick = () => {
    if (this.state.paused){
        const pause = this.state.pauses.pop()
        pause.elapsed =  new Date() - pause.start
        this.setState({elapsed: new Date() - this.state.start, pauses: [...this.state.pauses,  pause]});
    }
    this.setState({elapsed: new Date() - this.state.start});
  }

  stopPause = () => {
    this.setState({paused: false});
  }

  addPause = () => {
    const pause = { start: new Date(), elapsed: 0}
    const pauses = this.state.pauses.length > 0 ? [...this.state.pauses,  pause] : [pause]
    this.setState({paused: true, pauses: pauses});
  }

  managePause = () =>{
    if (this.state.paused)
        return this.stopPause()
    this.addPause();
  }

  keyPress = (e) =>{
    if(e.keyCode === 32){
       e.preventDefault();
        this.managePause()
    }
  }

  componentDidMount(){
    document.addEventListener("keydown", this.keyPress, true);
    this.timer = setInterval(this.tick, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
     window.removeEventListener('keydown', this.keyPress);
  }


  render() {
    const pausedTimeMs = this.state.pauses.reduce((acc, p)=> (acc + p.elapsed), 0)
    const pausedTime = getHumanFormat( pausedTimeMs )

    const elapsedWithoutPauseMs = this.state.elapsed - pausedTimeMs
    const time = getHumanFormat(elapsedWithoutPauseMs)

    const finishTime = new Date(this.state.start.getTime() + this.state.totalTime * 1000 + pausedTimeMs);

    const left = this.state.intervals
                             .map(i => i.time)
                             .filter(t => t > time.seconds)
    const currentTime = Math.min(...left)
    const exo = this.state.intervals.find(i => i.time === currentTime)

    const leftWithoutCurrent = left.filter(i => i !== currentTime)
    const nextTime = Math.min(...leftWithoutCurrent)
    const nextExo = this.state.intervals.find(i => i.time === nextTime)

    if (this.state.voices) {
        const voice = this.state.voices[getRandomInt(0, this.state.voices.length-1)];
        if(currentTime - time.seconds === 1){
          var utterThis = new SpeechSynthesisUtterance(nextExo.name)
          utterThis.voice = voice;
          this.state.synth.speak(utterThis);
        }
    }

    return (
        <div style={{backgroundColor: this.state.paused ? 'lightsalmon' : ''}}>
         <p style={{fontSize: 2+'em'}}>START<b> {this.state.start.toLocaleTimeString()}</b></p>
         <p style={{fontSize: 2+'em'}}>PAUSE<b> {pausedTime.seconds}</b></p>
         <p style={{fontSize: 2+'em'}}>FINISH<b> {finishTime.toLocaleTimeString()}</b></p>
         <p style={{fontSize: 2+'em'}}>TIME <b>{time.seconds} / {this.state.totalTime}</b></p>
         <p style={{fontSize: 2+'em'}}>MINUTES <b>{time.minutes}:{time.secondsForMinutes}</b>/
          <b>{this.state.minutesTotal}:{this.state.secondsTotal}</b></p>
         <p style={{fontSize: 5+'em'}}>{exo.name} <b>{currentTime - time.seconds}</b></p>
         <p style={{fontSize: 3+'em'}}>{nextExo.name} </p>
        </div>
    );
  }
}

export default Timer;


