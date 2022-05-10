"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var GoodsBlock = require('./components/GoodsBlock');

var ispopName = 'Магазинчик утюгов';
    var tableHead = ["Изображение", "Модель", "Материал подошвы", "На складе, ед.","Контроль"]
    var ironsArr = [
        {
            ironName: 'Normann AIR-209',
            code: 1,
            ironMateria: 'тефлон',
            count: 12,
            imgUrl: './images/air209_normann.webp'
        },
        {
            ironName: 'Holt HT-IR-010',
            code: 2,
            ironMateria: 'керамика',
            count: 8,
            imgUrl: './images/htir010_holt.webp'
        },
        {
            ironName: 'Normann AIR-507',
            code: 3,
            ironMateria: 'керамика',
            count: 40,
            imgUrl: './images/air507_normann.webp'
        },
        {
            ironName: 'Philips GC1741/70',
            code: 4,
            ironMateria: 'тефлон',
            count: 20,
            imgUrl: './images/gc174170_philips.webp'
        },
    ];

    ReactDOM.render(
        React.createElement(GoodsBlock, {shopName: ispopName, features: tableHead, goods: ironsArr}),
        document.getElementById('container')
    );
