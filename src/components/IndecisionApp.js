import '../wdyr';

import React, { useReducer, useEffect, useState, useRef } from 'react';
import Header from './Header';
import OptionsHeader from './OptionsHeader';
import Options from './Options';
import AddForm from './AddForm';
import ActionContainer from './ActionContainer';
import OptionsFooter from './OptionsFooter';
import optionsReducer from '../reducers/optionsReducer';
import autoDeleteReducer from '../reducers/autoDeleteReducer';
import useLocalStorage from '../hooks/useLocalStorage';

// todo: add tests for paging and tally
// todo: see if reducer is better in handling paging states
// todo: see if pagination section can be a separate component

const IndecisionApp = () => {
    const defaultNumRows = 5;
    const [optionsFromStorage, saveOptionsToStorage] = useLocalStorage('options', []);
    const [options, optionsDispatch] = useReducer(optionsReducer, optionsFromStorage);

    const [autoDeleteFromStorage, saveAutoDeleteToStorage] = useLocalStorage('autoDelete', false);
    const [autoDelete, autoDeleteDispatch] = useReducer(autoDeleteReducer, autoDeleteFromStorage);

    const [page, setPage] = useState(0);
    const [optionsToDisplay, setOptionsToDisplay] = useState([]);
    const [displayPerPage, setDisplayPerPage] = useState(defaultNumRows);

    const optionsOnDisplayLength = useRef(0);

    // save option to localstorage
    useEffect(() => {
        saveOptionsToStorage(options);
    }, [options, saveOptionsToStorage]);

    useEffect(() => {
        saveAutoDeleteToStorage(autoDelete);
    }, [autoDelete, saveAutoDeleteToStorage]);

    useEffect(() => {
        const actualPage = page + 1;
        const end = actualPage * displayPerPage;
        const start = end - displayPerPage;
        const optionsPartitioned = options.slice(start, end);

        setOptionsToDisplay(optionsPartitioned);
        optionsOnDisplayLength.current = optionsPartitioned.length;

        if (page !== 0 && optionsOnDisplayLength.current === 0) {
            // jump to prev page if the current page has no notes left (all were deleted)
            setPage([page] - 1);
        }
    }, [page, options, displayPerPage, setOptionsToDisplay]);

    const handlePageOnChange = (e, pageNum) => {
        setPage(pageNum);
    };

    const handleRowsOnChange = (e) => {
        setDisplayPerPage(e.target.value);
    };

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

                    <OptionsHeader
                        hasOptions={options.length > 0}
                        optionsDispatch={optionsDispatch}
                        autoDelete={autoDelete}
                        autoDeleteDispatch={autoDeleteDispatch}
                    />
                    <Options options={optionsToDisplay} optionsDispatch={optionsDispatch} />
                    <div className="options-footer">
                        <OptionsFooter
                            optionsLength={options.length}
                            page={page}
                            defaultNumRows={defaultNumRows}
                            displayPerPage={displayPerPage}
                            handleRowsOnChange={handleRowsOnChange}
                            handlePageOnChange={handlePageOnChange}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

// IndecisionApp.whyDidYouRender = true;

export default IndecisionApp;
