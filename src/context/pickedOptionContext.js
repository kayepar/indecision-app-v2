import React, { useReducer } from 'react';
import PickedOptionReducer from '../reducers/pickedOptionReducer';

const PickedOptionContext = React.createContext();

const PickedOptionProvider = ({ children }) => {
    const [pickedOption, pickedOptionDispatch] = useReducer(PickedOptionReducer, undefined);
    const value = { pickedOption, pickedOptionDispatch };

    return <PickedOptionContext.Provider value={value}>{children}</PickedOptionContext.Provider>;
};

const usePickedOption = () => {
    const context = React.useContext(PickedOptionContext);

    return context;
};

export { usePickedOption, PickedOptionProvider as default };
