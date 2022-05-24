import React from 'react';
require('./withRainbowFrame.css');

const withRainbowFrame = colors => Comp => {
    class CompWithRainbowFrame extends React.Component {
        render() {
            let el = <Comp {...this.props}/>;
             colors.forEach((color) => {
                 el = <div className={"rainBow"} style={{border: "solid 5px " + color}}>{el}</div>
             }
            );
            return el;
        }
    }
return CompWithRainbowFrame;
}
export {withRainbowFrame};

