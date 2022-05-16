"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import GoodsBlock from './components/GoodsBlock';


let ispopName='Магазинчик утюгов';
let tableHead=["Изображение", "Модель", "Материал подошвы", "На складе, ед.","Контроль"];
let ironsArr=require('./irons.json');

ReactDOM.render(
    <GoodsBlock  
    shopName={ispopName} 
    features={tableHead}
    goods={ironsArr} 
    />
  , document.getElementById('container') 
);
