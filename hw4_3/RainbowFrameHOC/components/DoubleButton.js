import React from 'react';
import PropTypes from 'prop-types';
require('./DoubleButton.css');

class DoubleButton extends React.Component {
    static propTypes = {
        caption1: PropTypes.string.isRequired,
        caption2: PropTypes.string.isRequired,
        cbPressed: PropTypes.func,
    }

    choose = (e) =>  {
        this.props.cbPressed(e.target.dataset.num)};

    render() {
        return(<div className={"main"}>
                <input type="button" value={this.props.caption1} onClick={this.choose} data-num={1}/>
                     {this.props.children}
                <input type="button" value={this.props.caption2} onClick={this.choose} data-num={2}/>
            </div>
        );
    }
}

export default DoubleButton;
