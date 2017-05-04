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
        {name: 'push', active: 30},
        {name: 'pull', active: 30}
        ]
    },
    { iteration :3, exercise: [
        {name: 'door pull', active: 30},
        {name: 'ball 1', active: 30},
        {name: 'ball 2', active: 30},
        {name: 'hang', active: 50},
        ]
    },
    { iteration :1, exercise: [
        {name: 'shoulder', active: 100},
        {name: 'psoas 1', active: 30},
        {name: 'psoas 2', active: 30},
        {name: 'abd', active: 30},
        {name: 'child', active: 30},
        {name: 'child arm', active: 30},
        {name: 'ham 1', active: 30},
        {name: 'ham 2', active: 30},
        {name: 'heel 1', active: 30},
        {name: 'heel 2', active: 30},
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

    return time
}

const addExes = (exercises, intervals, time) => {
    for(let i =0; i < exercises.iteration; i++){
        for(let j = 0; j < exercises.exercise.length; j++){
            var ex = exercises.exercise[j];
            console.log('ex', ex)
            var v =  addExerciseWithRest(ex, time, intervals)
            time = v;
        }
    }
    return time;
}

const getIntervals= () =>{
    const intervals = []
    let time = 0;
    time = addInterval(intervals, time, 'rest', 10);
    sets.forEach(s =>{
        console.log('---------------adding set', s.iteration, time )

        time = addExes(s, intervals, time)
    })
    return {
        totalTime: time,
        intervals: intervals
    }
}

export default getIntervals;


