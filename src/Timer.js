import React, { Component } from 'react';

//const rope = { active: 10, rest: 20, iteration: 20}
const sets = [
    { iteration: 10, exercise: [
        {name: 'rope', active: 10,
         rest: 50}
        ]
    },
    { iteration :4, exercise: [
        {name: 'sh1', active: 30},
        {name: 'lunge 1', active: 25},
        {name: 'lunge 2', active: 25},
        {name: 'dislocate', active: 40}
        ]
    },
    { iteration :3, exercise: [
        {name: 'sh2', active: 30},
        {name: 'abs', active: 30},
        {name: 'push', active: 30}
        ]
    },
    { iteration :3, exercise: [
        {name: 'door pull', active: 30},
        {name: 'ball 1', active: 30},
        {name: 'ball 2', active: 30}
        ]
    },
    { iteration :1, exercise: [
        {name: 'shoulder', active: 100},
        {name: 'child', active: 30},
        {name: 'child arm', active: 30},
        {name: 'ham 1', active: 30},
        {name: 'ham 2', active: 30},
        {name: 'heel 1', active: 30},
        {name: 'heel 2', active: 30},
        {name: 'abd', active: 30},
        {name: 'psoas 1', active: 30},
        {name: 'psoas 2', active: 30},
        {name: 'quads', active: 30},
        {name: 'glute 1', active: 30},
        {name: 'glute 2', active: 30},
        {name: 'chest 1', active: 30},
        {name: 'chest 2', active: 30},
        {name: 'chest all', active: 30}
        ]
    }
]


const addInterval = (intervals, time, name, delay) => {
    intervals.push({name: name, time: time + delay})
    return time + delay;
}

const addExerciseWithRest = (ex, time, intervals) => {
    time = addInterval(intervals, time, ex.name, ex.active);
    time = addInterval(intervals, time, ex.rest ? ex.name + ' rest' : 'rest', ex.rest ? ex.rest: 5);
}

const addExes = (exercises, intervals, time) => {
    for(let i =0; i < exercises.iteration; i++){
        exercises.exercise.forEach(ex => addExerciseWithRest(ex, time, intervals))
    }
    return time;
}

const getIntervals= () =>{
    const intervals = []
    let time = 0;
    time = addInterval(intervals, time, 'rest', 10);
    sets.forEach(s =>{
        time = addExes(s, intervals, time)
    })
    return {
        totalTime: time,
        intervals: intervals
    }
}

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

    return (
        <div>
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


