const GoodOne = React.createClass({
    displayName: 'GoodOne',
    propTypes: {
        imgUrl: React.PropTypes.string.isRequired,
        code: React.PropTypes.number.isRequired,
        ironMateria: React.PropTypes.string.isRequired,
        ironName: React.PropTypes.string.isRequired,
        count: React.PropTypes.number.isRequired,
        cbDeleteGood: React.PropTypes.func.isRequired,
        cbSelectGood: React.PropTypes.func.isRequired,
        isSelected: React.PropTypes.bool.isRequired,
    },
    deleteGood: function (ev) {
        this.props.cbDeleteGood(ev.target.id);
    },
    selectGood: function (ev) {
        if (ev.target.className != "Delete") {
            console.log(66);
            this.props.cbSelectGood(this.props.code);
        }
    },
    render: function () {
        return React.DOM.tr({
                onClick: this.selectGood,
                className: (this.props.isSelected) ? "selectedGood" : "",
            },
            React.DOM.td({className: 'Icon'},
                React.DOM.img({className: 'ImageGood', src: this.props.imgUrl,})
            ),
            React.DOM.td({className: 'Feature'}, this.props.ironName),
            React.DOM.td({className: 'Feature'}, this.props.ironMateria),
            React.DOM.td({className: 'Feature'}, this.props.count),
            React.DOM.td({className: 'Feature'},
                React.DOM.button({className: "Delete", id: this.props.code, onClick: this.deleteGood}, "Delete")
            ),
        )
    },

});