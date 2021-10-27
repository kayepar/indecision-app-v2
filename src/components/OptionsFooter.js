import React from 'react';
import { TablePagination } from '@mui/material';

const OptionsFooter = ({
    optionsLength,
    page,
    defaultNumRows,
    displayPerPage,
    handleRowsOnChange,
    handlePageOnChange,
}) => {
    return (
        <>
            {optionsLength > 0 && (
                <div className="tally">
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
