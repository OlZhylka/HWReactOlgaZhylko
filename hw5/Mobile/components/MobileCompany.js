import React from 'react';
import PropTypes from 'prop-types';
import {
    clientsEvents,
    EvDeleteClicked,
    EvEditClicked,
    EvSaveClicked,
    EvAddClicked,
    EvCancelClicked
} from "./events";
import MobileClient from './MobileClient';
import FormNewClient from "./FormNewClient";

import './MobileCompany.css';

class MobileCompany extends React.PureComponent {

    static propTypes = {
        name: PropTypes.string.isRequired,
        features: PropTypes.arrayOf(
            PropTypes.string.isRequired,
        ),
        clients: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                fam: PropTypes.string.isRequired,
                im: PropTypes.string.isRequired,
                otch: PropTypes.string.isRequired,
                balance: PropTypes.number.isRequired,
            })
        ),
    };

    state = {
        name: this.props.name,
        allClients: this.props.clients, // мини-хранилище
        clients: this.props.clients,
        selectedNowID: null,
        client: null,
        clickedNewClient: null,
        editedNowID: null,
        flagOpenForm: 0,
        flagFormForEdit: 0,
    };

    setName1 = () => {
        this.setState({name: 'МТС'});
    };

    setName2 = () => {
        this.setState({name: 'Velcom'});
    };
///ПОдумать, видимо нужен редакс
    showActive = () => {
        this.flagBlocked=0
        this.flagActive=1
        this.filterClients();
        // this.setState({name: 'Velcom'});
    };

    showBlocked = () => {
        this.flagActive=0
        this.flagBlocked=1
        this.filterClients();
    };

    showAll = () => {
        this.flagActive=0
        this.flagBlocked=0
        this.filterClients();
    };



    // setBalance = (clientId, newBalance) => {
    //     let changed = false;
    //     let newClients = [...this.state.clients]; // копия самого массива клиентов
    //     newClients.forEach((c, i) => {
    //         if (c.id == clientId && c.balance != newBalance) {
    //             let newClient = {...c}; // копия хэша изменившегося клиента
    //             newClient.balance = newBalance;
    //             newClients[i] = newClient;
    //             changed = true;
    //         }
    //     });
    //     if (changed)
    //         this.setState({clients: newClients});
    // };

    // setBalance1 = () => {
    //     this.setBalance(105, 230);
    // };
    //
    // setBalance2 = () => {
    //     this.setBalance(105, 250);
    // };

    componentDidMount = () => {
        clientsEvents.addListener(EvDeleteClicked, this.deleteClient);
        clientsEvents.addListener(EvEditClicked, this.editClient);
        clientsEvents.addListener(EvAddClicked, this.addClient);
        clientsEvents.addListener(EvCancelClicked, this.cancel);
        clientsEvents.addListener(EvSaveClicked, this.save);
    };
    // И не забыть отписаться от событий пр уничтожении компанента!!!!
    componentWillUnmount = () => {
        clientsEvents.removeListener(EvDeleteClicked, this.deleteClient);
        clientsEvents.removeListener(EvEditClicked, this.editClient);
        clientsEvents.removeListener(EvAddClicked, this.addClient);
        clientsEvents.removeListener(EvCancelClicked, this.cancel);
        clientsEvents.removeListener(EvSaveClicked, this.save);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.allClients !== this.state.allClients) {
            this.filterClients();
        }
    }

    flagActive = 0; // как свойство, не state
    flagBlocked = 0; // как свойство, не state
    filterClients = () => {
        if(this.flagActive) {
            this.setState(() => {
                return {
                    clients: this.state.allClients.filter((v) => (v.balance >= 0))
                }
            })
        } else if(this.flagBlocked) {
            this.setState(() => {
                return {
                    clients: this.state.allClients.filter((v) => (v.balance < 0))
                }
            })
        } else {
            this.setState(() => {
                return {
                    clients: this.state.allClients
                }
            })
        }
    }


    deleteClient = (id) => {
        this.setState({
            allClients: this.state.allClients.filter(c => c.id != id),
        });
    }

    editClient = (id) => {
        let editedClient = null;
        this.state.allClients.forEach(v => {
            if (v.id == id) {
                editedClient = v;
            }
        });

        this.setState({
            selectedNowID: id,
            editedNowID: +id,
            flagFormForEdit: 1,
            flagOpenForm: 1,
        });

        this.setState((state) => {
            return {
                client: editedClient,
            }
        });
    }
    addNewClient =()=>{
        let nextID = 0;
        this.state.allClients.forEach(v => {
            if (v.id > nextID) {
                nextID = v.id;
            }
        });
        this.setState({
            clickedNewClient: 1,
            flagFormForEdit: 0,
            flagOpenForm: 1,
            client: {
                id: ++nextID,
                fam: "",
                im: "",
                otch: "",
                balance: 0, // с null красная ошибка, с пустой строкой надо отменять типизацию count: PropTypes.number?
                //решила, пусть будет 0
            },
            selectedNowID: null,
        });
    }
    cancel = () => {
        this.setState({
            editedNowID: null,
            clickedNewClient: null,
            client: null,
            flagOpenForm: 0,
            flagFormForEdit: 0,
        })
    }
    save = (clientValues) => {
        let updatedClients = [];
        this.state.allClients.forEach((el, key) => {
            if (el.id == clientValues.id) {
                updatedClients[key] = clientValues;
            } else {
                updatedClients[key] = el;
            }
        })
        this.setState({
            allClients: updatedClients,
            editedNowCode: null,
            flagOpenForm: 0,
            flagFormForEdit: 0,
        });
    }
    addClient = (clientValues)=>{
            let a = [...this.state.allClients,clientValues];
            this.setState({
                allClients: a,
                flagOpenForm: 0,
            })
    }


    render() {

        console.log("MobileCompany render");
        let featuresClients = [];
        for (let a = 0; a < this.props.features.length; a++) {
            let feature = this.props.features[a];
            let featureName = <td key={a}>{feature}</td>;
            featuresClients.push(featureName);
        }

        var clientsCode = this.state.clients.map(client => {
                return <MobileClient key={client.id} client={client}/>;
            }
        );


        return (
            <div className='MobileCompany'>
                <button className={''} onClick={this.setName1}>МТС</button>
                <button className={''} onClick={this.setName2}>Velcom</button>
                <div className='MobileCompanyName'>Компания &laquo;{this.state.name}&raquo;</div>
                <div>
                    <button className={''} onClick={this.showAll}>Все</button>
                    <button className={''} onClick={this.showActive}>Активные</button>
                    <button className={''} onClick={this.showBlocked}>Заблокированные</button>
                </div>

                <table className={'Table'}>
                    <thead>
                    <tr key={'titlesOfFeatures'} className={'Feature'}>
                        {featuresClients}
                    </tr>
                    </thead>
                    <tbody>
                    {clientsCode}
                    </tbody>
                </table>
                <button className={''} onClick={this.addNewClient}>Добавить клиета</button>

                {this.state.flagOpenForm == 1 && (this.state.clickedNewClient || this.state.editedNowID) &&
                <FormNewClient
                    features={this.props.features}
                    client={this.state.client}
                    flagFormForEdit={this.state.flagFormForEdit}
                />
                }

            </div>
        )
            ;

    }

}

export default MobileCompany;
