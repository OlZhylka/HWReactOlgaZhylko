import React from 'react';
import PropTypes from 'prop-types';
require('./ColorFrame.css');

class ColorFrame extends React.Component {
    static propTypes = {
        colors: PropTypes.arrayOf(
            PropTypes.string.isRequired,
        ),
    };

    render() {
        let element =this.props.children;
        let pasteDiv=(el,color)=><div className={"main"} style={{border:"solid 5px "+ color}}>{el}</div>;

        for (let colorInd in this.props.colors) {
        element=pasteDiv(element,this.props.colors[colorInd])
        }
//Рекурсия
        // let colorInd = 0;
        // let pasteDiv = (el) => {
        //     if (this.props.colors[colorInd]) {
        //         let color = this.props.colors[colorInd];
        //         el = <div style={{border: "solid 1px " + color, padding: "10px"}}>{el}</div>;
        //         console.log(color);
        //         colorInd++;
        //         return pasteDiv(el);
        //     } else {
        //         return el;
        //     }
        // }

        return (
            element
             // pasteDiv(this.props.children)
        );
    }

}

export default ColorFrame;
