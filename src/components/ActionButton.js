import React from 'react';

const ActionButton = ({ options, updatePickedOption }) => {
    const handlePickOption = () => {
        const randomNumber = Math.floor(Math.random() * options.length);
        const pickedOption = options[randomNumber];

        updatePickedOption(pickedOption);
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
