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
import paginationReducer from '../reducers/paginationReducer';
import useLocalStorage from '../hooks/useLocalStorage';

// todo: add tests for paging and tally
// todo: see if reducer is better in handling paging states
// todo: fix displayperpage property in reducer
// todo: pass dispatch and rename setPagination in line 33 -> move actionHandlers to optionfooter component

const IndecisionApp = () => {
    // const defaultNumRows = 5;
    const defaultPagination = {
        page: 0,
        display: 5,
    };
    const [optionsFromStorage, saveOptionsToStorage] = useLocalStorage('options', []);
    const [options, optionsDispatch] = useReducer(optionsReducer, optionsFromStorage);

    const [autoDeleteFromStorage, saveAutoDeleteToStorage] = useLocalStorage('autoDelete', false);
    const [autoDelete, autoDeleteDispatch] = useReducer(autoDeleteReducer, autoDeleteFromStorage);

    const [optionsToDisplay, setOptionsToDisplay] = useState([]);

    // const [page, setPage] = useState(0);
    // const [displayPerPage, setDisplayPerPage] = useState(defaultNumRows);

    const [pagination, setPagination] = useReducer(paginationReducer, defaultPagination);

    const optionsOnDisplayLength = useRef(0);

    useEffect(() => {
        saveOptionsToStorage(options);
    }, [options, saveOptionsToStorage]);

    useEffect(() => {
        saveAutoDeleteToStorage(autoDelete);
    }, [autoDelete, saveAutoDeleteToStorage]);

    useEffect(() => {
        const actualPage = pagination.page + 1;
        const end = actualPage * pagination.display;
        const start = end - pagination.display;
        const optionsPartitioned = options.slice(start, end);

        setOptionsToDisplay(optionsPartitioned);
        optionsOnDisplayLength.current = optionsPartitioned.length;

        if (pagination.page !== 0 && optionsOnDisplayLength.current === 0) {
            // jump to prev page if the current page has no notes left (all were deleted)
            // setPage(page - 1);
            setPagination({ type: 'SET_PAGE', page: pagination.page - 1 });
        }
    }, [pagination.page, options, pagination.display, setOptionsToDisplay]);

    const handlePageOnChange = (e, pageNum) => {
        // setPage(pageNum);
        setPagination({ type: 'SET_PAGE', page: pageNum });
    };

    const handleRowsOnChange = (e) => {
        // setDisplayPerPage(e.target.value);
        setPagination({ type: 'SET_DISPLAY', display: e.target.value });
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
                            page={pagination.page}
                            defaultNumRows={defaultPagination.display}
                            displayPerPage={pagination.display}
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
