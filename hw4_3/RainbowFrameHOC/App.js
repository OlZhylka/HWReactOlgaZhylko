"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import DoubleButton from "./components/DoubleButton";
import {withRainbowFrame} from './components/withRainbowFrame';

let colorsArr = ['red', 'orange', 'yellow', 'green', '#00BFFF', 'blue', 'purple'];
let DoubleButtonWithRF = withRainbowFrame(colorsArr)(DoubleButton);
ReactDOM.render(<div>
        <DoubleButton caption1={'Маруська'} caption2={'краса круглолицая,'} cbPressed={num => alert(num)}>
            {' была от хвоста до ушей не кошка - '}
        </DoubleButton>
        <DoubleButtonWithRF caption1={'Слоны'} caption2={'милиция.'} cbPressed={num => alert(num)}>
            {', как известно, боятся мышей, и кошка при них как '}
        </DoubleButtonWithRF>
    </div>
    , document.getElementById('container')
);

