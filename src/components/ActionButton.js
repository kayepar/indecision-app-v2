import React, { memo } from 'react';

const ActionButton = ({ disabled, handlePickOption }) => {
    return (
        <div>
            <button id="big-button" className="big-button" onClick={handlePickOption} disabled={disabled}>
                Choose for me
            </button>
        </div>
    );
};

// ActionButton.whyDidYouRender = true;

export default memo(ActionButton);
