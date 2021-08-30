import React, { useReducer } from 'react';
import PickedOptionReducer from '../reducers/pickedOptionReducer';

const PickedOptionContext = React.createContext();

const PickedOptionProvider = ({ children }) => {
    const [pickedOption, pickedOptionDispatch] = useReducer(PickedOptionReducer, undefined);
    const value = { pickedOption, pickedOptionDispatch };

    return <PickedOptionContext.Provider value={value}>{children}</PickedOptionContext.Provider>;
};

const usePickedOptionContext = () => {
    const context = React.useContext(PickedOptionContext);

    if (!context) throw new Error('usePickedOptionContext must be used within an PickedOptionProvider');

    return context;
};

export { usePickedOptionContext, PickedOptionProvider as default };
