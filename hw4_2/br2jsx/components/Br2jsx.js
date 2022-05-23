import React from 'react';
import PropTypes from 'prop-types';

require('./Br2jsx.css');

class Br2jsx extends React.Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
            };
    state = {
        text: this.props.text,
    }

    render() {
        let a = /<[^<>]+>/g;
        let arr = this.state.text.split(a);
        let arrNew = [];
        arr.forEach((v, i)=>{
            if(i) {
                let el= <br key={i+"a"}/>;
                arrNew.push(el)
            }
            arrNew.push(v);
        });

        return (<div className={"main"}>
                   {arrNew}
            </div>
        )

    }
}

export default Br2jsx;

