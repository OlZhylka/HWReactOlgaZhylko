"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import RainbowFrame from "./components/RainbowFrame";

let colorsArr = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];

ReactDOM.render(
     <RainbowFrame colors={colorsArr}>
        hello
  </RainbowFrame>
  , document.getElementById('container') 
);

