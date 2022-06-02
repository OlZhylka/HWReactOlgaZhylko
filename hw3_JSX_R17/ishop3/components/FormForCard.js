import React from 'react';
import PropTypes from 'prop-types';
import './FormForCard.css';
import WarningText from "./WarningText";

class FormForCard extends React.Component {

    static propTypes = {
        features: PropTypes.arrayOf(
            PropTypes.string.isRequired,
        ),
        good: PropTypes.shape({
            imgUrl: PropTypes.string,
            code: PropTypes.number,
            ironMaterial: PropTypes.string,
            ironName: PropTypes.string,
            count: PropTypes.number,
        }),
        cbSave: PropTypes.func,
        cbAdd: PropTypes.func,
        cbChangeValue: PropTypes.func,
        cbCancel: PropTypes.func,
        cbDisableBtn: PropTypes.func,
        cbUnDisableBtn: PropTypes.func,
        flagFormForEdit: PropTypes.number,

    }


    constructor(props) {
        super(props);
        this.state = {
            good: this.props.good,
            flagFormForEdit: this.props.flagFormForEdit,
            flagDisabledSave: false,
        };
        this.changeForm = this.changeForm.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.good != this.props.good) {
            this.setState(() => {
                return {
                    good: this.props.good,
                }
            })
        }
    }

    newRefObj = {
        imgUrlRef: null,
        ironNameRef: null,
        ironMaterialRef: null,
        countRef: null,
    };
    setRef = (ref) => {
        if (ref) {
            let nameRef = ref.name + "Ref";
            this.newRefObj[nameRef] = ref;
        }
    };

    getNewValuesForGood = () => {
        let imgUrlValue = this.newRefObj.imgUrlRef.value;
        let ironNameValue = this.newRefObj.ironNameRef.value;
        let ironMaterialValue = this.newRefObj.ironMaterialRef.value;
        let countValue = this.newRefObj.countRef.value;
        return {
            imgUrl: imgUrlValue,
            code: this.state.good.code,
            ironMaterial: ironMaterialValue,
            ironName: ironNameValue,
            count: +countValue,
        };
    }
    addToList = (ev) => {
        this.props.cbAdd(this.getNewValuesForGood());
        this.props.cbUnDisableBtn();
    }

    saveChanges = () => {
        this.props.cbSave(this.getNewValuesForGood());
        this.props.cbUnDisableBtn();
    }


    changeForm = (ev) => {
        ev.preventDefault()
        const target = ev.target;
        const value = target.value;
        const name = target.name;
        this.setState(prevState => ({
            good: {                   // object that we want to update
                ...prevState.good,    // keep all other key-value pairs
                [name]: value       // update the value of specific key
            }
        }))
        this.props.cbDisableBtn();

    }
    cancelFormChanges = (ev) => {
        ev.stopPropagation();
        this.props.cbCancel();
        this.props.cbUnDisableBtn();
    }

    countForWarnings = 0;  // счетчик, чтобы контролить, сколько инпутов не заполнено
                            // и не раздизейбливать кн save || add раньше времени

    disabledSave = () => {
        this.countForWarnings++;
        this.setState({
            flagDisabledSave: true,
        })
    }

    unDisabledSave = () => {
        this.countForWarnings--;
        if (!this.countForWarnings) {
            this.setState({
                flagDisabledSave: false,
            })
        }
    }

    render() {
        let formForCard = [];
        for (let a = 0; a < this.props.features.length; a++) {
            let formRow = <label htmlFor={a + "lbl"} key={a + "lbl"}>{this.props.features[a]}: </label>;
            formForCard.push(formRow);
        }
        return (
            <div className={"FormForCard"}>
                <h4>Код товара: {this.state.good.code}</h4>
                <form>
                    {formForCard[0]}<input id={0 + "lbl"} name={"imgUrl"} type={"text"}
                                           value={this.state.good ? this.state.good.imgUrl : ""}
                                           ref={this.setRef}
                                           onChange={this.changeForm}/>
                    <div className={"warning"}>
                        {!this.state.good.imgUrl && <WarningText
                            text={"Please, fill the field."}
                            cbDisabledSave={this.disabledSave}
                            cbUnDisabledSave={this.unDisabledSave}
                        />}
                    </div>
                    {formForCard[1]}<input id={1 + "lbl"} name={"ironName"} type={"text"}
                                           value={this.state.good ? this.state.good.ironName : ""}
                                           ref={this.setRef}
                                           onChange={this.changeForm}/>
                    <div className={"warning"}>
                        {!this.state.good.ironName && <WarningText
                            text={"Please, fill the field."}
                            cbDisabledSave={this.disabledSave}
                            cbUnDisabledSave={this.unDisabledSave}
                        />}
                    </div>
                    {formForCard[2]}<input id={2 + "lbl"} name={"ironMaterial"} type={"text"}
                                           value={this.state.good ? this.state.good.ironMaterial : ""}
                                           ref={this.setRef}
                                           onChange={this.changeForm}/>
                    <div className={"warning"}>
                        {!this.state.good.ironMaterial && <WarningText
                            text={"Please, fill the field."}
                            cbDisabledSave={this.disabledSave}
                            cbUnDisabledSave={this.unDisabledSave}
                        />}
                    </div>
                    {formForCard[3]}<input id={3 + "lbl"} name={"count"} type={"text"}
                                           value={this.state.good ? this.state.good.count : ""}
                                           ref={this.setRef}
                                           onChange={this.changeForm}/>
                    <div className={"warning"}>
                        {!this.state.good.count && <WarningText
                            text={"Please, fill the field."}
                            cbDisabledSave={this.disabledSave}
                            cbUnDisabledSave={this.unDisabledSave}
                        />}
                        {!Number.isInteger(+this.state.good.count) && <WarningText
                            text={" Value must be a number."}
                            cbDisabledSave={this.disabledSave}
                            cbUnDisabledSave={this.unDisabledSave}
                        />}
                    </div>

                </form>
                {(this.state.flagFormForEdit &&
                <button id={this.props.code + "product"} onClick={this.saveChanges}
                        disabled={this.state.flagDisabledSave}>Save</button>) ||
                <button id={this.props.code + "newProduct"} onClick={this.addToList}
                        disabled={this.state.flagDisabledSave}>Add</button>}

                <button id={this.props.code + "cancelForm"} onClick={this.cancelFormChanges}>Cancel</button>
            </div>
        );
    }
}

export default FormForCard;
