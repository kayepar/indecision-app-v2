import React, { useReducer } from 'react';
import OptionsReducer from '../reducers/optionsReducer';

const OptionsContext = React.createContext();

const OptionsProvider = ({ children }) => {
    const [options, optionsDispatch] = useReducer(OptionsReducer, []);
    const value = { options, optionsDispatch };

    return <OptionsContext.Provider value={value}>{children}</OptionsContext.Provider>;
};

const useOptionsContext = () => {
    const context = React.useContext(OptionsContext);

    if (!context) throw new Error('useOptionsContext must be used within an OptionsProvider');

    return context;
};

export { useOptionsContext, OptionsProvider as default };
