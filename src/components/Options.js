import React, { useEffect } from 'react';
import Option from './Option';
import { useOptions } from '../context/optionsContext';

const Options = () => {
    const { options, optionsDispatch } = useOptions();

    useEffect(() => {
        console.log('load Options');
        const optionsFromStorage = JSON.parse(localStorage.getItem('options'));

        if (optionsFromStorage) {
            optionsDispatch({ type: 'LOAD_OPTIONS', options: optionsFromStorage });
        }
    }, [optionsDispatch]);

    useEffect(() => {
        console.log('Options - load Options - changed options value');
        localStorage.setItem('options', JSON.stringify(options));
    }, [options]);

    return (
        <div className="widget">
            <div className="widget-header">
                <h3 className="widget-header__title">Your Options</h3>
            </div>
            <div className="widget-content">
                {options.length === 0 && <p className="widget__message">Please add an option to get started</p>}
                {options.map((option, index) => (
                    <Option key={option} text={option} index={index + 1} />
                ))}
            </div>
        </div>
    );
};

export default Options;