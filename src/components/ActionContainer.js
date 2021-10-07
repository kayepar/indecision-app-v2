import React, { useState } from 'react';
import ActionButton from './ActionButton';
import ActionModal from './ActionModal';

const ActionContainer = ({ options, optionsDispatch, autoDelete }) => {
    const [pickedOption, setPickedOption] = useState(undefined);

    const handlePickOption = React.useCallback(() => {
        const randomNumber = Math.floor(Math.random() * options.length);

        const pickedOption = options[randomNumber];

        setPickedOption(pickedOption);
    }, [options]);

    const handleClearPickedOption = React.useCallback(() => {
        if (autoDelete) optionsDispatch({ type: 'DELETE_OPTION', option: pickedOption });

        setPickedOption(undefined);
    }, [pickedOption, autoDelete, optionsDispatch]);

    // note 1: not wrapping handleClearPickedOption in useCallback reloads ActionModal after every change in options (additions and deletions)
    // note 2: not adding pickedOption as dependency on useCallback will cause autoDelete to not work (function will need to get re-created on value change)

    return (
        <>
            <ActionButton handlePickOption={handlePickOption} disabled={options.length < 1} />
            <ActionModal pickedOption={pickedOption} handleClearPickedOption={handleClearPickedOption} />
        </>
    );
};

// ActionContainer.whyDidYouRender = true;

export default ActionContainer;
