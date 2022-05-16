import React from 'react';
import PropTypes from 'prop-types';
import './GoodOne.css';

class GoodOne extends React.Component {

    static propTypes = {
        imgUrl: PropTypes.string.isRequired,
        code: PropTypes.number.isRequired,
        ironMateria: PropTypes.string.isRequired,
        ironName: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        cbDeleteGood: PropTypes.func.isRequired,
        cbSelectGood: PropTypes.func.isRequired,
        isSelected: PropTypes.bool.isRequired,
    }

    deleteGood= (ev) => {
        ev.stopPropagation();
        this.props.cbDeleteGood(ev.target.id);
    }

    selectGood = (ev) => {
        // if (ev.target.className != "Delete") {
        //     this.props.cbSelectGood(this.props.code);
        // }
        this.props.cbSelectGood(this.props.code)
    }

    render() {

        return (
            <tr onClick={this.selectGood} className={(this.props.isSelected) ? ("selectedGood") :("")}>
       <td className={'Icon'}><img className={'ImageGood'} src={this.props.imgUrl} /></td>
                         
           <td className={'Feature'}>{this.props.ironName}</td>
           <td className={'Feature'}>{this.props.ironMateria}</td>
           <td className={'Feature'}>{this.props.count}</td>
           <td className={'Feature'}>
               <button className={'Delete'} id={this.props.code} onClick={this.deleteGood}>Delete</button></td>
               </tr>
        );
               }
            }

export default GoodOne;
