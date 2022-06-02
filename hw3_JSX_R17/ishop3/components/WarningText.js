import React,  { useEffect } from 'react';
import PropTypes from 'prop-types';
import './WarningText.css';

function WarningText(props) {
    // const [text, cbDisabledSave] = useState(props); //мне тут не надо
    useEffect(() => {
        props.cbDisabledSave();
        return () => {
            props.cbUnDisabledSave(); //your cleanup code codes here
        };
    }, []);

    return (<span className={"warning"}>{props.text}</span>);
}

WarningText.propTypes = {
    text: PropTypes.string.isRequired,
};

export default WarningText;

