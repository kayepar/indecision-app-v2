import React, { useState } from 'react';
import ActionButton from './ActionButton';
import ActionModal from './ActionModal';

const ActionContainer = ({ options, optionsDispatch, autoDelete }) => {
    const [pickedOption, setPickedOption] = useState(undefined);

    const updatePickedOption = React.useCallback((optionNum) => {
        const pickedOption = options[optionNum];

        setPickedOption(pickedOption);
    }, []);

    return (
        <>
            <ActionButton optionsLength={options.length} updatePickedOption={updatePickedOption} />
            <ActionModal
                optionsDispatch={optionsDispatch}
                pickedOption={pickedOption}
                updatePickedOption={updatePickedOption}
                autoDelete={autoDelete}
            />
        </>
    );
};

// ActionContainer.whyDidYouRender = true;

export default ActionContainer;
