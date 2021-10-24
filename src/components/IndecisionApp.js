import '../wdyr';

import React, { useReducer, useEffect, useState, useRef } from 'react';
import Pagination from '@mui/material/Pagination';
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

    const [page, setPage] = useState(1);
    const [optionsToDisplay, setOptionsToDisplay] = useState([]);
    const displayPerPage = 5;

    const optionsOnDisplayLength = useRef(0);
    const numPages = Math.ceil(options.length / displayPerPage);

    const handlePageOnChange = (e, pageNum) => {
        setPage(pageNum);
    };

    // save option to localstorage
    useEffect(() => {
        saveOptionsToStorage(options);
    }, [options, saveOptionsToStorage]);

    useEffect(() => {
        saveAutoDeleteToStorage(autoDelete);
    }, [autoDelete, saveAutoDeleteToStorage]);

    useEffect(() => {
        const end = page * displayPerPage;
        const start = end - displayPerPage;
        const optionsPartitioned = options.slice(start, end);

        setOptionsToDisplay(optionsPartitioned);
        optionsOnDisplayLength.current = optionsPartitioned.length;

        if (page !== 1 && optionsOnDisplayLength.current === 0) {
            // jump to prev page if the current page has no notes left (all were deleted)
            setPage(page - 1);
        }
    }, [page, options, setOptionsToDisplay]);

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
                <Options options={optionsToDisplay} optionsDispatch={optionsDispatch} />
                <div className="pagination">
                    <Pagination
                        count={numPages}
                        onChange={handlePageOnChange}
                        page={page}
                        variant="outlined"
                        shape="rounded"
                        size="medium"
                    />
                </div>
            </div>
        </>
    );
};

// IndecisionApp.whyDidYouRender = true;

export default IndecisionApp;
