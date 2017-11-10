import React from 'react';
import {NavLink} from 'react-router-dom';
import EffectParams from './effectParameterLibrary';


const Header = () => (
  <header>
    <span className="icn-logo"><i className="material-icons">code</i></span>
    <ul className="main-nav">
    {   Object.keys(EffectParams).map((key, i) =>
        <li key={i}><NavLink to={`/${key}`}>{key}</NavLink></li>
      )
    }
    </ul>
  </header>
);

export default Header;
