var FilterBlock = React.createClass({
    displayName: 'FilterBlock',
    propTypes: {
        words: React.PropTypes.arrayOf(
            React.PropTypes.string.isRequired,
        ),
        freetext: React.PropTypes.string,
        radioChecked: React.PropTypes.bool,
    },
    getInitialState: function () {
        return {
            freetext: '',
            words: this.props.words,
            radioChecked: false,
        };
    },

    filters: function () {
        this.setState((state, props) => {
            // console.log(state)
            // вводим переменную чтобы не повторяться
            let wordsFiltered = props.words.filter(arr => arr.includes(state.freetext));
            return {words: state.radioChecked ? wordsFiltered.slice().sort() : wordsFiltered}
        })
        //slice -- чтобы не менять существующий массив пропсов
    },

    radioChanged: function () {
        // нужно получить radioChecked до изменения state
        this.setState((state) => {
            return {radioChecked: !state.radioChecked} //наверно в синтаксисе здесь излишен return?!
            //  (по лекции альтернативный и более надёжный вариант использовать вместо !state вариант c eo.target.checked)
        }),
            this.filters()
    },

    freeTextChanged: function (event) {
        event.persist();
        // нужно получить значение freetext  до изменения state
        this.setState(() => {
            return {freetext: event.target.value}
        }),
            this.filters()
    },

    reset: function () {
        this.setState(() => {
            // сбрасываем все значения
            return this.getInitialState()
        })
    },

    render: function () {
        let wordsCode = [];
        for (let a = 0; a < this.props.words.length; a++) {
            let word = this.state.words[a];
            let selectList = React.DOM.option({key: a,}, word); //без key React ругается,
            wordsCode.push(selectList);
        }

        return React.DOM.div({className: 'FilterBlock'},
            React.DOM.div({className: 'ManageBlock'},
                // атрибут checked нужен для сброса поля
                React.DOM.input({
                    type: "checkbox", checked: this.state.radioChecked,
                    onClick: this.radioChanged
                }),
                // атрибут value нужен для сброса поля
                React.DOM.input({
                    type: "text",
                    // defaultValue: this.state.freetext,  //это излишнее, React требует что-то одно, дефолт или value
                    value: this.state.freetext,
                    onChange: this.freeTextChanged
                },),
                React.DOM.button({className: "Reset", onClick: this.reset}, "Сброс"),
            ),
            React.DOM.select({className: "Words", name: "unittype", size: 5}, wordsCode),
        )

    },

});