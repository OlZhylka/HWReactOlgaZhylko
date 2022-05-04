const GoodsBlock = React.createClass({
    displayName: 'GoodsBlock',
    propTypes: {
        shopName: React.PropTypes.string.isRequired,
        features: React.PropTypes.arrayOf(
            React.PropTypes.string.isRequired,
        ),
        goods: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                imgUrl: React.PropTypes.string.isRequired,
                code: React.PropTypes.number.isRequired,
                ironMateria: React.PropTypes.string.isRequired,
                ironName: React.PropTypes.string.isRequired,
                count: React.PropTypes.number.isRequired,
            })
        )
    },
    getInitialState: function () {
        return {
            selectedNowCode: null,
            goods: this.props.goods,
        };
    },
    deleteGood: function (code) {
        this.setState({
            selectedNowCode: code,
        });
        this.setState((state) => {
            return {
                goods: state.goods.filter(good => good.code !== +code)
            }
        })
    },
    selectGood: function (code) {
        // console.log('выбрана строчка товара с кодом ' + code);
        this.setState({
            selectedNowCode: code,
        });
    },
    render: function () {
        let featuresForGoods = [];
        for (let a = 0; a < this.props.features.length; a++) {
            let feature = this.props.features[a];
            let featureName = React.DOM.td({key: a, className: 'Feaucher'}, feature,); //без key React ругается,
            featuresForGoods.push(featureName);
        }
        let goodsList = this.state.goods.map(v =>
            React.createElement(GoodOne, {
                key: v.code,
                imgUrl: v.imgUrl,
                code: v.code,
                ironName: v.ironName,
                ironMateria: v.ironMateria,
                count: v.count,
                cbDeleteGood: this.deleteGood,
                cbSelectGood: this.selectGood,
                goodSelected: this.state.goodSelected,
                isSelected: (this.state.selectedNowCode == v.code),
            })
        );
        return React.DOM.div({className: 'GoodsBlock'},
            React.DOM.h1({className: 'ShopName'}, this.props.shopName),
            React.DOM.table({className: 'TableGoods'},
                React.DOM.thead({},
                    React.DOM.tr({key: 'titlesOfFeatures', className: 'TableHeader'},
                        featuresForGoods,
                    ),
                ),
                React.DOM.tbody({},
                    goodsList,
                ),
            ),
        )
    },

});