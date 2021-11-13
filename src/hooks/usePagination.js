import { useReducer, useState, useRef, useEffect } from 'react';
import paginationReducer from '../reducers/paginationReducer';

const usePagination = (options, defaultValues) => {
    const [pagination, paginationDispatch] = useReducer(paginationReducer, defaultValues);
    const [optionsToDisplay, setOptionsToDisplay] = useState([]);

    const optionsOnDisplayLength = useRef(0);

    useEffect(() => {
        const actualPage = pagination.page + 1;
        const end = actualPage * pagination.rowsPerPage;
        const start = end - pagination.rowsPerPage;
        const optionsPartitioned = options.slice(start, end);

        setOptionsToDisplay(optionsPartitioned);
        optionsOnDisplayLength.current = optionsPartitioned.length;

        if (pagination.page !== 0 && optionsOnDisplayLength.current === 0) {
            // jump to prev page if the current page has no notes left (all were deleted)
            paginationDispatch({ type: 'SET_PAGE', page: pagination.page - 1 });
        }
    }, [pagination.page, options, pagination.rowsPerPage, setOptionsToDisplay]);

    return [optionsToDisplay, pagination, paginationDispatch];
};

export default usePagination;
