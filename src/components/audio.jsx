import React, { Component } from 'react';
import Tuna from 'tunajs';
import audioPath from './tori.mp3'
import ControlKnob from './controlknob.jsx';


class Audio extends Component {


    featuredEffect = "reverb";
    createAudioContext = window.AudioContext || window.webkitAudioContext || window.webkitAudioContext;
    ctx = new this.createAudioContext();
    tuna = new Tuna(this.ctx);
    chorusNodeInit  = new this.tuna.Chorus({
         rate: 1.5,
         feedback:0.2,
         delay: 0.0045,
         bypass: 0
    });

    constructor(props){
      super(props);
      this.state = {
        featuredEffectNode: this.chorusNodeInit
      }
    }




    sampleData = {
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
            playSound.connect(this.state.featuredEffectNode);
            this.state.featuredEffectNode.connect(this.ctx.destination);
            playSound.start()
        }

        return soundObj;
    }
 // stuf.play();
 destroy = () => {
  //  this.state.state.chorusNode = false;
  //  console.log(this.state.chorusNode);
 }
 changeValue = (effect, value) =>{
  //  this.state.chorusNode.effect = value;
  //  console.log(this.state.chorusNode.effect);
 }

  render() {
    return (
    <div>
      <button onClick={this.audioFileLoader}>PLAY</button>
      <button onClick={this.destroy}>DESTROY</button>
      {Object.keys(this.sampleData).map((key, i)=>
        <ControlKnob  key={key}
                      effect={key}
                      data={this.sampleData[key]}
                      changeValue={this.changeValue}
          />
        )
      }

  </div>
  );
}
}
export default Audio;
