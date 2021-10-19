import '../wdyr';

import React, { useReducer, useEffect } from 'react';
import Header from './Header';
import OptionsHeader from './OptionsHeader';
import Options from './Options';
import AddForm from './AddForm';
import ActionContainer from './ActionContainer';
import optionsReducer from '../reducers/optionsReducer';
import autoDeleteReducer from '../reducers/autoDeleteReducer';
import useLocalStorage from '../hooks/useLocalStorage';

const IndecisionApp = () => {
    const [optionsFromStorage, saveOptionsToStorage] = useLocalStorage('options', []);
    const [options, optionsDispatch] = useReducer(optionsReducer, optionsFromStorage);

    const [autoDeleteFromStorage, saveAutoDeleteToStorage] = useLocalStorage('autoDelete', false);
    const [autoDelete, autoDeleteDispatch] = useReducer(autoDeleteReducer, autoDeleteFromStorage);

    // save option to localstorage
    useEffect(() => {
        saveOptionsToStorage(options);
    }, [options, saveOptionsToStorage]);

    useEffect(() => {
        saveAutoDeleteToStorage(autoDelete);
    }, [autoDelete, saveAutoDeleteToStorage]);

    return (
        <>
            <Header />
            <div className="container container--content">
                <ActionContainer
                    options={options}
                    optionsDispatch={optionsDispatch}
                    autoDelete={autoDelete}
                ></ActionContainer>
                <AddForm options={options} optionsDispatch={optionsDispatch} />

                <OptionsHeader
                    hasOptions={options.length > 0}
                    optionsDispatch={optionsDispatch}
                    autoDelete={autoDelete}
                    autoDeleteDispatch={autoDeleteDispatch}
                />
                <Options options={options} optionsDispatch={optionsDispatch} />
            </div>
        </>
    );
};

// IndecisionApp.whyDidYouRender = true;

export default IndecisionApp;
