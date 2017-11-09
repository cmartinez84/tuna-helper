import React, { Component } from 'react';
import Tuna from 'tunajs';
import audioPath from './tori.mp3'
import ControlKnob from './controlknob.jsx';


class Audio extends Component {

    createAudioContext = window.AudioContext || window.webkitAudioContext || window.webkitAudioContext;
    ctx = new this.createAudioContext();
    tuna = new Tuna(this.ctx);
    chorusNodeInit;


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
    componentWillReceiveProps = (nextProps) =>{
      // Object.keys(nextProps.aspects).map(function(key, index) {
      //   this.chorusNodeInit[key]: nextProps.aspects[key];
      // });
      this.chorusNodeInit = {
        ...this.chorusNodeInit,
        ...nextProps.aspects
      }
      var newthing = this.chorusNodeInit;
      this.chorusNodeInit = null;
      this.chorusNodeInit = newthing;
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
            playSound.connect(this.chorusNodeInit);
            this.chorusNodeInit.connect(this.ctx.destination);
            playSound.start()
        }

        return soundObj;
    }
 // stuf.play();
 loadTuna = () =>{
   this.chorusNodeInit  = new this.tuna.Chorus({
        rate: this.props.aspects.rate,
        feedback:this.props.aspects.feedback,
        delay: this.props.aspects.delay,
        bypass: this.props.aspects.bypass,
   });
 }
 destroy = () => {
 //   this.state.state.chorusNode = false;
 //   console.log(this.state.chorusNode);
 }
 changeValue = (effect, value) =>{
   this.props.changeValue(effect, value);
 }

  render() {
    return (
    <div>
      <button onClick={this.loadTuna}>loadTuna</button>
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
