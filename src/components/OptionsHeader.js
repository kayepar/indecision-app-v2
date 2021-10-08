import React from 'react';
import OptionsMenu from './OptionsMenu';

const OptionsHeader = ({ hasOptions, optionsDispatch, autoDelete, autoDeleteDispatch }) => {
    return (
        <div className="widget-header">
            <h3 className="widget-header__title">Your Options</h3>
            <OptionsMenu
                hasOptions={hasOptions}
                optionsDispatch={optionsDispatch}
                autoDelete={autoDelete}
                autoDeleteDispatch={autoDeleteDispatch}
            />
        </div>
    );
};

export default OptionsHeader;
