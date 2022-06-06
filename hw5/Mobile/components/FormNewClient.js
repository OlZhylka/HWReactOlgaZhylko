import React from 'react';
import PropTypes from 'prop-types';
import {clientsEvents,EvSaveClicked,EvAddClicked,EvCancelClicked} from "./events";
import './FormNewClient.css';

class FormNewClient extends React.Component {

    static propTypes = {
        features: PropTypes.arrayOf(
            PropTypes.string.isRequired,
        ),
        client: PropTypes.shape({
            id: PropTypes.number.isRequired,
            fam: PropTypes.string.isRequired,
            im: PropTypes.string.isRequired,
            otch: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired,
        }),
        flagFormForEdit: PropTypes.number,
    }


    constructor(props) {
        super(props);
        this.state = {
            client: this.props.client,
            flagFormForEdit: this.props.flagFormForEdit,
            flagDisabledSave: false,
        };
        // this.changeForm = this.changeForm.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.FIO != this.props.FIO) {
            this.setState(() => {
                return {
                    FIO: this.props.FIO,
                }
            })
        }
    }

    newRefObj = {
        famRef: null,
        imRef: null,
        otchRef: null,
        balanceRef:null
    };
    setRef = (ref) => {
        if (ref) {
            let nameRef = ref.name + "Ref";
            this.newRefObj[nameRef] = ref;
        }
    };

    getNewValuesForGood = () => {
        let famValue = this.newRefObj.famRef.value;
        let imValue = this.newRefObj.imRef.value;
        let otchValue = this.newRefObj.otchRef.value;
        let balanceValue = this.newRefObj.balanceRef.value;
        return {
            id: this.state.client.id,
            fam: famValue,
            im: imValue,
            otch: otchValue,
            balance: +balanceValue,
        };
    }
    addToList = () => {
      clientsEvents.emit(EvAddClicked,this.getNewValuesForGood());
    }

    saveChanges = () => {
        clientsEvents.emit(EvSaveClicked,this.getNewValuesForGood());
    }


    cancelFormChanges = (ev) => {
        ev.stopPropagation();
        clientsEvents.emit(EvCancelClicked);
    }

    render() {
        console.log("FormNewClient id=" + this.props.client.id + " render");

        let formForCard = [];
        for (let a = 0; a < this.props.features.length; a++) {
            let formRow = <label htmlFor={a + "lbl"} key={a + "lbl"}>{this.props.features[a]}: </label>;
            formForCard.push(formRow);
        }
        return (
            <div className={"FormForCard"}>
                <h4>Клиент: {this.state.client.id}</h4>
                <form>
                    {formForCard[0]}<input id={0 + "lbl"} name={"fam"} type={"text"}
                                           defaultValue={this.state.client.fam ? this.state.client.fam : ""}
                                           ref={this.setRef}
                    />
                    {formForCard[1]}<input id={1 + "lbl"} name={"im"} type={"text"}
                                           defaultValue={this.state.client.im ? this.state.client.im : ""}
                                           ref={this.setRef}
                                           />
                    {formForCard[2]}<input id={2 + "lbl"} name={"otch"} type={"text"}
                                           defaultValue={this.state.client.otch ? this.state.client.otch : ""}
                                           ref={this.setRef}
                                          />
                    {formForCard[3]}<input id={3 + "lbl"} name={"balance"} type={"text"}
                                           defaultValue={this.state.client.balance ? this.state.client.balance : ""}
                                           ref={this.setRef}
                                           />

                </form>
                {(this.state.flagFormForEdit &&
                    <button id={this.props.client.id + "client"} onClick={this.saveChanges}>Save</button>) ||
                <button id={this.props.client.id + "newClient"} onClick={this.addToList}>Add</button>}
                <button id={this.props.client.id + "cancelForm"} onClick={this.cancelFormChanges}>Cancel</button>
            </div>
        );
    }
}

export default FormNewClient;
