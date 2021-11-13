import '../wdyr';

import React, { useReducer, useEffect } from 'react';
import Header from './Header';
import OptionsHeader from './OptionsHeader';
import Options from './Options';
import OptionsMenu from './OptionsMenu';
import AddForm from './AddForm';
import ActionContainer from './ActionContainer';
import OptionsFooter from './OptionsFooter';
import optionsReducer from '../reducers/optionsReducer';
import autoDeleteReducer from '../reducers/autoDeleteReducer';
import useLocalStorage from '../hooks/useLocalStorage';
import usePagination from '../hooks/usePagination';

const IndecisionApp = () => {
    const [optionsFromStorage, saveOptionsToStorage] = useLocalStorage('options', []);
    const [options, optionsDispatch] = useReducer(optionsReducer, optionsFromStorage);

    const [autoDeleteFromStorage, saveAutoDeleteToStorage] = useLocalStorage('autoDelete', false);
    const [autoDelete, autoDeleteDispatch] = useReducer(autoDeleteReducer, autoDeleteFromStorage);

    const defaultPaginationValues = {
        page: 0,
        rowsPerPage: 5,
    };

    const [optionsToDisplay, pagination, paginationDispatch] = usePagination(options, defaultPaginationValues);

    useEffect(() => {
        saveOptionsToStorage(options);
    }, [options, saveOptionsToStorage]);

    useEffect(() => {
        saveAutoDeleteToStorage(autoDelete);
    }, [autoDelete, saveAutoDeleteToStorage]);

    return (
        <>
            <Header />
            <div className="body">
                <div className="container container--content">
                    <ActionContainer
                        options={options}
                        optionsDispatch={optionsDispatch}
                        autoDelete={autoDelete}
                    ></ActionContainer>
                    <AddForm options={options} optionsDispatch={optionsDispatch} />
                    <OptionsHeader>
                        <OptionsMenu
                            hasOptions={options.length > 0}
                            optionsDispatch={optionsDispatch}
                            autoDelete={autoDelete}
                            autoDeleteDispatch={autoDeleteDispatch}
                        />
                    </OptionsHeader>
                    <Options options={optionsToDisplay} optionsDispatch={optionsDispatch} />
                    <div className="options-footer">
                        <OptionsFooter
                            optionsLength={options.length}
                            page={pagination.page}
                            defaultNumRows={defaultPaginationValues.rowsPerPage}
                            displayPerPage={pagination.rowsPerPage}
                            paginationDispatch={paginationDispatch}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default IndecisionApp;
