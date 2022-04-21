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

    render: function () {

        let featuresForGoods = [];
        for (let a = 0; a < this.props.features.length; a++) {
            let feature = this.props.features[a];
            let featureName = React.DOM.td({key: a,className: 'Feaucher'}, feature,); //без key React ругается,
            //  обсуждали, что переменная цикла - не лучший вариант, но в данном случае может быть этого достаточно?
            featuresForGoods.push(featureName);
        }

        let goodsList = this.props.goods.map(v =>
            React.DOM.tr({key: v.code,},
                React.DOM.td({className: 'Icon'},
                    React.DOM.img({className: 'ImageGood', src: v.imgUrl,})
                ),
                React.DOM.td({className: 'Feature'}, v.ironName),
                React.DOM.td({className: 'Feature'}, v.ironMateria),
                React.DOM.td({className: 'Feature'}, v.count),
            )
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