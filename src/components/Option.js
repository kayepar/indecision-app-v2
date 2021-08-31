import React from 'react';
import { useOptionsContext } from '../context/optionsContext';

const Option = (props) => {
    const { optionsDispatch } = useOptionsContext();

    const handleDeleteOption = (option) => {
        optionsDispatch({ type: 'DELETE_OPTION', option });
    };

    return (
        <div className="option">
            <p className="option__text">
                {props.index}. {props.text}
            </p>
            <button className="button button--link" onClick={() => handleDeleteOption(props.text)}>
                x
            </button>
        </div>
    );
};

export default Option;
