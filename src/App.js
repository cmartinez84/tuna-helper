import React, { Component } from 'react';
//modules
import Tuna from 'tunajs';
import Knob from 'svg-knob';
//components
import Delay from './components/delay.jsx';
import Reverb from './components/reverb.jsx';
import PingPongDelay from './components/pingPongDelay.jsx';
import Audio from './components/audio.jsx';
import './App.css';


class App extends Component {
  //
  featuredEffect = "reverb";
  // createAudioContext = window.AudioContext || window.webkitAudioContext || window.webkitAudioContext;
  // ctx = new this.createAudioContext();
  //
  //
  tuna = new Tuna(this.ctx);
  chorusNode = new this.tuna.Chorus({
       rate: 1.5,
       feedback: 0.2,
       delay: 0.0045,
       bypass: 0
  });

  //
  // audioFileLoader = () =>{
  //   // console.log("toot");
  //     var soundObj = {};
  //     soundObj.fileDirectory = './sounds/guiltmaster.wav';
  //     var getSound = new XMLHttpRequest();
  //     getSound.open("GET", soundObj.fileDirectory, true);
  //     getSound.responseType = "arraybuffer";
  //     getSound.onload = () => {
  //       console.log(getSound.response);
  //         this.ctx.decodeAudioData(getSound.response, function(buffer) {
  //           // console.log(buffer);
  //           console.log(buffer);
  //             // this.soundObj.soundToPlay = buffer;
  //         });
  //     }
  //     getSound.send();
  // //       var playSound = this.ctx.createBufferSource();
  // //       playSound.buffer = soundObj.soundToPlay;
  // //       playSound.connect(this.ctx.destination);
  // //       playSound.start(this.ctx.currentTime);
  // }

  // function loadFile() {
  //     var req = new XMLHttpRequest();
  //     req.open("GET","music.mp3",true);
  //     req.responseType = "arraybuffer";
  //     req.onload = function() {
  //         //decode the loaded data
  //         ctx.decodeAudioData(req.response, function(buffer) {
  //             buf = buffer;
  //             play();
  //         });
  //     };
  //     req.send();
  // }
  // Once the file is loaded it must be decoded into a raw sound buffer. The code above does this with another callback function. Once decoded we can actually play the sound.
  //
  // //play the loaded file
  // function play() {
  //     //create a source node from the buffer
  //     var src = ctx.createBufferSource();
  //     src.buffer = buf;
  //     //connect to the final output node (the speakers)
  //     src.connect(ctx.destination);
  //     //play immediately
  //     src.noteOn(0);
  // }
  //





  // soundObj = this.audioFileLoader();
  // audioFileLoader();


  // {(() => {
  //     switch(this.featuredEffect) {
  //         case 'reverb':
  //             return <Reverb />;
  //         case 'warning':
  //             return <Delay />;
  //         case 'error':
  //             return <PingPongDelay  />;
  //         default:
  //             return null;
  //     }
  // })()}


  render() {
    return (
      <div >
        <Audio/>






      </div>
    );
  }
}

export default App;
