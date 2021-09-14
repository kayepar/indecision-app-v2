import React from 'react';
import { useOptionsContext } from '../context/optionsContext';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';

const Option = (props) => {
    const { optionsDispatch } = useOptionsContext();

    const handleDeleteOption = (option) => {
        optionsDispatch({ type: 'DELETE_OPTION', option });
    };

    return (
        <div className="option" data-testid="option-item">
            <p className="option__text">
                {props.index}. {props.text}
            </p>
            <IconButton aria-label="delete" onClick={() => handleDeleteOption(props.text)}>
                <DeleteOutlineRoundedIcon className="delete-icon" />
            </IconButton>
        </div>
    );
};

export default Option;
