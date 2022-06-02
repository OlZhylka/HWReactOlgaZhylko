import React from 'react';
import PropTypes from 'prop-types';
import './CardForGood.css';

class CardForGood extends React.Component {

    static propTypes = {
        code: PropTypes.number.isRequired,
        good: PropTypes.shape({
            code: PropTypes.number.isRequired,
            ironName: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired,
             })
    }

    state = {
        good: this.props.good,
    }

    render() {
        return (
            <div className={"card"}>
                <h4> {this.state.good.ironName}</h4>
                <p> Код товара: {this.state.good.code} </p>
                <p> На складе, ед.: {this.state.good.count} </p>
            </div>

        );

    }
}

export default CardForGood;
