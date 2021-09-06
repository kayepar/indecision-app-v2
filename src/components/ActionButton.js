import React from 'react';
import { useOptionsContext } from '../context/optionsContext';

const ActionButton = (props) => {
    const { options } = useOptionsContext();

    console.log(options);

    const handlePickOption = () => {
        const randomNumber = Math.floor(Math.random() * options.length);
        const pickedOption = options[randomNumber];

        props.updatePickedOption(pickedOption);
    };

    return (
        <div>
            <button id="big-button" className="big-button" onClick={handlePickOption} disabled={options.length < 1}>
                Choose for me
            </button>
        </div>
    );
};

export default ActionButton;
