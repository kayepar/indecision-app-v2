import React, { useState, useReducer, useEffect } from 'react';
import Header from './Header';
import ActionButton from './ActionButton';
import ActionModal from './ActionModal';
import Options from './Options';
import AddForm from './AddForm';
import optionsReducer from '../reducers/optionsReducer';
import autoDeleteReducer from '../reducers/autoDeleteReducer';
import useLocalStorage from '../hooks/useLocalStorage';

const IndecisionApp = () => {
    const [pickedOption, setPickedOption] = useState(undefined);
    const [optionsFromStorage, saveOptionsToStorage] = useLocalStorage('options', []);
    const [options, optionsDispatch] = useReducer(optionsReducer, optionsFromStorage);

    const [autoDeleteFromStorage, saveAutoDeleteToStorage] = useLocalStorage('autoDelete', false);
    const [autoDelete, autoDeleteDispatch] = useReducer(autoDeleteReducer, autoDeleteFromStorage);

    const updatePickedOption = (option) => {
        setPickedOption(option);
    };

    // save option to localstorage
    useEffect(() => {
        saveOptionsToStorage(options);
    }, [options, saveOptionsToStorage]);

    useEffect(() => {
        saveAutoDeleteToStorage(autoDelete);
    }, [autoDelete]);

    return (
        <>
            <Header />
            <div className="container container--content">
                <ActionButton options={options} updatePickedOption={updatePickedOption} />
                <Options
                    options={options}
                    optionsDispatch={optionsDispatch}
                    autoDelete={autoDelete}
                    autoDeleteDispatch={autoDeleteDispatch}
                />
                <AddForm options={options} optionsDispatch={optionsDispatch} />
            </div>
            <ActionModal
                options={options}
                optionsDispatch={optionsDispatch}
                pickedOption={pickedOption}
                updatePickedOption={updatePickedOption}
                autoDelete={autoDelete}
            />
        </>
    );
};

export default IndecisionApp;
