import React, { Component } from 'react';
import Tuna from 'tunajs';

class ControlKnob extends Component {


onValueChange = (e) =>{
  var newValue = e.target.value;
  console.log(this.props);
  this.props.changeValue(this.props.effect, newValue);
}


  render() {
    return (
    <div>
      <p> {this.props.effect}</p>
      <input type="range"
        onChange={this.onValueChange}
        min={this.props.data.min}
        max={this.props.data.max}
        step={this.props.data.increments}
        ></input>
    </div>
  );
}
}
export default ControlKnob;
