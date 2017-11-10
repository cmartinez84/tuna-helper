import React, { Component } from 'react';
import Tuna from 'tunajs';
import audioPath from './tori.mp3'
import ControlKnob from './controlknob.jsx';



class Audio extends Component {

    createAudioContext = window.AudioContext || window.webkitAudioContext || window.webkitAudioContext;
    ctx = new this.createAudioContext();
    tuna = new Tuna(this.ctx);
    featuredNode;


    effectParams ={
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
      }
    }


    // componentDidMount =()=>{
    //   console.log(this.props.match.params.effectName);
    // }

    loadTuna = () =>{
      var tunaFeature = this.props.match.params.effectName;
      switch (tunaFeature) {
        case  'chorus':
        this.featuredNode  = new this.tuna.Chorus({
             rate: 0,
             feedback:0,
             delay: 0,
             bypass: 0
        });
        break;
        case tunaFeature ==='delay':
        this.featuredNode  == new this.tuna.Delay({
                feedback: 0.45,    //0 to 1+
                delayTime: 150,    //1 to 10000 milliseconds
                wetLevel: 0.25,    //0 to 1+
                dryLevel: 1,       //0 to 1+
                cutoff: 2000,      //cutoff frequency of the built in lowpass-filter. 20 to 22050
                bypass: 0
              });
          break;
        default:
        console.log("default");
        break;
      }


    }
    ///////_____
    // this.featuredNode  = new this.tuna.[tunaFeature]({
    //      rate: this.props.aspects.rate,
    //      feedback:this.props.aspects.feedback,
    //      delay: this.props.aspects.delay,
    //      bypass: this.props.aspects.bypass,
    // });
    ///////_____

    componentWillReceiveProps = (nextProps) =>{
      Object.keys(nextProps.aspects).map((key, index) => {
        this.featuredNode[key] = nextProps.aspects[key];
      });
    }
     audioFileLoader = () =>{

        var soundObj = {};
        soundObj.fileDirectory = audioPath;

        var getSound = new XMLHttpRequest();
        getSound.open("GET", soundObj.fileDirectory, true);
        getSound.responseType = "arraybuffer";
        getSound.onload = () => {
            this.ctx.decodeAudioData(getSound.response, function(buffer) {
                soundObj.soundToPlay = buffer;
                soundObj.play();
            });
        }

        getSound.send();

        soundObj.play = () => {
            var playSound = this.ctx.createBufferSource();
            playSound.buffer = soundObj.soundToPlay;
            playSound.connect(this.featuredNode);
            this.featuredNode.connect(this.ctx.destination);
            playSound.start()
        }

        return soundObj;
    }

 destroy = () => {
 //   this.state.state.chorusNode = false;
 //   console.log(this.state.chorusNode);
 }
 changeValue = (effect, value) =>{
   this.props.changeValue(effect, value);
  }

  render() {
    const featuredEffectName = this.props.match.params.effectName;
    const featuredEffectParams = this.effectParams[featuredEffectName];
    console.log(featuredEffectParams);

    return (
    <div>
      <button onClick={this.loadTuna}>loadTuna</button>
      <button onClick={this.audioFileLoader}>PLAY</button>
      <button onClick={this.destroy}>DESTROY</button>
      {Object.keys(featuredEffectParams).map((key, i)=>
        <ControlKnob  key={key}
                      effect={key}
                      data={featuredEffectParams[key]}
                      changeValue={this.changeValue}
          />
        )
      }
  </div>
  );
}
}
export default Audio;
