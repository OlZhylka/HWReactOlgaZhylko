import React from 'react';
import PropTypes from 'prop-types';

import './GoodsBlock.css';

import GoodOne from './GoodOne';

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
                ironMateria:PropTypes.string.isRequired,
                ironName: PropTypes.string.isRequired,
                count: PropTypes.number.isRequired,
            })
        )
    };

    state = {
        selectedNowCode: null,
        goods: this.props.goods,
    }
    
    deleteGood = (code) => {
        this.setState({
            selectedNowCode: code,
        });
        this.setState((state) => {
            return {
                goods: state.goods.filter(good => good.code !== +code)
            }
        });
    }
    selectGood = (code) => {
        // console.log('выбрана строчка товара с кодом ' + code);
     this.setState({selectedNowCode: code});
    }

    render() {
        
        let featuresForGoods = [];

        for (let a = 0; a < this.props.features.length; a++) {
            let feature = this.props.features[a];
            // let featureName = React.DOM.td({key: a, className: 'Feaucher'}, feature,); //без key React ругается,
        let featureName = <td key={a} className={'Feaucher'}>{feature}</td>;
            featuresForGoods.push(featureName);
        }
        
        let goodsList = this.state.goods.map(v =>
            <GoodOne 
                key={v.code}
                imgUrl={v.imgUrl}
                code={v.code}
                ironName={v.ironName}
                ironMateria={ v.ironMateria}
                count={v.count}
                cbDeleteGood={this.deleteGood}
                cbSelectGood= {this.selectGood}
                goodSelected= {this.state.goodSelected}
                isSelected= {this.state.selectedNowCode == v.code} //???? возможно косяк
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
                </div>
                )
                ;
    }
}


export default GoodsBlock;