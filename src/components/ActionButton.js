import React from 'react';
import { useOptions } from '../context/optionsContext';
import { usePickedOption } from '../context/pickedOptionContext';

const ActionButton = () => {
    const { options } = useOptions();
    const { pickedOptionDispatch } = usePickedOption();

    const handlePickOption = () => {
        const randomNumber = Math.floor(Math.random() * options.length);
        const pickedOption = options[randomNumber];

        pickedOptionDispatch({ type: 'SET_PICKED_OPTION', option: pickedOption });
    };

    return (
        <>
            <button id="big-button" className="big-button" onClick={handlePickOption} disabled={options.length < 1}>
                Choose for me
            </button>
        </>
    );
};

export default ActionButton;
