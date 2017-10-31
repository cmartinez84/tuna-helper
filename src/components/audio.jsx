import React, { Component } from 'react';
import Tuna from 'tunajs';
import audioPath from './../crap.wav'
class Audio extends Component {


    featuredEffect = "reverb";
    createAudioContext = window.AudioContext || window.webkitAudioContext || window.webkitAudioContext;
    ctx = new this.createAudioContext();


    tuna = new Tuna(this.ctx);
    chorusNode = new this.tuna.Chorus({
         rate: 1.5,
         feedback: 0.2,
         delay: 0.0045,
         bypass: 0
    });

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
            console.log(soundObj.soundToPlay);
            playSound.buffer = soundObj.soundToPlay;
            playSound.connect(this.chorusNode);
            this.chorusNode.connect(this.ctx.destination);
            playSound.start()
        }

        return soundObj;

    }
 // stuf.play();

onChange = (e) =>{
  var newValue = e.target.value;
  console.log(this.chorusNode['rate']);
  this.chorusNode['rate'] = newValue;
}

  render() {
    return (
    <div>
      <button onClick={this.audioFileLoader}>PLAY</button>
        <p>Rate</p>
        <input type="range" min="0.01" max="8" step="0.1" onChange={this.onChange}></input>
        <p>Feedback</p>
        <input type="range" min="0"  max="3" ></input>
        <p>Delay</p>
        <input type="range" min="0" max="1" step="0.05"></input>
        <p>Bypass</p>
        <input type="range" min="0" max="1" step="1"></input>

  </div>
  );
}
}
export default Audio;
