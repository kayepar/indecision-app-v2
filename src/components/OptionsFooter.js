import React from 'react';
import { TablePagination } from '@mui/material';

const OptionsFooter = ({ optionsLength, page, defaultNumRows, displayPerPage, paginationDispatch }) => {
    const handlePageOnChange = (e, pageNum) => {
        paginationDispatch({ type: 'SET_PAGE', page: pageNum });
    };

    const handleRowsOnChange = (e) => {
        paginationDispatch({ type: 'SET_ROWS_PER_PAGE', rowsPerPage: e.target.value });
    };

    return (
        <>
            {optionsLength > 0 && (
                <div className="tally" data-testid="total-options">
                    {optionsLength} {optionsLength !== 1 ? 'options' : 'option'}
                </div>
            )}
            {optionsLength > defaultNumRows && (
                <TablePagination
                    className="tablePagination"
                    component="div"
                    count={optionsLength}
                    page={page}
                    labelRowsPerPage={''}
                    onPageChange={handlePageOnChange}
                    rowsPerPage={displayPerPage}
                    onRowsPerPageChange={handleRowsOnChange}
                    rowsPerPageOptions={[5, 10, 20]}
                />
            )}
        </>
    );
};

export default OptionsFooter;
