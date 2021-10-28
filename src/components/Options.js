import React, { memo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Option from './Option';

const Options = ({ options, optionsDispatch }) => {
    return (
        <div className="widget">
            <div className="widget-content" data-testid="options-container">
                {options.length === 0 && <p className="widget__message">Please add an option to get started</p>}
                {options.map((option) => (
                    <Option optionsDispatch={optionsDispatch} data-testid="option-item" key={uuidv4()} text={option} />
                ))}
            </div>
        </div>
    );
};

export default memo(Options);
