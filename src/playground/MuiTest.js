import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const MuiTest = () => {
    return (
        <>
            <p>Hello</p>
            <IconButton aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </>
    );
};

export default MuiTest;
