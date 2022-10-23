const hyppoLength = 14;
const stretchLength = 35;
const sets = [
  // {
  //   iteration: 1,
  //   name: "warmup",
  //   exercise: [{name: "rope", active: 240, rest: 10}],
  // },
  // {
  //   name: "activation",
  //   iteration: 1,
  //   exercise: [
  //     {name: "shoulder ball 1", active: 30, rest: 5},
  //     {name: "shoulder ball 2", active: 30, rest: 5},
  //     {name: "hip ball 1", active: 30, rest: 5},
  //     {name: "hip ball 2", active: 30, rest: 5},
  //     {name: "glute brigde", active: 30},
  //     {name: "clam  1", active: 30},
  //     {name: "clam  2", active: 30},
  //     {name: "pelvic tilt glide", active: 30},
  //     {name: "figure 4 kick", active: 30, rest: 10},
  //     {name: "pec strech 1", active: 30, rest: 5},
  //     {name: "pec strech 2", active: 30, rest: 5},
  //     {name: "snow angel", active: 30, rest: 5},
  //     {name: "lunge hip 1", active: 30, rest: 5},
  //     {name: "lunge hip 2", active: 30, rest: 5},
  //     {name: "lunge 1", active: 30, rest: 5},
  //     {name: "lunge 2", active: 30, rest: 5},
  //     {name: "side lunge 1", active: 30, rest: 5},
  //     {name: "side lunge 2", active: 30, rest: 5},
  //     {name: "feet stretch bear", active: 30, rest: 10},
  //     {name: "wrist", active: 30, rest: 10},
  //     {name: "scapular pushup", active: 30, rest: 10},
  //     {name: "leg kick 1", active: 30, rest: 10},
  //     {name: "leg kick 2", active: 30, rest: 10},
  //   ],
  // },
  // {
  //   name: "Hypopressive",
  //   iteration: 1,
  //   exercise: [
  //     {name: "lying 1", active: hyppoLength, rest: 5},
  //     {name: "lying 2", active: hyppoLength, rest: 5},
  //     {name: "lying 3", active: hyppoLength, rest: 5},
  //     {name: "sitting 1", active: hyppoLength, rest: 5},
  //     {name: "sitting 2", active: hyppoLength, rest: 5},
  //     {name: "sitting 3", active: hyppoLength, rest: 5},
  //     {name: "kneeling face down 1", active: hyppoLength, rest: 5},
  //     {name: "kneeling face down 2", active: hyppoLength, rest: 5},
  //     {name: "kneeling face down 3", active: hyppoLength, rest: 5},
  //     {name: "downward knee 1", active: hyppoLength, rest: 5},
  //     {name: "downward knee 2", active: hyppoLength, rest: 5},
  //     {name: "downward knee 3", active: hyppoLength, rest: 5},
  //     {name: "plank 1", active: hyppoLength, rest: 5},
  //     {name: "plank 2", active: hyppoLength, rest: 5},
  //     {name: "plank 3", active: hyppoLength, rest: 5},
  //     {name: "leaning 1", active: hyppoLength, rest: 5},
  //     {name: "leaning 2", active: hyppoLength, rest: 5},
  //     {name: "leaning 3", active: hyppoLength, rest: 5},
  //     {name: "standing 1", active: hyppoLength, rest: 5},
  //     {name: "standing 2", active: hyppoLength, rest: 5},
  //     {name: "standing 3", active: hyppoLength, rest: 5},
  //   ],
  // },
  // {
  //   name: "mobility",
  //   iteration: 1,
  //   exercise: [
  //     {name: "dislocate", active: 30},
  //     {name: "shoulder back", active: 40},
  //     {name: "active hang", active: 30, rest: 10},
  //     {name: "lying shoulder / superman", active: 30, rest: 10},
  //     {name: "squat", active: 60, rest: 5},
  //     {name: "wrist", active: 40, rest: 5},
  //   ],
  // },
  // {
  //   name: "mobility flow 1",
  //   iteration: 3,
  //   exercise: [
  //     {name: "squat", active: 8, rest: 1},
  //     {name: "pike reach", active: 15, rest: 1},
  //     {name: "cobra", active: 8, rest: 2},
  //   ],
  // },
  {
    name: "mobility flow 2",
    iteration: 3,
    exercise: [
      {name: "archer squat 1", active: 8, rest: 1},
      {name: "shaolin sit 1", active: 8, rest: 1},
      {name: "archer squat 2", active: 8, rest: 1},
      {name: "shaolin sit 2", active: 8, rest: 2},
    ],
  },
  {
    name: "mobility flow 3",
    iteration: 3,
    exercise: [
      {name: "toe touch", active: 7, rest: 1},
      {name: "easy bridge", active: 7, rest: 1},
    ],
  },
  // {
  //   iteration: 1,
  //   name: "yoga",
  //   exercise: [{name: "yoga", active: 920, rest: 40}],
  // },
  {
    name: "work",
    iteration: 3,
    exercise: [
      // {name: "jefferson", active: 30},
      {name: "push", active: 40},
      // {name: "jump", active: 40},
      {name: "squat", active: 40},
      // {name: "lunge 1", active: 40},
      // {name: "lunge 2", active: 40},
      {name: "pull 1", active: 40, rest: 30},
      {name: "pull 2", active: 40, rest: 30},
    ],
  }, //work
  // {
  //   iteration: 1,
  //   name: "abs",
  //   exercise: [{name: "abs", active: 600, rest: 10}],
  // },
  // {
  //   iteration: 20,
  //   name: "cardio",
  //   exercise: [{name: "rope", active: 50, rest: 10}],
  // },
  // {
  //   iteration: 8,
  //   name: "tabata",
  //   exercise: [{name: "burpee", active: 20, rest: 10}],
  // },
  // {
  //   name: "roll",
  //   iteration: 1,
  //   exercise: [
  //     {name: "feet 1", active: 30},
  //     {name: "feet 2", active: 30},
  //     {name: "calf 1", active: 40},
  //     {name: "calf 2", active: 40},
  //     {name: "ham 1", active: 40},
  //     {name: "ham 2", active: 40},
  //     {name: "glute 1", active: 30},
  //     {name: "glute 2", active: 30},
  //     {name: "quad 1", active: 40},
  //     {name: "i t band 1", active: 40},
  //     {name: "psoas 1", active: 30},
  //     {name: "adducteur 1", active: 30},
  //     {name: "quad 2", active: 40},
  //     {name: "i t band 2", active: 40},
  //     {name: "psoas 2", active: 30},
  //     {name: "adducteur 2", active: 30},
  //     {name: "lower back 1", active: 40},
  //     {name: "back 1", active: 40},
  //     {name: "trap 1", active: 40},
  //     {name: "shoulder 1", active: 30},
  //     {name: "triceps 1", active: 30},
  //     {name: "lower back 2", active: 40},
  //     {name: "back 2", active: 40},
  //     {name: "trap 2", active: 40},
  //     {name: "shoulder 2", active: 30},
  //     {name: "triceps 2", active: 30},
  //     {name: "biceps 1", active: 30},
  //     {name: "front shoulder 1", active: 30},
  //     {name: "pecs 1", active: 30},
  //     {name: "biceps 2", active: 30},
  //     {name: "front shoulder 2", active: 30},
  //     {name: "pecs 2", active: 30},
  //   ],
  // }, //ball
  // {
  //   name: "baby",
  //   iteration: 1,
  //   exercise: [{name: "baby", active: 60}],
  // },
  // {
  //   name: "stretch",
  //   iteration: 3,
  //   exercise: [
  //     {name: "hang 1", active: stretchLength},
  //     // {name: "hang 2", active: stretchLength},
  //     {name: "calf 1", active: stretchLength}, //bear
  //     // {name: "calf 2", active: stretchLength},
  //     {name: "quad 1", active: stretchLength}, //lying, sitting (both), lunge
  //     {name: "quad 2", active: stretchLength},
  //     {name: "psoas 1", active: stretchLength}, //lunge
  //     {name: "psoas 2", active: stretchLength},
  //     {name: "ham 1", active: stretchLength}, //standing, sitted, toe touch (both)
  //     {name: "ham 2", active: stretchLength},
  //     {name: "glute 1", active: stretchLength}, //lying twist, sitting twist, pigeon
  //     {name: "glute 2", active: stretchLength},
  //     {name: "adducteur", active: stretchLength},
  //     {name: "buttefly", active: stretchLength}, // buttefly?
  //     {name: "back", active: stretchLength}, //rolled
  //     {name: "abs", active: stretchLength}, // cobra, car
  //     {name: "pecs 1", active: stretchLength}, //lying,
  //     {name: "pecs 2", active: stretchLength},
  //     {name: "archer squat 1", active: stretchLength},
  //     {name: "archer squat 2", active: stretchLength},
  //     {name: "shoulder - biceps - traps 1", active: stretchLength}, //band
  //     {name: "shoulder - biceps - traps 2", active: stretchLength}, //band
  //     {name: "shoulder - triceps 1", active: stretchLength},
  //     {name: "shoulder - triceps 2", active: stretchLength},
  //     {name: "downward pike 1", active: 15},
  //     {name: "downward pike 2", active: 15},
  //   ],
  // }, //strech
  // {
  //   name: "relax", //lunge, glute, hamstring, butterly
  //   iteration: 1,
  //   exercise: [
  //     {name: "child", active: stretchLength},
  //     // {name: "chest all", active: 30},
  //   ],
  // },
  // {
  //   name: "ministretch",
  //   iteration: 1,
  //   exercise: [
  //     {name: "psoas 1", active: 2 * stretchLength}, //lunge
  //     {name: "psoas 2", active: 2 * stretchLength},
  //     {name: "ham 1", active: 2 * stretchLength}, //standing, sitted, toe touch (both)
  //     {name: "glute 1", active: 2 * stretchLength}, //lying twist, sitting twist, pigeon
  //     {name: "glute 2", active: 2 * stretchLength}, //lying twist, sitting twist, pigeon
  //     {name: "buttefly", active: 2 * stretchLength}, // buttefly?
  //     {name: "back", active: 2 * stretchLength}, //rolled
  //     {name: "pecs 1", active: 2 * stretchLength}, //lying,
  //     {name: "pecs 2", active: 2 * stretchLength},
  //     {name: "child", active: 2 * stretchLength},
  //   ],
  // }, //strech
];

const addInterval = (intervals, time, name, delay) => {
  intervals.push({name: name, time: time + delay});
  return time + delay;
};

const addExerciseWithRest = (ex, time, intervals) => {
  time = addInterval(intervals, time, ex.name, ex.active);
  time = addInterval(
    intervals,
    time,
    ex.rest ? ex.name + " rest" : "rest",
    ex.rest ?? 10
  );
  return time;
};

const addExes = (exercises, intervals, time) => {
  for (let i = 0; i < exercises.iteration; i++) {
    for (let j = 0; j < exercises.exercise.length; j++) {
      const ex = exercises.exercise[j];
      time = addExerciseWithRest(ex, time, intervals);
    }
  }
  return time;
};

const getIntervals = () => {
  const intervals = [];
  let time = 0;
  time = addInterval(intervals, time, "rest", 10);
  sets.forEach((s) => (time = addExes(s, intervals, time)));
  return {
    totalTimeMs: time * 1000,
    intervals: intervals,
  };
};

export default getIntervals;
