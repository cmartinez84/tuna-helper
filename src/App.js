import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
//modules
import Tuna from 'tunajs';
import Knob from 'svg-knob';
//components
import Delay from './components/delay.jsx';
import Reverb from './components/reverb.jsx';
import PingPongDelay from './components/pingPongDelay.jsx';
import Audio from './components/audio.jsx';
import Header from './components/header.js';
import EffectParams from './components/effectParameterLibrary';

import './App.css';

class App extends Component {

  state = {
    aspects:
    {
      rate: 0,
      feedback:0,
      delay: 0,
      bypass: 0
    }
  }

  changeValue = (effect, value) =>{
    var aspects = {
      ...this.state.aspects,
      [effect]: parseFloat(value)
    }
   this.setState({aspects: aspects});
  }


  render() {
    return (

      <BrowserRouter>
        <div>
          <Header/>
          <Switch>
            <Route
              path="/:effectName"
              render={routeProps=><Audio
                          {...routeProps}
                          changeValue={this.changeValue}
                          aspects={this.state.aspects}
              />}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
