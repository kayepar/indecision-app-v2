import React, { useEffect } from 'react';
import { useOptionsContext } from '../context/optionsContext';
import useLocalStorage from '../hooks/useLocalStorage';
import useAutoScroll from '../hooks/useAutoScroll';
import Option from './Option';
import OptionsMenu from './OptionsMenu';

const Options = () => {
    const { options, optionsDispatch } = useOptionsContext();
    const [optionsFromStorage, saveOptionsToStorage] = useLocalStorage('options', []);
    const optionsContainer = useAutoScroll(options.length);

    // load options
    useEffect(() => {
        console.log('load options from storage');

        if (optionsFromStorage) {
            optionsDispatch({ type: 'LOAD_OPTIONS', options: optionsFromStorage });
        }
    }, []);

    // save option to localstorage
    useEffect(() => {
        console.log('save options to storage');
        saveOptionsToStorage(options);
    }, [options]);

    return (
        <div className="widget">
            <div className="widget-header">
                <h3 className="widget-header__title">Your Options</h3>
                <OptionsMenu options={options} />
            </div>
            <div className="widget-content" ref={optionsContainer}>
                {options.length === 0 && <p className="widget__message">Please add an option to get started</p>}
                {options.map((option, index) => (
                    <Option key={option} text={option} index={index + 1} />
                ))}
            </div>
        </div>
    );
};

export default Options;
