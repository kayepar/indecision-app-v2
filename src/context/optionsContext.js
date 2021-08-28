import React, { useReducer } from 'react';
import OptionsReducer from '../reducers/optionsReducer';

const OptionsContext = React.createContext();

const OptionsProvider = ({ children }) => {
    const defaultOptions = ['one', 'two', 'three'];

    const [options, optionsDispatch] = useReducer(OptionsReducer, defaultOptions);
    const value = { options, optionsDispatch };

    return <OptionsContext.Provider value={value}>{children}</OptionsContext.Provider>;
};

const useOptions = () => {
    const context = React.useContext(OptionsContext);

    return context;
};

export { useOptions, OptionsProvider as default };
