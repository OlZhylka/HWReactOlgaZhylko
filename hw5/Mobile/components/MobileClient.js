import React from 'react';
import PropTypes from 'prop-types';
import {
    clientsEvents,
    EvDeleteClicked,
    EvEditClicked,
} from "./events";
import './MobileClient.css';

class MobileClient extends React.PureComponent {

    static propTypes = {
        client: PropTypes.shape({
            id: PropTypes.number.isRequired,
            fam: PropTypes.string.isRequired,
            im: PropTypes.string.isRequired,
            otch: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired,
        })
    };

    state = {
        fam: this.props.client.fam,
        im: this.props.client.im,
        otch: this.props.client.otch,
        balance: this.props.client.balance,
        flagBlocked: 0,
    };

    componentDidUpdate = (oldProps, oldState) => {
        console.log("MobileClient id=" + this.props.client.id + " componentDidUpdate");
        if (this.props.client.balance !== this.state.balance) {
            this.setState({balance: this.props.client.balance});
        }
        if (this.props.client.fam !== this.state.fam) {
            this.setState({fam: this.props.client.fam});
        }
        if (this.props.client.im !== this.state.im) {
            this.setState({im: this.props.client.im});
        }
        if (this.props.client.otch !== this.state.otch) {
            this.setState({otch: this.props.client.otch});
        }
    };

    deleteClient = () => {
        clientsEvents.emit(EvDeleteClicked, this.props.client.id);
    }

    editClient = () => {
        clientsEvents.emit(EvEditClicked, this.props.client.id);
    }


    render() {

        console.log("MobileClient id=" + this.props.client.id + " render");

        return (
            <tr className={"rowTable"}>
                <td className={'MobileClient'}>{this.state.fam}</td>
                <td className={'MobileClient'}>{this.state.im}</td>
                <td className={'MobileClient'}>{this.state.otch}</td>
                <td className={'MobileClient'}>{this.state.balance}</td>
                {(this.state.balance >= 0)&&
                    <td className={'MobileClient Active'}>active</td> ||
                    <td className={'MobileClient Blocked'}>blocked</td>
                }
                <td className={''}>
                    <button className={''} onClick={this.editClient}>Редактировать</button>
                </td>
                <td className={''}>
                    <button id={this.props.id} onClick={this.deleteClient}>Удалить</button>
                </td>
            </tr>
        );

    }

}

export default MobileClient;
