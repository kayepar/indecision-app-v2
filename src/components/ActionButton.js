import React from 'react';

const ActionButton = ({ optionsLength, updatePickedOption }) => {
    // todo: try to figure out if handlepick can be removed from herea
    const handlePickOption = () => {
        const randomNumber = Math.floor(Math.random() * optionsLength);
        // const pickedOption = options[randomNumber];

        updatePickedOption(randomNumber);
    };

    return (
        <div>
            <button id="big-button" className="big-button" onClick={handlePickOption} disabled={optionsLength < 1}>
                Choose for me
            </button>
        </div>
    );
};

// ActionButton.whyDidYouRender = true;

export default React.memo(ActionButton);
