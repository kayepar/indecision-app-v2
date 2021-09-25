import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';

const Option = ({ optionsDispatch, index, text }) => {
    const handleDeleteOption = (option) => {
        optionsDispatch({ type: 'DELETE_OPTION', option });
    };

    return (
        <div className="option" data-testid="option-item">
            <p className="option__text">
                {index}. {text}
            </p>
            <IconButton aria-label="delete" onClick={() => handleDeleteOption(text)}>
                <DeleteOutlineRoundedIcon className="delete-icon" />
            </IconButton>
        </div>
    );
};

export default Option;
