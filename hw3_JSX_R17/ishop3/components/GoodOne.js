import React from 'react';
import PropTypes from 'prop-types';
import './GoodOne.css';

class GoodOne extends React.Component {

    static propTypes = {
        imgUrl: PropTypes.string.isRequired,
        code: PropTypes.number.isRequired,
        ironMaterial: PropTypes.string.isRequired,
        ironName: PropTypes.string.isRequired,
        count: PropTypes.number,
        cbDeleteGood: PropTypes.func.isRequired,
        cbEditGood: PropTypes.func.isRequired,
        cbSelectGood: PropTypes.func.isRequired,
        isSelected: PropTypes.bool.isRequired,
        flagDisabledForEdit: PropTypes.bool.isRequired,
        flagDisabledForNewAndDelete: PropTypes.bool.isRequired,
    }
    state = {
        flagDisabledForEdit: this.props.flagDisabledForEdit,
        flagDisabledForNewAndDelete: this.props.flagDisabledForNewAndDelete,
    }
componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps != this.props) {
            this.setState({
                flagDisabledForEdit: this.props.flagDisabledForEdit,
                flagDisabledForNewAndDelete: this.props.flagDisabledForNewAndDelete,
            })
        }
}

    deleteGood = (ev) => {
        ev.stopPropagation();
        this.props.cbDeleteGood(ev.target.id);
    }
    editGood = (ev) => {
        ev.stopPropagation();
        this.props.cbEditGood(ev.target.id.replace("row", ""));
    }

    selectGood = () => {
        this.props.cbSelectGood(this.props.code)
    }

    render() {

        return (
            <tr onClick={this.selectGood} className={(this.props.isSelected) ? ("selectedGood") : ("")}>
                <td className={'Icon'}><img className={'ImageGood'} src={this.props.imgUrl}/></td>
                <td className={'Feature'}>{this.props.ironName}</td>
                <td className={'Feature'}>{this.props.ironMaterial}</td>
                <td className={'Feature'}>{this.props.count}</td>
                <td className={'Feature'}>
                    <button className={''} id={this.props.code + "row"} onClick={this.editGood} disabled={this.state.flagDisabledForEdit}>Edit</button>
                </td>
                <td className={'Feature'}>
                    <button id={this.props.code} onClick={this.deleteGood} disabled={this.state.flagDisabledForNewAndDelete}>Delete</button>
                </td>
            </tr>
        );
    }
}

export default GoodOne;
