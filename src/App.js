import React, { Component } from 'react';
//modules
import Tuna from 'tunajs';
import Knob from 'svg-knob';
//components
import Delay from './components/delay.jsx';
import Reverb from './components/reverb.jsx';
import PingPongDelay from './components/pingPongDelay.jsx';
import './App.css';

class App extends Component {

  featuredEffect = "reverb";

  // {this.featuredEffect}
  // <Delay/>
  // <Reverb/>
  // <PingPongDelay/>

  render() {
    return (
      <div >
        {(() => {
            switch(this.featuredEffect) {
                case 'reverb':
                    return <Reverb />;
                case 'warning':
                    return <Delay />;
                case 'error':
                    return <PingPongDelay  />;
                default:
                    return null;
            }
        })()}





      </div>
    );
  }
}

export default App;
