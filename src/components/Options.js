import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import useAutoScroll from '../hooks/useAutoScroll';
import Option from './Option';

const Options = ({ options, optionsDispatch }) => {
    const optionsContainerRef = useAutoScroll(options.length);

    return (
        <div className="widget">
            <div className="widget-content" ref={optionsContainerRef} data-testid="options-container">
                {options.length === 0 && <p className="widget__message">Please add an option to get started</p>}
                {options.map((option, index) => (
                    <Option
                        optionsDispatch={optionsDispatch}
                        data-testid="option-item"
                        key={uuidv4()}
                        text={option}
                        index={index + 1}
                    />
                ))}
            </div>
        </div>
    );
};

export default React.memo(Options);
