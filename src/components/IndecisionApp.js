import React, { useReducer } from 'react';
import Header from './Header';
import ActionButton from './ActionButton';
import OptionsContext from '../context/optionsContext';
import optionsReducer from '../reducers/optionsReducer';
import PickedOptionContext from '../context/pickedOptionContext';
import pickedOptionReducer from '../reducers/pickedOptionReducer';
import OptionModal from './OptionModal';

const IndecisionApp = () => {
    const defaultOptions = ['one', 'two', 'three'];
    const [options, dispatchOptions] = useReducer(optionsReducer, defaultOptions);
    const [pickedOption, pickedOptionDispatch] = useReducer(pickedOptionReducer, undefined);

    return (
        <OptionsContext.Provider value={{ options, dispatchOptions }}>
            <div>
                <Header />
            </div>
            <PickedOptionContext.Provider value={{ pickedOption, pickedOptionDispatch }}>
                <div className="container container--content">
                    <div>
                        <ActionButton />
                    </div>
                    <OptionModal />
                </div>
            </PickedOptionContext.Provider>
        </OptionsContext.Provider>
    );
};

export default IndecisionApp;
