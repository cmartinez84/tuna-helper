const effectParams = {
  chorus:{
    rate: {
      min: 0,
      max: 8,
      increments: .01
    },
    feedback: {
      min: 0,
      max: 10,
      increments: .1
    },
    delay: {
      min: 0,
      max: 1,
      increments: .001
    },
    bypass: {
      min: 0,
      max: 1,
      increments: 1
    }
  },
  delay:{
    feedback: {
      min:  0,
      max: 1,
      increments: 1
    },
    delayTime: {
      min: 1,
      max: 10000,
      increments:200,
    },
    wetLevel: {
      min: 0,
      max: 1,
      increments: 1
    },
    dryLevel: {
      min: 0,
      max: 1,
      increments: 1
    },
    cutoff: {
      min: 20,
      max: 20000,
      increments: 500
    },
    bypass: {
      min: 0,
      max: 0,
      increments: 0
    }
  },
  phaser: {
    rate:{
      min: 0,
      max: 8,
      increments: 0.1
    },
    depth: {
      min: 0,
      max: 1,
      increments: 0.1,
    },
    feedback:{
      min: 0,
      max: 1,
      increments: 0.1,
    },
    stereoPhase: {
      min: 9,
      max: 180,
      increments: 1
    },
    baseModularityFrequency: {
      min: 500,
      max: 500,
      increments: 100
    },
    bypass:{
      min: 0,
      max: 1,
      increments: 0
    }
  },
  overdrive: {
    outputGain: {
      min: 0,
      max: 0,
      increments: 0.1,
    },
    drive: {
      min: 0,
      max: 0,
      increments: 0.1
    },
    curveAmount:{
      min: 0,
      max: 0,
      increments: .1
    },
    algorithIndex: {
      min: 0,
      max: 5,
      increments: 1
    },
  },
  wahwah:{
    baseFrequency:{
      min: 0,
      max: 1,
      increments: 1
    },
    excursionOctaves:{
      min: 1,
      max: 6,
      increments: 1
    },
    sweep: {
      min: 0,
      max: 1,
      increments: 0.1
    },
    resonance: {
      min: 1,
      max: 100,
      increments: 1
    },
    sensitivity: {
      min: -1,
      max: 1,
      increments: .1
    }
  }
}

export default effectParams;
