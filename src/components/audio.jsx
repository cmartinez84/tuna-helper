import React, { Component } from 'react';
import Tuna from 'tunajs';
import audioPath from './tori.mp3'
import ControlKnob from './controlknob.jsx';
import EffectParams from './effectParameterLibrary';



class Audio extends Component {

    createAudioContext = window.AudioContext || window.webkitAudioContext || window.webkitAudioContext;
    ctx = new this.createAudioContext();
    tuna = new Tuna(this.ctx);
    featuredNodet;

    loadTuna = () =>{
      var tunaFeature = this.props.match.params.effectName;
      switch (tunaFeature) {
        case  'chorus':
        this.featuredNode  = new this.tuna.Chorus();
        break;
        case 'delay':
        this.featuredNode  = new this.tuna.Delay();
        break;
        case 'phaser':
        this.featuredNode  = new this.tuna.Phaser();
        break;
        case 'overdrive':
        this.featuredNode  = new this.tuna.Overdrive();
        break;
        case 'wahwah':
        this.featuredNode  = new this.tuna.WahWah();
        break;
        default:
        console.log("default");
        break;
      }
    }

    componentWillReceiveProps = (nextProps) =>{
      if(this.featuredNode){
        Object.keys(nextProps.aspects).map((key, index) => {
            this.featuredNode[key] = nextProps.aspects[key];
        });
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
            playSound.connect(this.featuredNode);
            this.featuredNode.connect(this.ctx.destination);
            playSound.start()
        }

        return soundObj;
    }

 changeValue = (effect, value) =>{
   this.props.changeValue(effect, value);
  }

  render() {
    const featuredEffectName = this.props.match.params.effectName;
    const featuredEffectParams = EffectParams[featuredEffectName];

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
