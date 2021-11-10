import React from 'react';

const OptionsHeader = ({ children }) => {
    return (
        <div className="widget-header">
            <h3 className="widget-header__title">Your Options</h3>
            {children}
        </div>
    );
};

export default OptionsHeader;
