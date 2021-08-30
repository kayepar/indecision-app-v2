import React from 'react';
import { useOptionsContext } from '../context/optionsContext';
import { usePickedOptionContext } from '../context/pickedOptionContext';

const ActionButton = () => {
    const { options } = useOptionsContext();
    const { pickedOptionDispatch } = usePickedOptionContext();

    const handlePickOption = () => {
        const randomNumber = Math.floor(Math.random() * options.length);
        const pickedOption = options[randomNumber];

        pickedOptionDispatch({ type: 'SET_PICKED_OPTION', option: pickedOption });
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
