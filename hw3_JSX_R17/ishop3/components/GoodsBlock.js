import React from 'react';
import PropTypes from 'prop-types';

import './GoodsBlock.css';

import GoodOne from './GoodOne';
import CardForGood from './CardForGood';
import FormForCard from "./FormForCard";

class GoodsBlock extends React.Component {

    static propTypes = {
        shopName: PropTypes.string.isRequired,
        features: PropTypes.arrayOf(
            PropTypes.string.isRequired,
        ),
        goods: PropTypes.arrayOf(
            PropTypes.shape({
                imgUrl: PropTypes.string.isRequired,
                code: PropTypes.number.isRequired,
                ironMaterial: PropTypes.string.isRequired,
                ironName: PropTypes.string.isRequired,
                count: PropTypes.number.isRequired,
            })
        )
    };

    state = {
        selectedNowCode: null,
        editedNowCode: null,
        goods: this.props.goods,
        good: null,
        clickedNewProduct: null,
        flagOpenCard: 0,
        flagOpenForm: 0,
        flagFormForEdit: 0,
        flagDisabledForEdit: false,
        flagDisabledForNewAndDelete: false,
    }

    deleteGood = (code) => {
        this.setState({
            selectedNowCode: code,
        });
        (confirm("Вы точно хотите удалить товар?") && this.setState((state) => {
            return {
                goods: state.goods.filter(good => good.code !== +code)
            }
        })) || this.setState({
            selectedNowCode: null,
        });
    }

    editGood = (code) => {
        let editedGood = null;
        this.state.goods.forEach(v => {
            if (v.code == code) {
                editedGood = v;
            }
        });

        this.setState({
            selectedNowCode: code,
            editedNowCode: +code,
            flagFormForEdit: 1,
            flagOpenCard: 0,
            flagOpenForm: 1,
            flagDisabledForNewAndDelete: true,
        });
        this.setState((state) => {
            return {
                good: editedGood,
            }
        });
    }

    // выбираем товар и открываем карточку товара
    selectGood = (code) => {
        if (!this.state.flagDisabledForEdit) {
            this.setState({
                selectedNowCode: code,
                flagOpenCard: 1,
                flagOpenForm: 0,
            });
            this.cancelChanges(); //обнуляемся
            this.findSelectedGood(code);
        }
    }

    findSelectedGood = (code) => {
        this.state.goods.map((g) => {
            if (g.code === code) {
                this.setState({
                    good: g
                });
            }
        })
    }
    addNewGood = () => {
        let nextCode = 0;
        this.state.goods.forEach(v => {
            if (v.code > nextCode) {
                nextCode = v.code;
            }
        });

        this.setState({
            clickedNewProduct: 1,
            flagFormForEdit: 0,
            flagOpenCard: 0,
            flagOpenForm: 1,
            good: {
                code: ++nextCode,
                imgUrl: '',
                ironMaterial: '',
                ironName: '',
                count: 0, // с null красная ошибка, с пустой строкой надо отменять типизацию count: PropTypes.number?
                            //решила, пусть будет 0
            },
            selectedNowCode: null,
        });
        this.disabledBtn();
    }
    saveGoodChanges = (goodValues) => {
        let updatedGoods = [];
        this.state.goods.forEach((el, key) => {
            if (el.code == goodValues.code) {

                updatedGoods[key] = goodValues;
            } else {
                updatedGoods[key] = el;
            }
        })
        this.setState({
            goods: updatedGoods,
            editedNowCode: null,
            flagOpenForm: 0,
            flag: 0,
            flagFormForEdit: 0,
        });

    }
    cancelChanges = () => {
        this.setState({
            editedNowCode: null,
            clickedNewProduct: null,
            good: null,
            flagDisabledForEdit: false
        })
    }
    addGoodToList = (goodValues) => {
        let a = [...this.state.goods];
        let newIron = [];
        newIron[0] = goodValues;
        a = a.concat(newIron);
        this.setState({
            goods: a,
            flagOpenForm: 0,
            flagForm: 0,
        })
    }

    unDisabledBtn = () => {
        this.setState(() => ({
                flagDisabledForEdit: false,
                flagDisabledForNewAndDelete: false,
            })
        )
    }

    disabledBtn = () => {
        this.setState(() => ({
                flagDisabledForEdit: true,
                flagDisabledForNewAndDelete: true,
            })
        )
    }

    render() {
        let featuresForGoods = [];

        for (let a = 0; a < this.props.features.length; a++) {
            let feature = this.props.features[a];
            let featureName = <td key={a} className={'feature'}>{feature}</td>;
            featuresForGoods.push(featureName);
        }

        let goodsList = this.state.goods.map(v =>
            <GoodOne
                key={v.code}
                imgUrl={v.imgUrl}
                code={v.code}
                ironName={v.ironName}
                ironMaterial={v.ironMaterial}
                count={v.count}
                cbDeleteGood={this.deleteGood}
                cbEditGood={this.editGood}
                cbCancelForm={this.cancelFormChanges}
                cbSelectGood={this.selectGood}
                goodSelected={this.state.goodSelected}
                flagDisabledForEdit={this.state.flagDisabledForEdit}
                flagDisabledForNewAndDelete={this.state.flagDisabledForNewAndDelete}
                isSelected={this.state.selectedNowCode == v.code}
            />
        );
        return (<div className={'GoodsBlock'}>
                <h1 className={'ShopName'}> {this.props.shopName}</h1>
                <table className={'TableGoods'}>
                    <thead>
                    <tr key={'titlesOfFeatures'} className={'TableHeader'}>
                        {featuresForGoods}
                    </tr>
                    </thead>
                    <tbody>
                    {goodsList}
                    </tbody>
                </table>
                <button className={'New'} onClick={this.addNewGood}
                        disabled={this.state.flagDisabledForNewAndDelete}>New Product
                </button>
                {this.state.flagOpenCard == 1 &&
                <CardForGood
                    key={this.state.selectedNowCode}
                    code={this.state.selectedNowCode}
                    good={this.state.good}
                    goods={this.props.goods}
                />
                }
                {this.state.flagOpenForm == 1 && (this.state.clickedNewProduct || this.state.editedNowCode) &&
                <FormForCard
                    features={this.props.features}
                    good={this.state.good}
                    cbAdd={this.addGoodToList}
                    cbSave={this.saveGoodChanges}
                    cbCancel={this.cancelChanges}
                    cbDisableBtn={this.disabledBtn}
                    cbUnDisableBtn={this.unDisabledBtn}
                    flagFormForEdit={this.state.flagFormForEdit}
                />
                }

            </div>
        );
    }
}

export default GoodsBlock;