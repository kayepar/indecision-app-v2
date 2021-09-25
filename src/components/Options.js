import React from 'react';
import useAutoScroll from '../hooks/useAutoScroll';
import Option from './Option';
import OptionsMenu from './OptionsMenu';

const Options = ({ options, optionsDispatch, autoDelete, autoDeleteDispatch }) => {
    const optionsContainerRef = useAutoScroll(options.length);

    return (
        <div className="widget">
            <div className="widget-header">
                <h3 className="widget-header__title">Your Options</h3>
                <OptionsMenu
                    options={options}
                    optionsDispatch={optionsDispatch}
                    autoDelete={autoDelete}
                    autoDeleteDispatch={autoDeleteDispatch}
                />
            </div>
            <div className="widget-content" ref={optionsContainerRef} data-testid="options-container">
                {options.length === 0 && <p className="widget__message">Please add an option to get started</p>}
                {options.map((option, index) => (
                    <Option
                        optionsDispatch={optionsDispatch}
                        data-testid="option-item"
                        key={option}
                        text={option}
                        index={index + 1}
                    />
                ))}
            </div>
        </div>
    );
};

export default React.memo(Options);
