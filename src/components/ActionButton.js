import React, { useContext } from 'react';
import OptionsContext from '../context/optionsContext';
import PickedOptionContext from '../context/pickedOptionContext';

const ActionButton = () => {
    const { options } = useContext(OptionsContext);
    const { pickedOptionDispatch } = useContext(PickedOptionContext);

    const handlePickOption = () => {
        const randomNumber = Math.floor(Math.random() * options.length);
        const pickedOption = options[randomNumber];

        pickedOptionDispatch({ type: 'SET_PICKED_OPTION', option: pickedOption });
    };

    return (
        <>
            <button id="big-button" className="big-button" onClick={handlePickOption}>
                Choose for me
            </button>
        </>
    );
};

export default ActionButton;
