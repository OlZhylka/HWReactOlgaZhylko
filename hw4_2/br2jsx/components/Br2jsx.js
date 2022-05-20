import React from 'react';
import PropTypes from 'prop-types';

require('./Br2jsx.css');

class Br2jsx extends React.Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
    };

    state = {
        text: this.props.text,
    }

    componentWillMount() {
        console.log(111, this.state.text);
        let a = /<[^<>]+>/g;
        this.setState({
            text: this.state.text.split(a)
            // text: this.state.text.split(a).join("<br>") //?????????

        });
    }

    render() {
        // console.log(122, this.state.text);
        // Сейчас в return массив из слов, нет тегов.
        // Непонятно к чему тут стремиться: к строке с тегами? К массиву с тегами
        //  Может, вообще всё не в ту сторону?

        return (<div className={"main"}>
                {this.state.text}
            </div>
        )

        // return (<div
//         dangerouslySetInnerHTML = {{
//             __html: this.state.text.join("<br>")
//         }}/>);
    }
}

export default Br2jsx;

