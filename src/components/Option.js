import React from 'react';
import { useOptionsContext } from '../context/optionsContext';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import { makeStyles } from '@material-ui/core/styles';

const Option = (props) => {
    const useStyles = makeStyles({
        root: {
            color: '#fdd621',
            padding: '0 5px',
            fontSize: 20,
        },
        label: {
            textTransform: 'capitalize',
        },
    });

    const classes = useStyles();
    const { optionsDispatch } = useOptionsContext();

    const handleDeleteOption = (option) => {
        optionsDispatch({ type: 'DELETE_OPTION', option });
    };

    return (
        <div className="option">
            <p className="option__text">
                {props.index}. {props.text}
            </p>
            <IconButton aria-label="delete" onClick={() => handleDeleteOption(props.text)}>
                <DeleteOutlineRoundedIcon
                    classes={{
                        root: classes.root,
                        label: classes.label,
                    }}
                />
            </IconButton>
        </div>
    );
};

export default Option;
